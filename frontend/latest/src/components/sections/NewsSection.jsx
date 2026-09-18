import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPublicArticles } from '../../services/schoolAPI';

const CAT_COLOURS = {
  Achievement: 'bg-emerald-50 text-emerald-700',
  Event: 'bg-primary-50 text-accent',
  School: 'bg-amber-50 text-amber-600',
  Community: 'bg-yellow-50 text-yellow-700',
};

const monthYear = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' });

export default function NewsSection() {
  const [news, setNews] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchPublicArticles(3)
      .then((d) => !cancelled && setNews(d.articles))
      .catch(() => {})
      .finally(() => !cancelled && setLoaded(true));
    return () => { cancelled = true; };
  }, []);

  // The homepage should not show an empty band while the school has nothing
  // published, so the whole section stands down until there is something to say.
  if (loaded && news.length === 0) return null;

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
          {news.map((item) => (
            <Link to="/news" key={item._id} className="group">
              <article>
                <div className="bg-school-off-white h-48 flex items-end p-5 rounded-xl">
                  <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-md ${CAT_COLOURS[item.category] || 'bg-gray-100 text-slate-500'}`}>
                    {item.category}
                  </span>
                </div>
                <div className="pt-5">
                  <p className="text-xs text-slate-600 mb-2">
                    {item.publishedAt ? monthYear.format(new Date(item.publishedAt)) : ''}
                  </p>
                  <h3 className="font-bold text-school-black text-lg leading-snug group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-slate-500 text-sm leading-relaxed">{item.excerpt}</p>
                  <span className="mt-4 inline-flex items-center text-accent text-sm font-semibold gap-1">
                    Read more →
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
