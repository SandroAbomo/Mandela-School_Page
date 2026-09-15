import { Link } from 'react-router-dom';

const NEWS = [
  { date: 'May 2026', category: 'Achievement', title: 'Students Win National Science Fair for Third Consecutive Year', excerpt: 'Our Year 6 team took top honours at the National Junior Science Fair, beating over 200 schools nationwide with their water purification project.' },
  { date: 'April 2026', category: 'Event', title: 'Annual Cultural Day Celebrates Bilingual Heritage', excerpt: 'Over 750 students, parents, and staff came together to celebrate the school\'s rich bilingual culture through music, dance, food, and art.' },
  { date: 'March 2026', category: 'School', title: 'New Innovation and Robotics Lab Opens Its Doors', excerpt: 'A state-of-the-art STEM facility gives students access to cutting-edge tools for coding, robotics, and digital making.' },
];

const CAT_COLOURS = {
  Achievement: 'bg-emerald-50 text-emerald-700',
  Event: 'bg-primary-50 text-accent',
  School: 'bg-amber-50 text-amber-600',
};

export default function NewsSection() {
  return (
    <section className="section-wrapper bg-white">
      <div className="container-xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 gap-4">
          <div>
            <span className="section-label">Latest Updates</span>
            <h2 className="mt-3 section-heading">News &amp; Events</h2>
          </div>
          <Link to="/news" className="link-arrow text-accent group">
            View all news <span className="ml-2 group-hover:ml-4 transition-all duration-200">→</span>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {NEWS.map((item) => (
            <article key={item.title} className="group cursor-pointer">
              <div className="bg-school-off-white h-48 flex items-end p-5 rounded-xl">
                <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-md ${CAT_COLOURS[item.category] || 'bg-gray-100 text-slate-500'}`}>
                  {item.category}
                </span>
              </div>
              <div className="pt-5">
                <p className="text-xs text-slate-700 mb-2">{item.date}</p>
                <h3 className="font-bold text-school-black text-lg leading-snug group-hover:text-accent transition-colors">{item.title}</h3>
                <p className="mt-2 text-slate-500 text-sm leading-relaxed">{item.excerpt}</p>
                <span className="mt-4 inline-flex items-center text-accent text-sm font-semibold gap-1">Read more →</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
