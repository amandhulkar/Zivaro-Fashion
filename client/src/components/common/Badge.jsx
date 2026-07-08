const styles = { sale:'bg-accent text-secondary', new:'bg-primary text-secondary', bestseller:'bg-warning text-secondary', limited:'bg-gray-900 text-secondary', neutral:'bg-gray-100 text-text', success:'bg-success text-secondary' }
const Badge = ({ children, variant = 'neutral', className = '' }) => <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${styles[variant] || styles.neutral} ${className}`}>{children}</span>
export default Badge
