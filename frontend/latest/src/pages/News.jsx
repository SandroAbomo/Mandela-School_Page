const NEWS = [
  { date: 'May 2026', category: 'Achievement', title: 'Students Win National Science Fair for Third Consecutive Year', body: 'A team of six students took top honours at the National Junior Science Fair, beating over 200 schools nationwide with their innovative water purification project.' },
  { date: 'April 2026', category: 'Event', title: 'Annual Cultural Day Celebrates Bilingual Heritage', body: 'Over 750 students, parents, and staff came together to celebrate the school\'s rich bilingual culture through music, dance, food, and art.' },
  { date: 'March 2026', category: 'School', title: 'New Innovation and Robotics Lab Opens Its Doors', body: 'A state-of-the-art STEM facility officially opened, providing students with access to cutting-edge tools for coding, robotics, and digital making.' },
  { date: 'February 2026', category: 'Achievement', title: 'Choir Wins Gold at Regional Music Competition', body: 'Our school choir brought home a gold medal at the Regional Schools Music Festival. The 45-member choir has now qualified for the national finals taking place in June.' },
  { date: 'January 2026', category: 'Community', title: 'Launch of Bilingual Reading Challenge', body: 'January saw the launch of our first ever bilingual reading challenge, with over 500 students pledging to read books in both languages before the summer term.' },
  { date: 'December 2025', category: 'Event', title: 'End of Year Celebrations', body: 'The autumn term ended with a spectacular end-of-year show, a bilingual musical featuring students from Nursery through to Class 7.' },
];

const EVENTS = [
  { date: 'Jun 14', title: 'Open Day — Main Campus', time: '10:00am – 1:00pm' },
  { date: 'Jul 18', title: 'Year 7 Graduation Ceremony', time: '6:00pm – 8:00pm' },
  { date: 'Sep 1', title: 'New Academic Year Begins (2026–2027)', time: 'Main campus' },
];

const CAT = { Achievement: 'bg-emerald-50 text-emerald-700', Event: 'bg-primary-50 text-accent', School: 'bg-amber-50 text-amber-600', Community: 'bg-yellow-50 text-yellow-700' };

export default function News() {
  return (
    <>
      <section className="bg-school-black pt-36 pb-20 lg:pt-44 lg:pb-28">
        <div className="container-xl text-center sm:text-left">
          <span className="section-label">Latest Updates</span>
          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[0.92] max-w-2xl mx-auto sm:mx-0">
            News &amp; <span className="text-accent">Events</span>.
          </h1>
        </div>
      </section>

      <section className="section-wrapper bg-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
            <div className="lg:col-span-2">
              <h2 className="font-bold text-2xl text-school-black mb-8">Latest News</h2>
              <div className="space-y-10">
                {NEWS.map((item) => (
                  <article key={item.title} className="border-b border-gray-100 pb-10">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-md ${CAT[item.category] || 'bg-slate-100 text-slate-700'}`}>{item.category}</span>
                      <span className="text-xs text-slate-300">·</span>
                      <span className="text-xs text-slate-700">{item.date}</span>
                    </div>
                    <h3 className="font-bold text-xl text-school-black leading-snug">{item.title}</h3>
                    <p className="mt-3 text-slate-500 leading-relaxed text-sm">{item.body}</p>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-bold text-2xl text-school-black mb-8">Upcoming Events</h2>
              <div className="space-y-3">
                {EVENTS.map(({ date, title, time }) => (
                  <div key={title} className="flex gap-4 bg-school-off-white p-4 rounded-xl shadow-sm">
                    <div className="w-12 text-center flex-shrink-0"><p className="text-accent font-bold text-sm leading-tight">{date}</p></div>
                    <div><p className="font-semibold text-school-black text-sm">{title}</p><p className="text-slate-700 text-xs mt-0.5">{time}</p></div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-6 bg-primary text-white rounded-xl shadow-sm">
                <p className="font-bold">Stay Updated</p>
                <p className="text-white/80 text-sm mt-1 leading-relaxed">Follow us on social media for the latest school news.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
