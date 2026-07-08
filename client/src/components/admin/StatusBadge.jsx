const styles = {
  active: 'bg-emerald-50 text-emerald-700',
  inactive: 'bg-gray-100 text-gray-600',
  pending: 'bg-amber-50 text-amber-700',
  accepted: 'bg-blue-50 text-blue-700',
  packed: 'bg-indigo-50 text-indigo-700',
  shipped: 'bg-purple-50 text-purple-700',
  delivered: 'bg-emerald-50 text-emerald-700',
  cancelled: 'bg-red-50 text-red-700',
  refunded: 'bg-slate-100 text-slate-700',
  paid: 'bg-emerald-50 text-emerald-700',
  unpaid: 'bg-amber-50 text-amber-700',
}

const StatusBadge = ({ status }) => <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${styles[status] || 'bg-background text-muted'}`}>{status || 'unknown'}</span>
export default StatusBadge
