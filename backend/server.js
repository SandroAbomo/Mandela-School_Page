import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import authRoutes from './routes/authRoutes.js';
import schoolRoutes from './routes/schoolRoutes.js';

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
 * number of proxies in front of this app (usually 1) when you deploy.
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
app.use(morgan('dev'));
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
