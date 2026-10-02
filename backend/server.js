import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import authRoutes from './routes/authRoutes.js';
import schoolRoutes from './routes/schoolRoutes.js';

/**
 * Refuse to start without a real signing secret.
 *
 * With JWT_SECRET unset every login fails; with the placeholder from
 * .env.example left in place, anyone who has read that file can mint a staff
 * token. Both are deployment mistakes, so they stop the server here rather
 * than surfacing later as a broken or forgeable login.
 */
const jwtSecret = process.env.JWT_SECRET ?? '';
if (jwtSecret.length < 32 || jwtSecret.startsWith('change-me')) {
  console.error(
    'JWT_SECRET must be set to a random string of at least 32 characters. Generate one with:\n'
    + '  node -e "console.log(require(\'crypto\').randomBytes(48).toString(\'hex\'))"'
  );
  process.exit(1);
}

const app = express();

/**
 * Which origins may call this API.
 *
 * A bare cors() reflects whatever Origin it is sent, which would let any site
 * on the internet make authenticated calls from a signed-in member of staff's
 * browser. CORS_ORIGIN is a comma-separated allow-list; with nothing set we
 * fall back to the Vite dev server so a fresh clone still runs.
 *
 * Requests with no Origin at all — curl, health checks, server-to-server — are
 * not browser calls and are left alone.
 */
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5177')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

if (!process.env.CORS_ORIGIN) {
  console.warn(
    `CORS_ORIGIN is not set; allowing ${allowedOrigins.join(', ')} only. `
    + 'Set it to the public site\'s URL before deploying.'
  );
}

/**
 * Behind a reverse proxy every request arrives from the proxy, so the rate
 * limiters would put the whole internet in one bucket. Set TRUST_PROXY to the
 * number of proxies in front of this app when you deploy (3 on Render; see
 * render.yaml for how that was measured).
 */
const trustProxy = Number.parseInt(process.env.TRUST_PROXY ?? '', 10);
if (Number.isInteger(trustProxy)) app.set('trust proxy', trustProxy);

app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
// 'combined' records the caller's address and user agent, which the coloured
// 'dev' format drops — worth having in a host's log viewer.
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());

app.use('/api/enquiries', enquiryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', schoolRoutes);

app.get('/', (_req, res) => res.json({ status: 'API running' }));

app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error(`Could not connect to MongoDB: ${err.message}`);
    console.error('Check MONGO_URI in backend/.env and that the server is reachable.');
    process.exit(1);
  });
