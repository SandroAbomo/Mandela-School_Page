# Mandela Bilingual Nursery and Primary School — Website & Enquiry Platform

## Project Overview

A full-stack school website with an admissions enquiry pipeline built in:

1. **Public school site** — nine pages presenting the school to prospective families
2. **Admin dashboard** — staff triage, search, and reply to enquiries
3. **Backend API** — Express REST API serving both

The public site and the admin panel are **one React + Vite application**. Public pages
render inside a shared `Navbar`/`Footer` layout; `/admin/*` routes sit outside that layout
behind a `ProtectedRoute` guard.

## Architecture

```
Public site  ──POST /api/enquiries──►  Express API  ──►  MongoDB
                                            │
Admin panel  ◄──GET  /api/enquiries─────────┘
                                            └──────────►  Nodemailer (reply + admin alert)
```

## Project Structure

```
School-Page/
├── backend/               # Express REST API (port 5000)
│   ├── config/db.js       # Mongoose connection
│   ├── controllers/       # authController, enquiryController
│   ├── middleware/        # authMiddleware — JWT verification
│   ├── models/            # Enquiry, User
│   ├── routes/            # authRoutes, enquiryRoutes
│   ├── scripts/           # seedAdmin.js — creates the first dashboard login
│   ├── services/          # emailService — Nodemailer
│   └── server.js
├── frontend/latest/       # React + Vite app (port 5177)
│   ├── public/images/     # Web-optimised logo + campus photography
│   └── src/
│       ├── assets.js      # Single source of truth for brand imagery
│       ├── components/    # Navbar, Footer, EnquiryForm, sections/, admin/
│       ├── context/       # AuthContext — JWT in localStorage
│       ├── pages/         # Public pages + admin/ (Login, Dashboard, EnquiryDetail)
│       └── services/      # enquiryAPI.js
├── images/                # Full-resolution brand originals (committed on purpose)
└── package.json           # Runs both apps together via concurrently
```

## Running the Project

```bash
# Install
npm install
npm --prefix backend install
npm --prefix frontend/latest install

# Configure
cp backend/.env.example backend/.env                       # fill in real values
cp frontend/latest/.env.local.example frontend/latest/.env.local

# Create the first admin login (reads ADMIN_SEED_* from backend/.env)
npm run seed:admin --prefix backend

# Optional: fill the dashboard with a term's worth of invented school data
npm run seed:demo --prefix backend

# Run both apps
npm run dev            # backend :5000 + frontend :5177
```

Requires a running MongoDB instance (local or Atlas).

## Environment Variables

### `backend/.env`
| Variable               | Description                                        |
|------------------------|----------------------------------------------------|
| `PORT`                 | API port (default 5000)                            |
| `MONGO_URI`            | MongoDB connection string                          |
| `JWT_SECRET`           | Secret used to sign admin JWTs                     |
| `CORS_ORIGIN`          | Comma-separated origins allowed to call the API    |
| `TRUST_PROXY`          | Reverse proxy hops; leave unset when run directly  |
| `SCHOOL_NAME`          | Name used in outgoing email from-address/signature |
| `EMAIL_HOST`           | SMTP host                                          |
| `EMAIL_PORT`           | SMTP port                                          |
| `EMAIL_USER`           | SMTP username / from address                       |
| `EMAIL_PASS`           | SMTP password                                      |
| `ADMIN_EMAIL`          | Recipient for new-enquiry notifications            |
| `ADMIN_SEED_EMAIL`     | Seed script only — first admin's email             |
| `ADMIN_SEED_PASSWORD`  | Seed script only — min 12 characters               |
| `ADMIN_SEED_ROLE`      | Seed script only — defaults to `admin`             |

### `frontend/latest/.env.local`
| Variable       | Description                                    |
|----------------|------------------------------------------------|
| `VITE_API_URL` | API base URL, e.g. `http://localhost:5000/api` |

## Tech Stack

| Layer            | Technology                              |
|------------------|-----------------------------------------|
| Frontend         | React 18, Vite 5, React Router 6, Tailwind CSS 3 |
| Backend          | Node.js, Express 5                      |
| Database         | MongoDB + Mongoose 8                    |
| Auth             | JWT (`jsonwebtoken`) + bcryptjs         |
| Email            | Nodemailer                              |
| Hardening        | helmet, cors allow-list, express-rate-limit, morgan |

## Design System

### Colours (`tailwind.config.js`)
| Token              | Hex         | Usage                                |
|--------------------|-------------|--------------------------------------|
| `primary`          | `#0F2D5C`   | Brand navy — nav bar, CTA buttons    |
| `primary-dark`     | `#0A1F42`   | Hover state on primary buttons       |
| `primary-50`       | `#EBF1F4`   | Light tint for badges/active states  |
| `accent`           | `#f57542`   | Orange highlight — labels, emphasis  |
| `school-black`     | `#040f2b`   | Dark sections, hero, footer, admin   |
| `school-off-white` | warm tint   | Alternate section backgrounds        |
| `school-warm`      | `#c0d8f7`   | Subtle tones                         |

### Typography & Layout
- Font: Inter, loaded from Google Fonts in `index.html`
- Every inner page opens with the shared `components/PageHero.jsx` — crest watermark,
  gradient wash and "Learn · Grow · Belong" motto defined once, not copied eight times
- Component classes in `src/index.css`: `.section-label`, `.section-heading`,
  `.container-xl`, `.section-wrapper`, `.btn-primary`, `.btn-outline-white`, `.link-arrow`
- Section rhythm: `py-20 lg:py-28` via `.section-wrapper`
- Max width: `max-w-7xl` with responsive horizontal padding
- Rounded corners (`rounded-lg` / `rounded-xl`) with soft shadows
- Card hover: subtle lift and image scale transitions

## Public Pages

| Route         | Description                                                   |
|---------------|---------------------------------------------------------------|
| `/`           | Hero, About, Campus, Academics, Activities, Testimonials, News, FAQ, CTA |
| `/about`      | Mission, values, history timeline, leadership team            |
| `/academics`  | Teaching principles and three curriculum stages (ages 3–12)   |
| `/campuses`   | Main Campus detail, statistics, facilities                    |
| `/admissions` | Five-step process, key dates, requirements, enquiry form      |
| `/activities` | Sports, performing arts, STEM, culture & leadership           |
| `/news`       | Articles and upcoming events                                  |
| `/gallery`    | Photo grid                                                    |
| `/contact`    | Enquiry form + campus contact details                         |

## Admin Routes

| Route                   | Description                                 |
|-------------------------|---------------------------------------------|
| `/admin/login`          | Email + password, returns JWT               |
| `/admin/overview`       | School overview: roll, enquiries, events    |
| `/admin/enquiries`      | Admissions inbox (office roles only)        |
| `/admin/enquiries/:id`  | Full enquiry + reply composer               |
| `/admin/students`       | Student roster: search, filter, CRUD        |
| `/admin/news`           | Write, publish and unpublish articles       |
| `/admin/events`         | School calendar shown on the website        |
| `/admin/staff`          | Staff accounts and roles (headteacher only) |

## Roles

Enforced server-side in `middleware/authMiddleware.js`; the dashboard only hides
navigation to match.

| Role          | Can do                                              |
|---------------|-----------------------------------------------------|
| `headteacher` | Everything, including staff accounts                |
| `admin`       | Enquiries, students, news, events — not staff       |
| `teacher`     | Read-only; never sees enquiries or staff accounts   |

## API Endpoints

### Public
| Method | Path             | Description        |
|--------|------------------|--------------------|
| POST   | `/api/enquiries` | Submit new enquiry |

### Public website content
| Method | Path                     | Description                        |
|--------|--------------------------|------------------------------------|
| GET    | `/api/content/articles`  | Published news (drafts never served)|
| GET    | `/api/content/events`    | Published, future-dated events      |

### Staff (JWT required)
| Method | Path                        | Role          |
|--------|-----------------------------|---------------|
| GET    | `/api/dashboard/overview`   | any           |
| GET    | `/api/enquiries`            | office        |
| GET    | `/api/enquiries/stats`      | office        |
| GET    | `/api/enquiries/:id`        | office        |
| PATCH  | `/api/enquiries/:id`        | office        |
| GET    | `/api/students`             | any           |
| POST/PATCH/DELETE | `/api/students`  | office        |
| GET    | `/api/articles`             | any           |
| POST/PATCH/DELETE | `/api/articles`  | office        |
| GET    | `/api/events`               | any           |
| POST/PATCH/DELETE | `/api/events`    | office        |
| GET/POST/PATCH/DELETE | `/api/users` | headteacher   |

"office" means `admin` or `headteacher`.

### Auth
| Method | Path              | Description               |
|--------|-------------------|---------------------------|
| POST   | `/api/auth/login` | Admin login → returns JWT |

## Database Schema

**Enquiry**
```js
{ name, email, phone, campus, subject, message,
  status: "pending" | "replied", createdAt, updatedAt }
```

**Student**
```js
{ firstName, lastName, yearGroup: "Nursery".."Year 7",
  guardianName, guardianEmail, guardianPhone,
  status: "applicant" | "enrolled" | "alumni", enrolledOn, notes }
```

**Article** (news)
```js
{ title, category, excerpt, body,
  status: "draft" | "published", publishedAt, authorName }
```

**Event**
```js
{ title, category, description, startsAt, timeLabel, location,
  status: "draft" | "published" }
```

**User** (staff)
```js
{ name, email, password (bcrypt, cost 12), role, active, lastLogin }
```

## Key Design Decisions

- **One app, two audiences.** Public site and admin share a build; `/admin/*` renders
  outside the public layout behind `ProtectedRoute`.
- **Client guard is cosmetic; the server decides.** `ProtectedRoute` controls rendering
  only — every admin endpoint independently verifies the JWT via `requireAuth`.
- **Admin notification never blocks a parent.** `notifyAdmin` is dispatched without being
  awaited, so a slow or failing SMTP host cannot delay or fail an enquiry submission.
- **Status follows the send.** A reply is emailed *first*; only then does the enquiry flip
  to `replied`. If delivery throws, the record stays pending rather than lying.
- **Hashing is bound to the model.** `userSchema.pre('save')` hashes on any password
  change, so no code path can persist a plaintext password by omission.
- **`/api/enquiries/stats` is registered before `/:id`** so `stats` is never parsed as a
  Mongo ObjectId.
- **Pagination and counts happen in the database** — list and total run concurrently;
  stats are three parallel `countDocuments` calls.
- **Brand assets are committed.** Originals live in `/images` (they were previously lost
  to an expired Cloudinary account); every reference resolves through `src/assets.js`.
- **Vite runs on port 5177 with `strictPort`.** Another project on this machine holds
  5173; without a pinned port the two dev servers silently shared `localhost` via
  IPv4/IPv6 binding. See the comment in `vite.config.js`.
- **Email branding is environment-driven** via `SCHOOL_NAME`, so the name in parents'
  inboxes can never drift from the name on the website.
- **The dashboard is the system of record.** News and Events are edited by staff and
  read by the public site through `/api/content/*`; drafts are filtered out in the
  controller, so an unfinished article cannot reach parents even via a direct API call.
- **Roles are enforced on the server, not in the browser.** `requireRole` guards every
  write and every admissions route; the sidebar only hides doors that are already locked.
- **The token names the user; the record decides what they may do.** `requireAuth` reloads
  the account on every request and reads `role` and `active` from it, so demoting or
  deactivating a member of staff takes effect on their next request rather than whenever
  their eight-hour token happens to expire.
- **The two endpoints open to the internet are throttled.** `POST /api/enquiries` sends
  mail, so an unthrottled loop would be a spam run through the school's SMTP account;
  `POST /api/auth/login` counts only failures, so a busy office cannot lock itself out.
- **CORS is an allow-list, not a reflection.** A bare `cors()` echoes any `Origin`, which
  would let any site make authenticated calls from a signed-in member of staff's browser.
- **Data loading goes through `useAsyncData`**, which never calls setState synchronously
  inside an effect and discards results that arrive after the inputs changed.

## Campus

Single site: **Main Campus**, 15 Mandela Drive, Central District — Nursery through
Class 7, ~750 students, founded 2010, bilingual (English/French).

## Known Gaps / Future Improvements

- Gallery images are still defined in code (News and Events are dashboard-managed)
- No automated tests
- No deployment pipeline; not yet deployed
- File uploads for admissions documents
- Enquiry trend analytics
- Live chat / SMS notifications
