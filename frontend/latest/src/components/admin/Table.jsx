import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';

export default function Table({ enquiries }) {
  if (!enquiries?.length) {
    return <p className="text-center text-slate-700 py-12">No enquiries found.</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-school-off-white">
              {['Name', 'Email', 'Subject', 'Status', 'Date', ''].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-700">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {enquiries.map((e) => (
              <tr key={e._id} className="border-b border-gray-50 hover:bg-school-off-white transition-colors">
                <td className="px-4 py-3 font-medium text-school-black">{e.name}</td>
                <td className="px-4 py-3 text-slate-500">{e.email}</td>
                <td className="px-4 py-3 text-slate-500 max-w-xs truncate">{e.subject}</td>
                <td className="px-4 py-3"><StatusBadge status={e.status} /></td>
                <td className="px-4 py-3 text-slate-700">{new Date(e.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <Link to={`/admin/enquiries/${e._id}`} className="text-accent font-semibold text-xs hover:underline whitespace-nowrap">
                    View →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
