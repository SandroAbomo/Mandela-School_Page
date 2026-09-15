# Mandela Bilingual Nursery and Primary School — Website & Enquiry Platform

A full-stack school website with a built-in enquiry pipeline: parents submit enquiries from
the public site, staff triage and reply to them from an admin dashboard, and every reply goes
out by email.

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
| Hardening | helmet, cors, morgan                                     |

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
│   └── services/          # emailService (Nodemailer)
├── frontend/latest/       # React + Vite app (port 5173)
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

# 3. Run both apps
npm run dev            # backend :5000 + frontend :5173
```

Requires a running MongoDB instance (local or Atlas).

### Environment variables

`backend/.env`

| Variable      | Description                              |
|---------------|------------------------------------------|
| `PORT`        | API port (default `5000`)                |
| `MONGO_URI`   | MongoDB connection string                |
| `JWT_SECRET`  | Secret used to sign admin JWTs           |
| `EMAIL_HOST`  | SMTP host                                |
| `EMAIL_PORT`  | SMTP port                                |
| `EMAIL_USER`  | SMTP username / from address             |
| `EMAIL_PASS`  | SMTP password                            |
| `ADMIN_EMAIL` | Recipient of new-enquiry notifications   |

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
| POST   | `/api/auth/login`      | —    | Admin login → JWT                    |

`/api/enquiries/stats` is registered before `/:id` so `stats` is never parsed as an ObjectId.

## Data model

```js
Enquiry { name, email, subject, message, status: 'pending' | 'replied', createdAt }
User    { email, password (bcrypt), role: 'admin' | 'teacher' | 'headteacher' }
```

Sending a reply from the admin panel emails the parent and flips the enquiry to `replied`.

## Brand imagery

Full-resolution originals are committed under [`images/`](images/) and the served copies live
in `frontend/latest/public/images/`. Every reference goes through
`frontend/latest/src/assets.js` — see [`images/README.md`](images/README.md).

## Project status

Work is tracked on the **Mandela School Page** project board. The public site, enquiry
submission, admin authentication, dashboard, and email replies are all working end to end;
News and Gallery content is still hard-coded, and there is no admin-user seed script or
deployment pipeline yet.
