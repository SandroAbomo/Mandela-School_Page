import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { fetchEnquiries, fetchStats } from '../../services/enquiryAPI';
import { useAsyncData } from '../../hooks/useAsyncData';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  Card, StatCard, Badge, Button, Select, EmptyState, Loading, ErrorNote,
} from '../../components/admin/ui';

export default function Enquiries() {
  const { token } = useAuth();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);

  const { data, loading, error } = useAsyncData(
    async () => {
      const [list, stats] = await Promise.all([
        fetchEnquiries(token, { search, status: statusFilter, page }),
        fetchStats(token),
      ]);
      return { ...list, stats };
    },
    [token, search, statusFilter, page]
  );

  const enquiries = data?.enquiries ?? [];
  const stats = data?.stats ?? null;
  const totalPages = data?.totalPages ?? 1;

  const filtering = Boolean(search || statusFilter);

  return (
    <AdminLayout
      title="Enquiries"
      subtitle={stats ? `${stats.pending} awaiting a reply` : 'Admissions inbox'}
    >
      <ErrorNote>{error}</ErrorNote>

      {stats && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatCard label="Total" value={stats.total} accent="border-t-school-black" />
          <StatCard label="Pending" value={stats.pending} accent="border-t-accent" />
          <StatCard label="Replied" value={stats.replied} accent="border-t-green-500" />
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="search"
          placeholder="Search by name, email or subject…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="flex-1 border border-gray-200 bg-white px-4 py-2.5 text-sm rounded-lg focus:outline-none focus:border-primary transition-colors"
        />
        <Select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="sm:w-44"
        >
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="replied">Replied</option>
        </Select>
      </div>

      {loading ? (
        <Loading label="Loading enquiries…" />
      ) : enquiries.length === 0 ? (
        <EmptyState
          title={filtering ? 'No enquiries match those filters' : 'No enquiries yet'}
          description={
            filtering
              ? 'Try clearing the search or the status filter.'
              : 'When a parent submits the enquiry form on the website, it arrives here and the admissions inbox is notified by email.'
          }
        />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-school-off-white border-b border-gray-100">
                  {['Name', 'Email', 'Subject', 'Status', 'Received', ''].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-600">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {enquiries.map((e) => (
                  <tr key={e._id} className="border-b border-gray-50 last:border-0 hover:bg-school-off-white transition-colors">
                    <td className="px-4 py-3 font-medium text-school-black">{e.name}</td>
                    <td className="px-4 py-3 text-slate-500">{e.email}</td>
                    <td className="px-4 py-3 text-slate-500 max-w-xs truncate">{e.subject}</td>
                    <td className="px-4 py-3"><Badge value={e.status} /></td>
                    <td className="px-4 py-3 text-slate-500 text-xs">
                      {new Date(e.createdAt).toLocaleDateString('en-GB')}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        to={`/admin/enquiries/${e._id}`}
                        className="text-primary font-semibold text-xs hover:underline whitespace-nowrap"
                      >
                        Open →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {totalPages > 1 && (
        <div className="mt-5 flex items-center justify-between">
          <Button variant="secondary" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            ← Previous
          </Button>
          <span className="text-sm text-slate-500">Page {page} of {totalPages}</span>
          <Button variant="secondary" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
            Next →
          </Button>
        </div>
      )}
    </AdminLayout>
  );
}
