const StatCard = ({ label, value, helper }) => <div className="luxury-card p-6"><p className="small-text">{label}</p><p className="mt-3 text-3xl font-bold text-primary">{value}</p>{helper && <p className="mt-2 text-sm text-muted">{helper}</p>}</div>
export default StatCard
