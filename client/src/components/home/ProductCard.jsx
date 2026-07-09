import { motion } from 'framer-motion'
import { FiHeart, FiShoppingBag, FiStar } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Badge from '../common/Badge'
import { useCart } from '../../hooks/useCart'
import { useWishlist } from '../../hooks/useWishlist'
import { formatPrice } from '../../data/products'

const ProductVisual = ({ product, compact = false }) => (
  <div className={`relative ${compact ? 'h-full min-h-44' : 'aspect-[3/4]'} bg-gradient-to-br ${product.imageTone || product.thumbnail}`}>
    {product.imageUrl ? <img src={product.imageUrl} alt={product.name} loading="lazy" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-primary/15"><span className="text-6xl font-bold tracking-[.2em]">ZF</span></div>}
  </div>
)

const ProductCard = ({ product, variant = 'grid' }) => {
  const { addToCart } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const wished = isWishlisted(product.id)
  const quickAdd = () => addToCart(product, { size: product.availableSizes?.[0], color: product.availableColors?.[0]?.name, quantity: 1 })

  if (variant === 'list') {
    return <motion.article whileHover={{ y: -3 }} className="luxury-card grid overflow-hidden md:grid-cols-[220px_1fr]"><Link to={`/product/${product.slug}`} className="block"><ProductVisual product={product} compact /></Link><div className="p-5"><div className="flex flex-wrap gap-2"><Badge variant={product.badgeVariant}>{product.badge}</Badge><Badge variant="sale">{product.discount}% OFF</Badge>{product.stock <= 8 && <Badge variant="neutral">Only {product.stock} left</Badge>}</div><Link to={`/product/${product.slug}`}><h3 className="mt-3 text-2xl font-semibold text-primary hover:text-accent">{product.name}</h3></Link><p className="mt-2 small-text">{product.description}</p><div className="mt-4 flex items-center gap-4"><span className="font-semibold">{formatPrice(product.price)}</span><span className="text-sm text-muted line-through">{formatPrice(product.originalPrice)}</span><span className="flex items-center gap-1 text-warning"><FiStar className="fill-warning" /> {product.rating}</span></div><div className="mt-5 flex gap-3"><button type="button" onClick={quickAdd} className="rounded-full bg-primary px-5 py-2 text-xs font-semibold uppercase tracking-[.18em] text-secondary">Quick Add</button><button type="button" aria-pressed={wished} onClick={()=>toggleWishlist(product.id)} className={`rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-[.18em] ${wished ? 'border-accent text-accent' : 'border-line'}`}>Wishlist</button></div></div></motion.article>
  }

  return <motion.article whileHover={{ y: -7 }} transition={{ duration: .25 }} className="group luxury-card overflow-hidden"><div className="relative"><Link to={`/product/${product.slug}`} className="block"><ProductVisual product={product} /></Link><div className="absolute left-4 top-4 flex flex-wrap gap-2"><Badge variant={product.badgeVariant}>{product.badge}</Badge><Badge variant="sale">{product.discount}% OFF</Badge></div><button type="button" onClick={()=>toggleWishlist(product.id)} aria-label="Wishlist" aria-pressed={wished} className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-secondary shadow-soft hover:text-accent ${wished ? 'text-accent' : 'text-primary'}`}><FiHeart className={wished ? 'fill-accent' : ''} /></button><div className="absolute inset-x-4 bottom-4 translate-y-3 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100"><button type="button" onClick={quickAdd} disabled={product.stock === 0} className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-[.18em] text-secondary disabled:opacity-60"><FiShoppingBag /> {product.stock === 0 ? 'Sold Out' : 'Quick Add'}</button></div></div><div className="p-5"><div className="flex items-center justify-between gap-3"><p className="caption">{product.category}</p><span className="flex items-center gap-1 text-sm text-warning"><FiStar className="fill-warning" /> {product.rating}</span></div><Link to={`/product/${product.slug}`}><h3 className="mt-2 text-lg font-semibold text-primary hover:text-accent">{product.name}</h3></Link><p className="mt-1 small-text">{product.fabric} · {product.color}</p><div className="mt-4 flex items-center gap-3"><span className="font-semibold text-primary">{formatPrice(product.price)}</span><span className="text-sm text-muted line-through">{formatPrice(product.originalPrice)}</span></div></div></motion.article>
}
export default ProductCard
