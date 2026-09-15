# Nelson Mandela Primary School — Multi-Campus Website

## Project Overview

Full-stack web application consisting of three parts:

1. **Public school website** (`frontend/latest/`) — premium multi-campus school site (Next.js + Tailwind CSS)
2. **Admin dashboard** (`admin/`) — school staff manage, respond to, and track enquiries (React + Vite)
3. **Backend API** (`backend/`) — shared Node.js/Express server connecting both systems

## Architecture

```
School Website  → POST /api/enquiries → Backend API → MongoDB
                                                          ↓
Admin Dashboard ← GET  /api/enquiries ← Backend API ←────┘
```

## Project Structure

```
School-Page/
├── frontend/latest/     # Public school website  (Next.js 14, port 3000)
├── admin/               # Admin dashboard         (React + Vite, port 5174)
├── backend/             # Express REST API         (Node.js, port 5000)
└── AGENTS.md
```

## Running the Project

```bash
# Backend
cd backend && npm install
cp .env.example .env    # fill in .env values
npm run dev             # http://localhost:5000

# Public website (Next.js)
cd frontend/latest && npm install
# copy .env.local.example to .env.local and set NEXT_PUBLIC_API_URL
npm run dev             # http://localhost:3000

# Admin dashboard
cd admin && npm install
npm run dev             # http://localhost:5174
```

## Environment Variables

### `backend/.env`
| Variable     | Description                                  |
|--------------|----------------------------------------------|
| `PORT`       | Server port (default 5000)                   |
| `MONGO_URI`  | MongoDB connection string                    |
| `JWT_SECRET` | Secret for signing JWT tokens                |
| `EMAIL_HOST` | SMTP host                                    |
| `EMAIL_PORT` | SMTP port                                    |
| `EMAIL_USER` | SMTP username / from address                 |
| `EMAIL_PASS` | SMTP password                                |
| `ADMIN_EMAIL`| Recipient for new-enquiry notifications      |

### `frontend/latest/.env.local`
| Variable              | Description                                    |
|-----------------------|------------------------------------------------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL e.g. `http://localhost:5000/api` |

## Tech Stack

| Layer            | Technology                              |
|------------------|-----------------------------------------|
| Public frontend  | Next.js 14 (App Router), Tailwind CSS 3 |
| Admin frontend   | React 18, React Router v6, Vite         |
| Backend          | Node.js, Express 4                      |
| Database         | MongoDB + Mongoose                      |
| Auth             | JWT + bcryptjs                          |
| Email            | Nodemailer                              |

## Design System (Public Frontend)

### Colours
| Token             | Hex        | Usage                              |
|-------------------|------------|------------------------------------|
| `primary`         | `#C41E3A`  | Brand red — CTA buttons, accents   |
| `primary-dark`    | `#991B1B`  | Hover states on red elements       |
| `primary-50`      | `#FFF1F2`  | Light red for active nav states    |
| `school-black`    | `#0D0D0D`  | Main text, hero backgrounds        |
| `school-off-white`| `#F8F7F4`  | Alternate section backgrounds      |
| `school-warm`     | `#EAE8E1`  | Dividers, subtle tones             |

### Typography & Layout
- Font: Inter via `next/font/google`
- Headings: Bold, tight tracking, large scale
- Max width: `max-w-7xl` with responsive horizontal padding
- Section rhythm: `py-20 lg:py-28`
- No border radius on buttons/cards — sharp corners for premium minimal feel
- Card hover: `hover:-translate-y-1 transition-all duration-300`

## Public Frontend Structure (`frontend/latest/`)

```
frontend/latest/
├── app/
│   ├── globals.css           # Tailwind directives + base layer
│   ├── layout.js             # Root layout (Navbar + Footer)
│   ├── page.js               # Home page
│   ├── about/page.js
│   ├── admissions/page.js
│   ├── academics/page.js
│   ├── campuses/page.js
│   ├── activities/page.js
│   ├── news/page.js
│   ├── gallery/page.js
│   └── contact/page.js
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx        # Sticky responsive nav ('use client')
│   │   └── Footer.jsx        # Multi-column footer
│   ├── sections/             # Homepage section Server Components
│   │   ├── Hero.jsx
│   │   ├── AboutSection.jsx
│   │   ├── CampusesSection.jsx
│   │   ├── AcademicsSection.jsx
│   │   ├── ActivitiesSection.jsx
│   │   ├── TestimonialsSection.jsx
│   │   ├── NewsSection.jsx
│   │   ├── FAQSection.jsx    # 'use client' — accordion state
│   │   └── CTASection.jsx
│   └── forms/
│       └── EnquiryForm.jsx   # 'use client' — controlled form + fetch
├── services/
│   └── api.js
├── package.json
├── next.config.mjs
├── tailwind.config.js
├── postcss.config.js
├── jsconfig.json             # Path alias @/ → ./
└── .env.local
```

## Public Pages

| Route         | Description                                                   |
|---------------|---------------------------------------------------------------|
| `/`           | Hero, About, Campuses, Academics, Testimonials, News, FAQ, CTA |
| `/about`      | Mission, values, history, leadership team                     |
| `/admissions` | How to apply, key dates, requirements, enquiry form           |
| `/academics`  | Curriculum stages, Cambridge alignment                        |
| `/campuses`   | Three campus cards with details                               |
| `/activities` | Sports, arts, STEM, leadership programmes                     |
| `/news`       | Articles and upcoming events                                  |
| `/gallery`    | Photo grid by category / campus                               |
| `/contact`    | Enquiry form + campus addresses                               |

## Admin Frontend Structure (`admin/`)

```
admin/src/
├── pages/           (Login, Dashboard, EnquiryDetail)
├── components/      (StatsCards, Table, StatusBadge)
├── context/         (AuthContext — JWT in localStorage)
└── services/        (enquiryAPI.js)
```

## Backend Structure (`backend/`)

```
backend/
├── config/db.js
├── controllers/     (authController, enquiryController)
├── middleware/      (authMiddleware — JWT verification)
├── models/          (Enquiry, User)
├── routes/          (authRoutes, enquiryRoutes)
├── services/        (emailService — Nodemailer)
└── server.js
```

## API Endpoints

### Public
| Method | Path             | Description           |
|--------|------------------|-----------------------|
| POST   | `/api/enquiries` | Submit new enquiry    |

### Admin (JWT required)
| Method | Path                   | Description                         |
|--------|------------------------|-------------------------------------|
| GET    | `/api/enquiries`       | List enquiries (filter/search/page) |
| GET    | `/api/enquiries/stats` | Dashboard statistics                |
| GET    | `/api/enquiries/:id`   | Single enquiry detail               |
| PATCH  | `/api/enquiries/:id`   | Update status or send reply         |

### Auth
| Method | Path              | Description               |
|--------|-------------------|---------------------------|
| POST   | `/api/auth/login` | Admin login → returns JWT |

## Database Schema

**Enquiry**
```js
{ name, email, subject, message, status: "pending"|"replied", createdAt }
```

**User** (admin only)
```js
{ email, password (bcrypt), role: "admin"|"teacher"|"headteacher" }
```

## Key Design Decisions

- Next.js App Router: Server Components by default; `'use client'` only for Navbar (mobile menu state), FAQSection (accordion), and EnquiryForm (controlled form + fetch)
- JWT stored in `localStorage` on the admin client; sent as `Authorization: Bearer <token>`
- Status defaults to `"pending"`; switches to `"replied"` when admin sends a reply via Nodemailer
- Public site and admin are separate apps to keep the auth surface minimal
- `/api/enquiries/stats` registered **before** `/:id` to prevent "stats" matching as a Mongo ObjectId

## Campuses

| Campus         | Location         | Students | Founded |
|----------------|------------------|----------|---------|
| Central Campus | Central District | ~450     | 2010    |
| North Campus   | North Quarter    | ~380     | 2015    |
| East Campus    | East Borough     | ~370     | 2019    |

## Future Improvements

- Live chat between admin and parents
- File uploads for admissions documents
- SMS notifications
- Role-based access (teacher / admin / headteacher)
- Analytics dashboard (enquiry trends over time)
- CMS for News and Gallery content management
- Interactive campus map
