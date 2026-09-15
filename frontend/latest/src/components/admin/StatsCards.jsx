export default function StatsCards({ stats }) {
  if (!stats) return null;

  const cards = [
    { label: 'Total Enquiries', value: stats.total, colour: 'border-t-school-black' },
    { label: 'Pending', value: stats.pending, colour: 'border-t-yellow-400' },
    { label: 'Replied', value: stats.replied, colour: 'border-t-green-500' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {cards.map(({ label, value, colour }) => (
        <div key={label} className={`bg-white border border-gray-100 border-t-4 ${colour} p-6 rounded-xl shadow-sm`}>
          <p className="text-3xl font-bold text-school-black">{value}</p>
          <p className="text-sm text-slate-500 mt-1">{label}</p>
        </div>
      ))}
    </div>
  );
}
