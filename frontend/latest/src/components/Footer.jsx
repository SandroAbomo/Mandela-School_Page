import { Link } from 'react-router-dom';
import { LOGO_ALT, LOGO_SRC } from '../assets';

const CAMPUS = { name: 'Main Campus', address: '15 Mandela Drive, Central District' };

const QUICK_LINKS = [
  { to: '/about', label: 'About Us' },
  { to: '/academics', label: 'Academics' },
  { to: '/admissions', label: 'Admissions' },
  { to: '/campuses', label: 'Our Campus' },
  { to: '/activities', label: 'Activities' },
  { to: '/news', label: 'News & Events' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="bg-school-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src={LOGO_SRC} alt={LOGO_ALT} width="256" height="256" className="h-[3.6rem] w-auto object-contain" />
              <div className="leading-tight">
                <p className="font-bold text-white text-sm">Mandela Bilingual</p>
                <p className="text-xs text-white/50">Nursery and Primary</p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Nurturing the next generation of leaders through world-class bilingual education, rooted in values and driven by excellence.
            </p>
            <div className="flex gap-3 mt-6">
              {['FB', 'TW', 'IG', 'YT'].map((s) => (
                <a key={s} href="#" aria-label={s}
                  className="w-8 h-8 bg-white/10 hover:bg-primary rounded-lg flex items-center justify-center transition-colors text-xs font-bold">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold text-white mb-5 text-xs uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-white/50 text-sm hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Campus */}
          <div>
            <h4 className="font-bold text-white mb-5 text-xs uppercase tracking-widest">Our Campus</h4>
            <div>
              <p className="text-white text-sm font-semibold">{CAMPUS.name}</p>
              <p className="text-white/50 text-xs mt-1">{CAMPUS.address}</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-5 text-xs uppercase tracking-widest">Get in Touch</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <p className="text-white font-semibold">Admissions Office</p>
                <a href="mailto:admissions@mandelabilingual.sch" className="text-white/50 hover:text-white transition-colors text-xs mt-0.5 block">
                  admissions@mandelabilingual.sch
                </a>
              </li>
              <li>
                <p className="text-white font-semibold">General Enquiries</p>
                <a href="mailto:info@mandelabilingual.sch" className="text-white/50 hover:text-white transition-colors text-xs mt-0.5 block">
                  info@mandelabilingual.sch
                </a>
              </li>
              <li>
                <p className="text-white font-semibold">Phone</p>
                <a href="tel:+18000000000" className="text-white/50 hover:text-white transition-colors text-xs mt-0.5 block">
                  +1 (800) 000-0000
                </a>
              </li>
            </ul>
            <Link to="/admissions" className="mt-6 block text-center md:inline-flex md:items-center px-5 py-3 bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors rounded-lg">
              Apply Now →
            </Link>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Mandela Bilingual Nursery and Primary. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">Safeguarding</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
