# Brand Image Archive

Full-resolution originals for the school's brand imagery. **Committed to git on purpose**
so the assets can never be lost again to an expired third-party account (they were
previously hosted on Cloudinary).

| File                          | Source                 | Size        | Used for                          |
|-------------------------------|------------------------|-------------|-----------------------------------|
| `mandela-logo.png`            | 1024×1024 PNG (alpha)  | School crest| Navbar, Footer, admin login, icons|
| `mandela-school-building.png` | 1672×941 PNG           | Campus photo| Home page hero background, og:image|

## Web copies

These originals are not served directly. Optimised derivatives live in
`frontend/latest/public/` and are what the site loads:

| Served path                          | Derived from                  | Notes              |
|--------------------------------------|-------------------------------|--------------------|
| `/images/mandela-logo.png`           | `mandela-logo.png`            | 256×256 PNG, ~106 KB |
| `/images/mandela-school-building.jpg`| `mandela-school-building.png` | 1672×941 JPEG q82, ~407 KB |
| `/favicon.png`                       | `mandela-logo.png`            | 64×64              |
| `/apple-touch-icon.png`              | `mandela-logo.png`            | 180×180            |

Every reference in the app goes through `frontend/latest/src/assets.js` — change the
paths there and the whole site follows.

## Replacing an image

1. Drop the new original in this folder (keep the same filename).
2. Regenerate the web copies in `frontend/latest/public/` at the sizes above.
3. If a filename changed, update `frontend/latest/src/assets.js`.
