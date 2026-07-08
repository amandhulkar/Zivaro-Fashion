import { ResponsiveContainer } from 'recharts'

const ChartCard = ({ title, subtitle, children }) => <div className="luxury-card p-6"><div className="mb-5"><h3 className="font-serif text-xl text-primary">{title}</h3>{subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}</div><div className="h-72"><ResponsiveContainer width="100%" height="100%">{children}</ResponsiveContainer></div></div>
export default ChartCard
