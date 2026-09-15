import { Link } from 'react-router-dom';

const CAMPUS = {
  id: 1,
  name: 'Main Campus',
  location: 'Central District',
  students: '750',
  founded: '2010',
  features: ['Main administration', 'Science laboratories', 'Bilingual learning suites', 'Performing arts theatre'],
  theme: 'dark',
};

const T = {
  dark: { card: 'bg-school-black', label: 'text-white/40', title: 'text-white', sub: 'text-white/60', stat: 'text-white', statL: 'text-white/40', feat: 'text-white/75', dash: 'text-accent', link: 'text-accent' },
};

export default function CampusesSection() {
  const s = T[CAMPUS.theme];
  return (
    <section className="section-wrapper bg-school-off-white">
      <div className="container-xl">
        <div className="text-center mb-14">
          <span className="section-label">Our Location</span>
          <h2 className="mt-3 section-heading">One campus,<br />one family.</h2>
        </div>
        <div className="max-w-[35rem] mx-auto">
          <div className={`${s.card} p-8 flex flex-col text-center transition-transform duration-300 hover:-translate-y-1 rounded-2xl shadow-sm`}>
            <div className="mb-6">
              <span className={`text-xs font-bold uppercase tracking-widest ${s.label}`}>Campus</span>
              <h3 className={`text-2xl font-bold mt-1 ${s.title}`}>{CAMPUS.name}</h3>
              <p className={`text-sm mt-1 ${s.sub}`}>{CAMPUS.location}</p>
            </div>
            <div className="flex justify-center gap-8 mb-6">
              <div><p className={`text-3xl font-bold ${s.stat}`}>{CAMPUS.students}</p><p className={`text-xs ${s.statL}`}>Students</p></div>
              <div><p className={`text-3xl font-bold ${s.stat}`}>{CAMPUS.founded}</p><p className={`text-xs ${s.statL}`}>Founded</p></div>
            </div>
            <ul className="space-y-2.5 flex-grow">
              {CAMPUS.features.map((f) => (
                <li key={f} className={`text-sm ${s.feat}`}>
                  {f}
                </li>
              ))}
            </ul>
            <Link to="/campuses" className={`mt-8 link-arrow group self-end ${s.link}`}>
              Learn More <span className="ml-2 group-hover:ml-4 transition-all duration-200">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
