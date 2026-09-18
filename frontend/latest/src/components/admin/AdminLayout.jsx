import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LOGO_ALT, LOGO_SRC } from '../../assets';

const ROLE_LABELS = {
  admin: 'Office Admin',
  teacher: 'Teacher',
  headteacher: 'Headteacher',
};

function Icon({ d }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] flex-shrink-0"
      aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const PATHS = {
  overview: 'M3 12l9-9 9 9M5 10v10h14V10',
  enquiries: 'M4 5h16v14H4zM4 7l8 6 8-6',
  students: 'M12 3l9 5-9 5-9-5 9-5zM5 11v5c0 1.5 3.1 3 7 3s7-1.5 7-3v-5',
  news: 'M4 5h11v14H4zM15 9h5v8a2 2 0 0 1-2 2h-3M7 9h5M7 13h5',
  events: 'M4 6h16v14H4zM8 3v5M16 3v5M4 11h16',
  staff: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2 20c0-3.3 3.1-5.5 7-5.5s7 2.2 7 5.5M17 10h5M19.5 7.5v5',
};

export default function AdminLayout({ title, subtitle, actions, children }) {
  const { user, role, can, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Built from the signed-in role so staff are never shown a door they cannot
  // open; the server refuses the data regardless.
  const nav = [
    { to: '/admin/overview', label: 'Overview', icon: PATHS.overview, show: true },
    { to: '/admin/enquiries', label: 'Enquiries', icon: PATHS.enquiries, show: can.seeEnquiries },
    { to: '/admin/students', label: 'Students', icon: PATHS.students, show: true },
    { to: '/admin/news', label: 'News', icon: PATHS.news, show: true },
    { to: '/admin/events', label: 'Events', icon: PATHS.events, show: true },
    { to: '/admin/staff', label: 'Staff', icon: PATHS.staff, show: can.manageStaff },
  ].filter((i) => i.show);

  const isActive = (to) => pathname === to || pathname.startsWith(`${to}/`);

  function handleLogout() {
    logout();
    navigate('/admin/login');
  }

  return (
    <div className="min-h-screen bg-school-off-white">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-school-black flex flex-col transition-transform duration-200 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-5 py-5 border-b border-white/10 flex items-center gap-3">
          <img src={LOGO_SRC} alt={LOGO_ALT} width="256" height="256"
            className="h-10 w-auto object-contain" />
          <div className="leading-tight min-w-0">
            <p className="text-white font-bold text-sm truncate">Mandela Bilingual</p>
            <p className="text-white/50 text-[11px]">Staff Dashboard</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {nav.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              aria-current={isActive(to) ? 'page' : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(to)
                  ? 'bg-primary text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon d={icon} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <div className="px-3 pb-3">
            <p className="text-white text-sm font-semibold truncate">
              {user?.name || user?.email || 'Signed in'}
            </p>
            <p className="text-accent text-[11px] font-bold uppercase tracking-widest mt-0.5">
              {ROLE_LABELS[role] || role}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            Sign out
          </button>
        </div>
      </aside>

      {open && (
        <button
          onClick={() => setOpen(false)}
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-school-black/50 lg:hidden"
        />
      )}

      {/* Content */}
      <div className="lg:pl-64">
        <header className="bg-white border-b border-gray-100 sticky top-0 z-20">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
            <button
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
              className="lg:hidden p-2 -ml-2 text-school-black"
            >
              <Icon d="M4 6h16M4 12h16M4 18h16" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg font-bold text-school-black truncate">{title}</h1>
              {subtitle && <p className="text-sm text-slate-500 truncate">{subtitle}</p>}
            </div>
            {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
          </div>
        </header>

        <main className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">{children}</main>
      </div>
    </div>
  );
}
