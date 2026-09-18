import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

const CAMPUS = {
  id: 1,
  name: 'Main Campus',
  tagline: 'The Heart of Learning',
  location: '15 Mandela Drive, Central District',
  phone: '+1 (800) 100-0001',
  email: 'campus@mandelabilingual.sch',
  students: '750',
  teachers: '52',
  founded: '2010',
  desc: 'Our founding campus and main administrative hub. The Main Campus is home to the school leadership team, state-of-the-art bilingual learning suites, science labs, and the iconic performing arts theatre.',
  facilities: [
    'Main school administration office',
    '8 fully-equipped science laboratories',
    'Dedicated bilingual immersion suites',
    'Performing arts theatre (250 seats)',
    'School library with 8,000+ titles',
    'Multi-purpose sports hall',
    'Student council meeting rooms',
    'Parent resource centre',
  ],
};

export default function Campuses() {
  return (
    <>
      <PageHero
        label="Our Location"
        title={<>One campus,<br /><span className="text-accent">one family</span>.</>}
        intro="A single, vibrant campus united by high standards, shared values, and a commitment to bilingual excellence."
      />

      <section className="section-wrapper bg-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <span className="section-label">Campus</span>
              <h2 className="mt-2 text-4xl font-bold text-school-black tracking-tight">{CAMPUS.name}</h2>
              <p className="text-accent font-semibold mt-1">{CAMPUS.tagline}</p>
              <p className="mt-5 text-slate-500 leading-relaxed">{CAMPUS.desc}</p>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[{ v: CAMPUS.students, l: 'Students' }, { v: CAMPUS.teachers, l: 'Teachers' }, { v: CAMPUS.founded, l: 'Founded' }].map(({ v, l }) => (
                  <div key={l} className="p-4 bg-school-off-white text-center rounded-lg shadow-sm">
                    <p className="text-2xl font-bold text-school-black">{v}</p>
                    <p className="text-xs text-slate-700 mt-0.5">{l}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-2 text-sm text-slate-500">
                <p><span className="font-semibold text-school-black">Address:</span> {CAMPUS.location}</p>
                <p><span className="font-semibold text-school-black">Phone:</span> <a href={`tel:${CAMPUS.phone}`} className="hover:text-accent">{CAMPUS.phone}</a></p>
                <p><span className="font-semibold text-school-black">Email:</span> <a href={`mailto:${CAMPUS.email}`} className="hover:text-accent">{CAMPUS.email}</a></p>
              </div>
            </div>
            <div>
              <div className="bg-school-black p-8 rounded-xl shadow-sm">
                <h3 className="font-bold text-white mb-6 text-sm uppercase tracking-widest">Facilities</h3>
                <ul className="space-y-3">
                  {CAMPUS.facilities.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-white/60 text-sm">
                      <span className="text-accent mt-0.5 flex-shrink-0">✓</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
              <Link to="/admissions" className="mt-4 flex items-center justify-center w-full py-4 bg-primary text-white font-semibold hover:bg-primary-dark transition-colors text-sm uppercase tracking-wide rounded-lg shadow-sm">
                Apply to {CAMPUS.name}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="container-xl text-center">
          <h2 className="text-3xl font-bold text-white">Ready to join our family?</h2>
          <p className="mt-3 text-white/70 text-lg">Applications for 2026–2027 entry are now open.</p>
          <Link to="/admissions" className="mt-6 inline-flex items-center px-8 py-4 bg-white text-accent font-bold hover:bg-white/90 transition-colors text-sm uppercase tracking-wide rounded-lg shadow-sm">Apply Now</Link>
        </div>
      </section>
    </>
  );
}
