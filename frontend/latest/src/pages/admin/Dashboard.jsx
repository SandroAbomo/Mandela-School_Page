import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { fetchEnquiries, fetchStats } from '../../services/enquiryAPI';
import StatsCards from '../../components/admin/StatsCards';
import Table from '../../components/admin/Table';

export default function AdminDashboard() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState([]);
  const [stats, setStats] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [enquiryData, statsData] = await Promise.all([
          fetchEnquiries(token, { search, status: statusFilter, page }),
          fetchStats(token),
        ]);
        setEnquiries(enquiryData.enquiries);
        setTotalPages(enquiryData.totalPages);
        setStats(statsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token, search, statusFilter, page]);

  function handleLogout() {
    logout();
    navigate('/admin/login');
  }

  return (
    <div className="min-h-screen bg-school-off-white">
      <header className="bg-school-black px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-6 h-0.5 bg-primary" />
          <span className="text-white font-bold text-sm uppercase tracking-widest">Admin — Mandela Bilingual</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs text-slate-700 hover:text-white transition-colors uppercase tracking-wide font-semibold"
        >
          Sign Out
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-school-black mb-8">Enquiry Dashboard</h1>

        <StatsCards stats={stats} />

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <input
            type="search"
            placeholder="Search by name, email or subject…"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="flex-1 border border-gray-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors rounded-lg"
          />
          <select
            value={statusFilter}
            onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
            className="border border-gray-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors rounded-lg"
          >
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="replied">Replied</option>
          </select>
        </div>

        <div className="mt-4">
          {loading ? (
            <div className="py-16 text-center text-slate-700 text-sm">Loading…</div>
          ) : (
            <Table enquiries={enquiries} />
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => setPage(p => p - 1)}
            disabled={page === 1}
            className="text-sm font-semibold text-school-black disabled:opacity-30 hover:text-accent transition-colors"
          >
            ← Prev
          </button>
          <span className="text-sm text-slate-500">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={page === totalPages}
            className="text-sm font-semibold text-school-black disabled:opacity-30 hover:text-accent transition-colors"
          >
            Next →
          </button>
        </div>
      </main>
    </div>
  );
}
