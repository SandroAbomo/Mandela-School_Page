import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { fetchOverview } from '../../services/schoolAPI';
import AdminLayout from '../../components/admin/AdminLayout';
import { Card, StatCard, Badge, Loading, ErrorNote, EmptyState, Button } from '../../components/admin/ui';

const dateFmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' });

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

/** Horizontal bar per year group — the roster shape at a glance. */
function YearGroupChart({ groups }) {
  const max = Math.max(...groups.map((g) => g.count), 1);
  const total = groups.reduce((sum, g) => sum + g.count, 0);

  if (!total) {
    return (
      <p className="text-sm text-slate-500">
        No students on the roll yet. Year groups appear here once students are added.
      </p>
    );
  }

  return (
    <ul className="space-y-2.5">
      {groups.map(({ name, count }) => (
        <li key={name} className="flex items-center gap-3">
          <span className="w-20 text-xs font-semibold text-slate-600 flex-shrink-0">{name}</span>
          <div className="flex-1 bg-school-off-white rounded-full h-2.5 overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${(count / max) * 100}%` }}
            />
          </div>
          <span className="w-8 text-right text-xs font-bold text-school-black tabular-nums">
            {count}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function Overview() {
  const { token, user, can } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchOverview(token)
      .then((d) => !cancelled && setData(d))
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [token]);

  const firstName = (user?.name || '').split(' ')[0];

  return (
    <AdminLayout
      title={`${greeting()}${firstName ? `, ${firstName}` : ''}`}
      subtitle="Here is where the school stands today."
    >
      <ErrorNote>{error}</ErrorNote>
      {loading ? (
        <Loading label="Loading school overview…" />
      ) : !data ? (
        <EmptyState
          title="Overview unavailable"
          description="The dashboard could not reach the API. Check that the backend is running."
        />
      ) : (
        <div className="space-y-6">
          {/* Headline numbers */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Students on roll"
              value={data.students.enrolled}
              hint={`${data.students.applicants} applicant${data.students.applicants === 1 ? '' : 's'} pending`}
              accent="border-t-primary"
            />
            {can.seeEnquiries && (
              <StatCard
                label="Enquiries awaiting reply"
                value={data.enquiries.pending}
                hint={`${data.enquiries.thisMonth} received this month`}
                accent="border-t-accent"
              />
            )}
            <StatCard
              label="Published news"
              value={data.content.published}
              hint={`${data.content.drafts} draft${data.content.drafts === 1 ? '' : 's'}`}
              accent="border-t-green-500"
            />
            <StatCard
              label="Upcoming events"
              value={data.upcomingEvents.length}
              hint="Visible on the website"
              accent="border-t-school-black"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Roster shape */}
            <Card className="lg:col-span-2 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-school-black">Students by year group</h2>
                <Link
                  to="/admin/students"
                  className="text-xs font-bold uppercase tracking-wide text-primary hover:underline"
                >
                  Open roster →
                </Link>
              </div>
              <YearGroupChart groups={data.students.yearGroups} />
            </Card>

            {/* What is coming up */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-school-black">What&rsquo;s next</h2>
                <Link
                  to="/admin/events"
                  className="text-xs font-bold uppercase tracking-wide text-primary hover:underline"
                >
                  All events →
                </Link>
              </div>
              {data.upcomingEvents.length === 0 ? (
                <div className="text-sm text-slate-500">
                  <p>Nothing scheduled.</p>
                  <Link to="/admin/events" className="text-primary font-semibold hover:underline mt-2 inline-block">
                    Add an event
                  </Link>
                </div>
              ) : (
                <ul className="space-y-3">
                  {data.upcomingEvents.map((e) => (
                    <li key={e._id} className="flex gap-3">
                      <div className="w-12 flex-shrink-0 text-center bg-school-off-white rounded-lg py-1.5">
                        <p className="text-primary font-bold text-xs leading-tight">
                          {dateFmt.format(new Date(e.startsAt))}
                        </p>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-school-black leading-snug">
                          {e.title}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {e.timeLabel || e.location}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>

          {/* Enquiries needing a human */}
          {can.seeEnquiries && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-school-black">Latest enquiries</h2>
                <Link
                  to="/admin/enquiries"
                  className="text-xs font-bold uppercase tracking-wide text-primary hover:underline"
                >
                  Open inbox →
                </Link>
              </div>

              {data.recentEnquiries.length === 0 ? (
                <EmptyState
                  title="No enquiries yet"
                  description="When a parent submits the form on the website, it lands here and the admissions inbox is notified by email."
                  action={
                    <Link to="/contact">
                      <Button variant="secondary">View the public form</Button>
                    </Link>
                  }
                />
              ) : (
                <ul className="divide-y divide-gray-50">
                  {data.recentEnquiries.map((e) => (
                    <li key={e._id}>
                      <Link
                        to={`/admin/enquiries/${e._id}`}
                        className="flex flex-wrap items-center gap-3 py-3 hover:bg-school-off-white -mx-2 px-2 rounded-lg transition-colors"
                      >
                        <span className="font-semibold text-school-black text-sm w-40 truncate">
                          {e.name}
                        </span>
                        <span className="text-sm text-slate-500 flex-1 min-w-0 truncate">
                          {e.subject}
                        </span>
                        <Badge value={e.status} />
                        <span className="text-xs text-slate-500 w-20 text-right">
                          {dateFmt.format(new Date(e.createdAt))}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          )}
        </div>
      )}
    </AdminLayout>
  );
}
