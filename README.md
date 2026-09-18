# Mandela Bilingual Nursery and Primary School — Website & Enquiry Platform

A full-stack school website with a staff dashboard behind it. Parents submit enquiries from
the public site and staff reply by email; staff also manage the student roster, and publish
the news and events that the public site displays.

```
Public site  ──POST /api/enquiries──►  Express API  ──►  MongoDB
                                            │
Admin panel  ◄──GET  /api/enquiries──────────┘
                                            └──────────►  Nodemailer (reply + admin alert)
```

## Stack

| Layer     | Technology                                              |
|-----------|---------------------------------------------------------|
| Frontend  | React 18, Vite 5, React Router 6, Tailwind CSS 3        |
| Backend   | Node.js, Express 5                                       |
| Database  | MongoDB + Mongoose 8                                     |
| Auth      | JWT (`jsonwebtoken`) + bcryptjs                          |
| Email     | Nodemailer                                               |
| Hardening | helmet, cors (allow-list), express-rate-limit, morgan    |

The public site and the admin panel are one Vite app: public pages render inside a shared
`Navbar`/`Footer` layout, and `/admin/*` routes sit behind a `ProtectedRoute` guard.

## Project layout

```
School-Page/
├── backend/               # Express REST API (port 5000)
│   ├── config/db.js       # Mongoose connection
│   ├── controllers/       # authController, enquiryController
│   ├── middleware/        # JWT verification
│   ├── models/            # Enquiry, User
│   ├── routes/            # /api/auth, /api/enquiries
│   ├── scripts/           # seedAdmin.js — creates the first dashboard login
│   └── services/          # emailService (Nodemailer)
├── frontend/latest/       # React + Vite app (port 5177)
│   ├── public/images/     # Web-optimised logo + campus photo
│   └── src/
│       ├── assets.js      # Single source of truth for brand imagery
│       ├── components/    # Navbar, Footer, EnquiryForm, sections/, admin/
│       └── pages/         # Public pages + admin/ (Login, Dashboard, EnquiryDetail)
├── images/                # Full-resolution brand originals (archived in git)
└── package.json           # Runs both apps together via concurrently
```

## Getting started

```bash
# 1. Install
npm install
npm --prefix backend install
npm --prefix frontend/latest install

# 2. Configure
cp backend/.env.example backend/.env                       # fill in real values
cp frontend/latest/.env.local.example frontend/latest/.env.local

# 3. Create the first login (reads ADMIN_SEED_* from backend/.env)
npm run seed:admin --prefix backend

# Optional: fill the dashboard with a term of invented school data
npm run seed:demo --prefix backend

# 4. Run both apps
npm run dev            # backend :5000 + frontend :5177
```

Requires a running MongoDB instance (local or Atlas).

### Environment variables

`backend/.env`

| Variable              | Description                                          |
|-----------------------|------------------------------------------------------|
| `PORT`                | API port (default `5000`)                            |
| `MONGO_URI`           | MongoDB connection string                            |
| `JWT_SECRET`          | Secret used to sign admin JWTs                       |
| `CORS_ORIGIN`         | Comma-separated origins allowed to call the API      |
| `TRUST_PROXY`         | Reverse proxies in front of the app; unset when direct|
| `SCHOOL_NAME`         | Name used in the from-address and signature of email |
| `EMAIL_HOST`          | SMTP host                                            |
| `EMAIL_PORT`          | SMTP port                                            |
| `EMAIL_USER`          | SMTP username / from address                         |
| `EMAIL_PASS`          | SMTP password                                        |
| `ADMIN_EMAIL`         | Recipient of new-enquiry notifications               |
| `ADMIN_SEED_EMAIL`    | Seed script only — first admin's email               |
| `ADMIN_SEED_PASSWORD` | Seed script only — minimum 12 characters             |
| `ADMIN_SEED_ROLE`     | Seed script only — defaults to `admin`               |

`frontend/latest/.env.local`

| Variable       | Description                                          |
|----------------|------------------------------------------------------|
| `VITE_API_URL` | API base URL, e.g. `http://localhost:5000/api`       |

## API

| Method | Path                   | Auth | Description                          |
|--------|------------------------|------|--------------------------------------|
| POST   | `/api/enquiries`       | —    | Submit an enquiry (public form)      |
| GET    | `/api/enquiries`       | JWT  | List enquiries (search, status, page)|
| GET    | `/api/enquiries/stats` | JWT  | Totals by status for the dashboard   |
| GET    | `/api/enquiries/:id`   | JWT  | Single enquiry                       |
| PATCH  | `/api/enquiries/:id`   | JWT  | Change status, or send an email reply|
| POST   | `/api/auth/login`      | —    | Staff login → JWT                    |
| GET    | `/api/content/articles`| —    | Published news for the website       |
| GET    | `/api/content/events`  | —    | Published upcoming events            |
| GET    | `/api/dashboard/overview` | JWT | Roll, enquiries, events, activity  |
| GET    | `/api/students`        | JWT  | Roster (search, year group, status)  |
| GET    | `/api/articles`        | JWT  | News incl. drafts                    |
| GET    | `/api/events`          | JWT  | Events incl. drafts and past         |
| —      | `/api/users`           | JWT  | Staff accounts (headteacher only)    |

`/api/enquiries/stats` is registered before `/:id` so `stats` is never parsed as an ObjectId.

## Data model

```js
Enquiry { name, email, phone, campus, subject, message,
          status: 'pending' | 'replied', createdAt }
Student { firstName, lastName, yearGroup, guardianName, guardianEmail,
          guardianPhone, status: 'applicant' | 'enrolled' | 'alumni' }
Article { title, category, excerpt, body,
          status: 'draft' | 'published', publishedAt }
Event   { title, category, description, startsAt, timeLabel, location,
          status: 'draft' | 'published' }
User    { name, email, password (bcrypt), role, active, lastLogin }
```

Sending a reply from the dashboard emails the parent and flips the enquiry to `replied`.
Publishing an article or event makes it appear on the public site immediately; drafts are
filtered out server-side and never reach `/api/content/*`.

## Roles

Enforced on the server, not in the browser:

| Role          | Can do                                            |
|---------------|---------------------------------------------------|
| `headteacher` | Everything, including staff accounts              |
| `admin`       | Enquiries, students, news, events — not staff     |
| `teacher`     | Read-only; never sees enquiries or staff accounts |

## Brand imagery

Full-resolution originals are committed under [`images/`](images/) and the served copies live
in `frontend/latest/public/images/`. Every reference goes through
`frontend/latest/src/assets.js` — see [`images/README.md`](images/README.md).

## Project status

The public site, enquiry submission, staff authentication, the dashboard (overview, students,
news, events, staff accounts), role enforcement, and email replies all work end to end.
News and events published in the dashboard appear on the public site.

Still outstanding: Gallery images are defined in code, there are no automated tests, and
there is no deployment pipeline.
