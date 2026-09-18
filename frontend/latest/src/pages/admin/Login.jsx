import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginAdmin } from '../../services/enquiryAPI';
import { LOGO_ALT, LOGO_SRC } from '../../assets';

const ICONS = {
  mail: 'M3 6h18v12H3z M3 7l9 6 9-6',
  lock: 'M6 10V8a6 6 0 1 1 12 0v2 M5 10h14v11H5z M12 15v2',
  eye: 'M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  eyeOff:
    'M3 3l18 18 M10.6 10.7a3 3 0 0 0 4.2 4.2 M6.7 6.8C3.9 8.5 2 12 2 12s3.5 6 10 6c1.8 0 3.3-.5 4.6-1.1 M9.9 6.2A9.9 9.9 0 0 1 12 6c6.5 0 10 6 10 6a18 18 0 0 1-2.9 3.5',
  arrow: 'M5 12h14 M13 6l6 6-6 6',
  back: 'M19 12H5 M11 6l-6 6 6 6',
};

const Icon = ({ d, className = '' }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none"
    stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { token, user } = await loginAdmin(email, password);
      login(token, user, remember);
      navigate('/admin/overview');
    } catch (err) {
      // A deactivated account gets its own message; anything else stays vague
      // so the form does not confirm which email addresses exist.
      setError(err.message?.includes('deactivated') ? err.message : 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  }

  const fieldCls =
    'w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-12 text-sm text-school-black placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition';

  return (
    <div className="min-h-screen bg-school-off-white relative overflow-hidden">
      {/* Navy canopy, matching the public site's page hero */}
      <div className="absolute inset-x-0 top-0 h-[32rem] sm:h-[36rem] bg-school-black overflow-hidden">
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 80% 90% at 15% -20%, rgba(15,45,92,0.9) 0%, transparent 65%), radial-gradient(ellipse 60% 70% at 100% 40%, rgba(15,45,92,0.6) 0%, transparent 60%)',
          }}
        />

        <img
          src={LOGO_SRC}
          alt=""
          aria-hidden="true"
          width="256"
          height="256"
          className="pointer-events-none select-none absolute opacity-[0.07] mix-blend-luminosity
                     w-[26rem] -right-24 top-10 sm:w-[32rem] sm:-right-20 lg:right-0"
        />

        <svg viewBox="0 0 1440 600" preserveAspectRatio="none" aria-hidden="true"
          className="absolute inset-0 w-full h-full text-white/[0.05]">
          <path d="M-60 460C220 380 440 430 720 340s520-170 800-110" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M-60 560C260 480 480 520 780 430s480-160 780-90" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>

        {/* Curved hand-off into the cream page below */}
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true"
          className="absolute inset-x-0 bottom-0 w-full h-16 sm:h-20">
          <path d="M0 52C260 116 620 124 940 78s360-60 500-38V120H0Z" fill="#FAF6F1" />
        </svg>
      </div>

      {/* Content flows normally and the footer sits directly under the card.
          Pinning it to the bottom of the viewport left a dead band of cream
          between the two on phones. */}
      <div className="relative flex flex-col px-4 py-6 sm:py-8">
        {/* The reference's language switcher is replaced by the way back to the
            public site: this build is English-only, so a locale menu would do
            nothing. */}
        <div className="flex justify-end">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-white transition-colors px-3 py-2"
          >
            <Icon d={ICONS.back} className="w-4 h-4" />
            Back to website
          </Link>
        </div>

        {/* Brand */}
        <div className="text-center mt-2 sm:mt-4">
          <img src={LOGO_SRC} alt={LOGO_ALT} width="256" height="256"
            className="h-20 sm:h-24 w-auto mx-auto object-contain" />
          <p className="mt-4 text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Mandela Bilingual
          </p>
          <p className="mt-1 text-white/70 text-sm sm:text-base">Nursery and Primary</p>

          <span className="block w-10 h-[3px] bg-accent rounded-full mx-auto mt-5" aria-hidden="true" />
          <p className="mt-3.5 flex justify-center gap-x-7 sm:gap-x-8 text-[11px] sm:text-xs font-bold uppercase tracking-[0.3em] text-white/45">
            <span>Learn</span>
            <span>Grow</span>
            <span>Belong</span>
          </p>
        </div>

        {/* Sign-in card */}
        <div className="w-full max-w-md mx-auto mt-7 sm:mt-9">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-9">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-school-black">Admin Sign In</h2>
              <p className="mt-2 font-semibold text-school-black">Welcome back.</p>
              <p className="mt-1 text-sm text-slate-600">
                Sign in to access the school administration portal.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 sm:mt-7 space-y-5">
              {error && (
                <div role="alert" className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wide text-slate-600 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Icon d={ICONS.mail} className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                    placeholder="Enter your email address"
                    className={`${fieldCls} pr-4`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wide text-slate-600 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Icon d={ICONS.lock} className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className={`${fieldCls} pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-school-black transition-colors rounded-lg"
                  >
                    <Icon d={showPassword ? ICONS.eyeOff : ICONS.eye} className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                <label className="inline-flex items-center gap-2.5 text-sm text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/30"
                  />
                  Keep me signed in
                </label>

                <button
                  type="button"
                  onClick={() => setShowHelp((v) => !v)}
                  aria-expanded={showHelp}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* Honest guidance rather than a link to a reset flow that does
                  not exist: a headteacher can set a new password from Staff. */}
              {showHelp && (
                <p className="bg-primary-50 border border-primary/15 text-slate-700 text-sm leading-relaxed px-4 py-3 rounded-xl">
                  Passwords are reset by a headteacher from <strong>Staff accounts</strong> in
                  the dashboard. Ask them to set a new one for you, then sign in and change it.
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-dark transition-colors disabled:opacity-60 shadow-sm"
              >
                {loading ? 'Signing in…' : 'Sign In'}
                {!loading && <Icon d={ICONS.arrow} className="w-5 h-5" />}
              </button>
            </form>
          </div>

          <p className="mt-5 text-center text-xs text-slate-500 leading-relaxed">
            For school staff only. Parents&rsquo; enquiries go through the{' '}
            <Link to="/contact" className="font-semibold text-primary hover:underline">
              contact page
            </Link>
            .
          </p>
        </div>

        <footer className="mt-8 sm:mt-10 text-center text-xs sm:text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Mandela Bilingual Nursery and Primary. All rights reserved.</p>
          <p className="mt-1 text-slate-400">Knowledge for Consciousness</p>
        </footer>
      </div>
    </div>
  );
}
