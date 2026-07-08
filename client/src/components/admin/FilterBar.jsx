import Button from '../common/Button'
import Input from '../common/Input'

const FilterBar = ({ search, onSearch, children, onReset }) => <div className="luxury-card mb-6 flex flex-col gap-4 p-4 lg:flex-row lg:items-end"><Input className="flex-1" label="Search" value={search || ''} onChange={(event)=>onSearch?.(event.target.value)} placeholder="Search records..." />{children}<Button variant="outline" onClick={onReset}>Reset</Button></div>
export default FilterBar
