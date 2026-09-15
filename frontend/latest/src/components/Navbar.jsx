import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LOGO_ALT, LOGO_SRC } from "../assets";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/academics", label: "Academics" },
  { to: "/campuses", label: "Campus" },
  { to: "/admissions", label: "Admissions" },
  { to: "/activities", label: "Activities" },
  { to: "/news", label: "News" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (to) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-primary ${scrolled ? "shadow-md" : ""}`}
    >
      <div className="w-full px-4 sm:px-8 xl:px-10">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="self-stretch flex items-center gap-4 flex-shrink-0">
            <img
              src={LOGO_SRC}
              alt={LOGO_ALT}
              width="256"
              height="256"
              className="h-[95%] xl:h-full w-auto object-contain"
            />
            <div className="hidden sm:block leading-tight">
              <p className="font-bold text-white text-xl">
                Mandela Bilingual
              </p>
              <p className="text-sm text-white/60">Nursery and Primary</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                  isActive(to)
                    ? "text-white bg-white/15"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              to="/admissions"
              className="hidden sm:inline-flex items-center px-5 py-2.5 bg-accent text-white text-sm font-semibold hover:bg-amber-500 transition-colors rounded-lg shadow-sm"
            >
              Apply Now
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="xl:hidden p-2 text-white"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="xl:hidden bg-primary border-t border-white/10 shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-4 py-3 text-sm font-medium transition-colors rounded-md ${
                  isActive(to)
                    ? "bg-white/15 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="pt-3 mt-1 border-t border-white/10">
              <Link
                to="/admissions"
                className="block w-full text-center px-5 py-3 bg-accent text-white font-semibold hover:bg-amber-500 transition-colors text-sm uppercase tracking-wide rounded-lg"
              >
                Apply Now
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
