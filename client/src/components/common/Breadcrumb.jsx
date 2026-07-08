import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
const Breadcrumb = ({ items = [], className = '' }) => <nav aria-label="Breadcrumb" className={`flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted ${className}`}>{items.map((item, index) => <span key={`${item.label}-${index}`} className="flex items-center gap-2">{item.to ? <Link className="hover:text-accent" to={item.to}>{item.label}</Link> : <span className="text-text">{item.label}</span>}{index < items.length - 1 && <FiChevronRight />}</span>)}</nav>
export default Breadcrumb
