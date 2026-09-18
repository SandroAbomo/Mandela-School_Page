import { useEffect, useState } from 'react';
import { fetchPublicArticles, fetchPublicEvents } from '../services/schoolAPI';
import PageHero from '../components/PageHero';

const CAT = {
  Achievement: 'bg-emerald-50 text-emerald-700',
  Event: 'bg-primary-50 text-accent',
  School: 'bg-amber-50 text-amber-600',
  Community: 'bg-yellow-50 text-yellow-700',
};

const monthYear = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' });
const dayMonth = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' });

export default function News() {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Content comes from the staff dashboard. If the API is unreachable the page
  // still renders with its headings and a short notice rather than breaking.
  useEffect(() => {
    let cancelled = false;
    Promise.allSettled([fetchPublicArticles(20), fetchPublicEvents(6)])
      .then(([a, e]) => {
        if (cancelled) return;
        if (a.status === 'fulfilled') setNews(a.value.articles);
        if (e.status === 'fulfilled') setEvents(e.value.events);
      })
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      <PageHero
        label="Latest Updates"
        title={<>News &amp; <span className="text-accent">Events</span>.</>}
        intro="Achievements, announcements and everything coming up at the school this term."
      />

      <section className="section-wrapper bg-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
            <div className="lg:col-span-2">
              <h2 className="font-bold text-2xl text-school-black mb-8">Latest News</h2>

              {loading ? (
                <p className="text-slate-500 text-sm">Loading the latest news…</p>
              ) : news.length === 0 ? (
                <p className="text-slate-500 text-sm">
                  There are no news articles just yet. Please check back soon.
                </p>
              ) : (
                <div className="space-y-10">
                  {news.map((item) => (
                    <article key={item._id} className="border-b border-gray-100 pb-10 last:border-0">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-md ${CAT[item.category] || 'bg-slate-100 text-slate-700'}`}>
                          {item.category}
                        </span>
                        <span className="text-xs text-slate-300">·</span>
                        <span className="text-xs text-slate-600">
                          {item.publishedAt ? monthYear.format(new Date(item.publishedAt)) : ''}
                        </span>
                      </div>
                      <h3 className="font-bold text-xl text-school-black leading-snug">{item.title}</h3>
                      <p className="mt-3 text-slate-600 leading-relaxed text-sm whitespace-pre-line">
                        {item.body}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h2 className="font-bold text-2xl text-school-black mb-8">Upcoming Events</h2>

              {loading ? (
                <p className="text-slate-500 text-sm">Loading events…</p>
              ) : events.length === 0 ? (
                <p className="text-slate-500 text-sm">No events are scheduled at the moment.</p>
              ) : (
                <div className="space-y-3">
                  {events.map((ev) => (
                    <div key={ev._id} className="flex gap-4 bg-school-off-white p-4 rounded-xl shadow-sm">
                      <div className="w-12 text-center flex-shrink-0">
                        <p className="text-accent font-bold text-sm leading-tight">
                          {dayMonth.format(new Date(ev.startsAt))}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-school-black text-sm">{ev.title}</p>
                        <p className="text-slate-600 text-xs mt-0.5">
                          {ev.timeLabel || ev.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 p-6 bg-primary text-white rounded-xl shadow-sm">
                <p className="font-bold">Stay Updated</p>
                <p className="text-white/80 text-sm mt-1 leading-relaxed">
                  Follow us on social media for the latest school news.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
