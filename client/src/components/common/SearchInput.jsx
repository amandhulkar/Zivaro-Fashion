import { FiSearch, FiX } from 'react-icons/fi'
const SearchInput = ({ value = '', onChange, onClear, placeholder = 'Search dresses, edits, occasions...', className = '' }) => (
  <div className={`relative ${className}`}><FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" /><input value={value} onChange={onChange} placeholder={placeholder} className="focus-ring w-full rounded-full border border-line bg-secondary py-3 pl-11 pr-11 text-sm outline-none focus:border-accent" />{value && <button type="button" aria-label="Clear search" onClick={onClear} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-accent"><FiX /></button>}</div>
)
export default SearchInput
