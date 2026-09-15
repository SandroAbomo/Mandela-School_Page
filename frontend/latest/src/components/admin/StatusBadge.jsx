const STYLES = {
  pending: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  replied: 'bg-green-50 text-green-700 border border-green-200',
};

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide rounded-full ${STYLES[status] || 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  );
}
