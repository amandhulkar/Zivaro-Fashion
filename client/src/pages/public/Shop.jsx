import { useEffect, useState } from 'react'
import { FiGrid, FiList, FiX } from 'react-icons/fi'
import { useSearchParams } from 'react-router-dom'
import Container from '../../components/common/Container'
import EmptyState from '../../components/common/EmptyState'
import PageHeader from '../../components/common/PageHeader'
import SearchInput from '../../components/common/SearchInput'
import ProductCard from '../../components/home/ProductCard'
import { useProducts } from '../../hooks/useProducts'

const sortOptions = [
  ['featured', 'Featured'], ['newest', 'New Arrivals'], ['best-sellers', 'Best Sellers'], ['price-asc', 'Price: Low to High'], ['price-desc', 'Price: High to Low'], ['rating', 'Top Rated'], ['discount', 'Highest Discount'],
]
const ratingOptions = [4, 4.5]
const discountOptions = [20, 25, 30]

const FilterButton = ({ active, children, onClick }) => <button onClick={onClick} className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[.14em] ${active ? 'border-accent bg-accent text-secondary' : 'border-line bg-secondary text-muted hover:text-accent'}`}>{children}</button>

const Shop = () => {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const [category, setCategory] = useState(params.get('category') || 'All')
  const [sort, setSort] = useState(params.get('sort') || 'featured')
  const [view, setView] = useState('grid')
  const [filters, setFilters] = useState({ price: '', rating: '', discount: '', size: '', color: '', availability: false })
  const { filteredProducts, suggestions, categories, priceRanges, availableColors, availableSizes } = useProducts({ query, category, sort, filters })

  useEffect(() => {
    setQuery(params.get('q') || '')
    setCategory(params.get('category') || 'All')
    setSort(params.get('sort') || 'featured')
  }, [params])

  const updateFilter = (key, value) => setFilters((current) => ({ ...current, [key]: current[key] === value ? '' : value }))
  const clearFilters = () => { setQuery(''); setCategory('All'); setSort('featured'); setFilters({ price: '', rating: '', discount: '', size: '', color: '', availability: false }); setParams({}) }
  const applySearch = (value) => { setQuery(value); setParams(value ? { q: value } : {}) }

  return <><PageHeader eyebrow="Shop" title="Complete product edit" subtitle="Explore 30 local-data products with search, sorting, filters, grid view and list view." breadcrumbs={[{label:'Home',to:'/'},{label:'Shop'}]} /><section className="section-y"><Container><div className="grid gap-8 lg:grid-cols-[280px_1fr]"><aside className="luxury-card h-fit p-5"><div className="flex items-center justify-between"><h2 className="font-semibold">Filters</h2><button onClick={clearFilters} className="text-xs uppercase tracking-[.16em] text-accent">Clear</button></div><div className="mt-6 space-y-6"><div><p className="caption">Category</p><div className="mt-3 flex flex-wrap gap-2"><FilterButton active={category==='All'} onClick={()=>setCategory('All')}>All</FilterButton>{categories.map(c=><FilterButton key={c.id} active={category===c.title} onClick={()=>setCategory(c.title)}>{c.title}</FilterButton>)}</div></div><div><p className="caption">Price</p><div className="mt-3 flex flex-wrap gap-2">{priceRanges.map(r=><FilterButton key={r.label} active={filters.price===r.label} onClick={()=>updateFilter('price', r.label)}>{r.label}</FilterButton>)}</div></div><div><p className="caption">Rating</p><div className="mt-3 flex gap-2">{ratingOptions.map(r=><FilterButton key={r} active={filters.rating===r} onClick={()=>updateFilter('rating', r)}>{r}+ ★</FilterButton>)}</div></div><div><p className="caption">Discount</p><div className="mt-3 flex gap-2">{discountOptions.map(d=><FilterButton key={d} active={filters.discount===d} onClick={()=>updateFilter('discount', d)}>{d}%+</FilterButton>)}</div></div><div><p className="caption">Size</p><div className="mt-3 flex flex-wrap gap-2">{availableSizes.map(s=><FilterButton key={s} active={filters.size===s} onClick={()=>updateFilter('size', s)}>{s}</FilterButton>)}</div></div><div><p className="caption">Color</p><div className="mt-3 flex flex-wrap gap-2">{availableColors.map(c=><FilterButton key={c} active={filters.color===c} onClick={()=>updateFilter('color', c)}>{c}</FilterButton>)}</div></div><label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={filters.availability} onChange={(e)=>setFilters(f=>({...f, availability:e.target.checked}))}/> In stock only</label></div></aside><div><div className="grid gap-4 md:grid-cols-[1fr_auto_auto]"><div className="relative"><SearchInput value={query} onChange={(e)=>applySearch(e.target.value)} onClear={()=>applySearch('')} />{suggestions.length > 0 && <div className="absolute z-20 mt-2 w-full rounded-3xl border border-line bg-secondary p-3 shadow-luxury">{suggestions.map(s=><button key={s} onClick={()=>applySearch(s)} className="block w-full rounded-2xl p-3 text-left text-sm hover:bg-background">{s}</button>)}</div>}</div><select value={sort} onChange={(e)=>setSort(e.target.value)} className="focus-ring rounded-full border border-line bg-secondary px-5 py-3 text-sm">{sortOptions.map(([value,label])=><option key={value} value={value}>{label}</option>)}</select><div className="flex gap-2"><button onClick={()=>setView('grid')} className={`rounded-full border p-3 ${view==='grid'?'bg-primary text-secondary':'bg-secondary'}`}><FiGrid /></button><button onClick={()=>setView('list')} className={`rounded-full border p-3 ${view==='list'?'bg-primary text-secondary':'bg-secondary'}`}><FiList /></button></div></div><div className="my-6 flex items-center justify-between"><p className="small-text">{filteredProducts.length} products found</p>{Object.values(filters).some(Boolean) || query || category !== 'All' ? <button onClick={clearFilters} className="flex items-center gap-2 text-sm text-accent"><FiX /> Clear all</button> : null}</div>{filteredProducts.length ? <div className={view === 'grid' ? 'grid gap-6 sm:grid-cols-2 xl:grid-cols-3' : 'grid gap-5'}>{filteredProducts.map(product=><ProductCard key={product.id} product={product} variant={view}/>)}</div> : <EmptyState title="No products found" message="Try clearing filters or searching another style." />}</div></div></Container></section></>
}
export default Shop
