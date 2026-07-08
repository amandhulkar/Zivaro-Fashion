import { useEffect, useMemo, useState } from 'react'
import { FiMinus, FiPlus, FiStar, FiZoomIn } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import Container from '../../components/common/Container'
import EmptyState from '../../components/common/EmptyState'
import Modal from '../../components/common/Modal'
import PageHeader from '../../components/common/PageHeader'
import SectionTitle from '../../components/common/SectionTitle'
import ProductCard from '../../components/home/ProductCard'
import { formatPrice } from '../../data/products'
import { useCart } from '../../hooks/useCart'
import { useProducts } from '../../hooks/useProducts'
import { useWishlist } from '../../hooks/useWishlist'

const GalleryPanel = ({ product, image, onZoom }) => <div className={`relative aspect-[4/5] rounded-[2rem] bg-gradient-to-br ${image?.tone || product.imageTone} shadow-luxury`}><button onClick={onZoom} className="absolute right-5 top-5 rounded-full bg-secondary p-3 text-primary shadow-soft"><FiZoomIn /></button><div className="flex h-full items-center justify-center text-primary/15"><span className="text-7xl font-bold tracking-[.22em]">ZF</span></div></div>

const ProductDetails = () => {
  const { id } = useParams()
  const { getProductBySlug, getRelatedProducts, addRecentlyViewed, recentlyViewed } = useProducts()
  const { addToCart } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const product = getProductBySlug(id)
  const [imageIndex, setImageIndex] = useState(0)
  const [zoomOpen, setZoomOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [qty, setQty] = useState(1)

  useEffect(() => { if (product) { setSelectedColor(product.availableColors?.[0]?.name || product.color); setSelectedSize(product.availableSizes?.[0] || 'Free Size'); addRecentlyViewed(product.id) } }, [product, addRecentlyViewed])
  const related = useMemo(() => product ? getRelatedProducts(product, 4) : [], [product, getRelatedProducts])
  const recent = recentlyViewed.filter((item) => item.id !== product?.id).slice(0, 4)
  if (!product) return <section className="section-y"><Container><EmptyState title="Product not found" message="This style is not available in the current Zivaro collection." /></Container></section>
  const currentImage = product.images[imageIndex]
  const lowStock = product.stock <= 8

  return <><PageHeader eyebrow={product.category} title={product.name} subtitle={product.description} breadcrumbs={[{label:'Home',to:'/'},{label:'Shop',to:'/shop'},{label:product.name}]} /><section className="section-y"><Container><div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr]"><div><GalleryPanel product={product} image={currentImage} onZoom={()=>setZoomOpen(true)} /><div className="mt-4 grid grid-cols-4 gap-3">{product.images.map((image, index)=><button key={image.id} onClick={()=>setImageIndex(index)} className={`aspect-square rounded-2xl border bg-gradient-to-br ${image.tone} ${index===imageIndex?'border-accent':'border-line'}`} aria-label={image.alt} />)}</div></div><div><div className="flex flex-wrap gap-2"><Badge variant={product.badgeVariant}>{product.badge}</Badge><Badge variant="sale">{product.discount}% OFF</Badge>{lowStock && <Badge variant="neutral">Only {product.stock} left</Badge>}</div><h1 className="mt-5 heading">{product.name}</h1><div className="mt-5 flex flex-wrap items-center gap-4"><span className="text-2xl font-semibold">{formatPrice(product.price)}</span><span className="text-muted line-through">{formatPrice(product.originalPrice)}</span><span className="flex items-center gap-1 text-warning"><FiStar className="fill-warning" /> {product.rating} ({product.totalReviews})</span></div><p className="mt-6 paragraph">{product.description}</p><div className="mt-8"><p className="caption">Color: {selectedColor}</p><div className="mt-3 flex gap-3">{product.availableColors.map(c=><button key={c.name} onClick={()=>setSelectedColor(c.name)} className={`h-10 w-10 rounded-full border-2 ${selectedColor===c.name?'border-accent':'border-secondary shadow-soft'}`} style={{background:c.value}} aria-label={c.name}/>)}</div></div><div className="mt-8"><p className="caption">Size: {selectedSize}</p><div className="mt-3 flex flex-wrap gap-3">{product.availableSizes.map(s=><button key={s} onClick={()=>setSelectedSize(s)} className={`rounded-full border px-5 py-3 text-sm ${selectedSize===s?'border-accent bg-accent text-secondary':'border-line bg-secondary'}`}>{s}</button>)}</div></div><div className="mt-8 flex items-center gap-4"><button className="rounded-full border p-3" onClick={()=>setQty(Math.max(1,qty-1))}><FiMinus /></button><span className="min-w-8 text-center font-semibold">{qty}</span><button className="rounded-full border p-3" onClick={()=>setQty(Math.min(product.stock, qty+1))}><FiPlus /></button><span className="small-text">{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span></div><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button disabled={product.stock===0} onClick={()=>addToCart(product,{size:selectedSize,color:selectedColor,quantity:qty})}>Add to Cart</Button><Button variant="outline" onClick={()=>toggleWishlist(product.id)}>{isWishlisted(product.id) ? 'Remove Wishlist' : 'Add Wishlist'}</Button></div><div className="mt-8 grid gap-4 sm:grid-cols-3"><div className="luxury-panel p-4"><p className="caption">Delivery</p><p className="mt-2 small-text">{product.delivery.estimate}</p></div><div className="luxury-panel p-4"><p className="caption">Shipping</p><p className="mt-2 small-text">{product.delivery.shipping}</p></div><div className="luxury-panel p-4"><p className="caption">Returns</p><p className="mt-2 small-text">{product.returnPolicy}</p></div></div></div></div><div className="mt-14 grid gap-6 lg:grid-cols-3"><div className="luxury-card p-6"><h3 className="font-semibold">Highlights</h3><ul className="mt-4 space-y-2 small-text">{product.highlights.map(h=><li key={h}>• {h}</li>)}</ul></div><div className="luxury-card p-6"><h3 className="font-semibold">Specifications</h3><div className="mt-4 space-y-2 small-text">{Object.entries(product.specs).map(([k,v])=><p key={k}><strong>{k}:</strong> {v}</p>)}</div></div><div className="luxury-card p-6"><h3 className="font-semibold">Reviews</h3><div className="mt-4 space-y-3">{product.reviews.map(r=><div key={r.id} className="small-text"><p className="font-semibold text-text">{r.rating}★ {r.title}</p><p>{r.comment}</p></div>)}</div></div></div><SectionTitle className="mt-16" eyebrow="Related" title="Complete the look"/><div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{related.map(p=><ProductCard key={p.id} product={p}/>)}</div>{recent.length > 0 && <><SectionTitle className="mt-16" eyebrow="Recently viewed" title="Your latest styles"/><div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{recent.map(p=><ProductCard key={p.id} product={p}/>)}</div></>}<Modal open={zoomOpen} onClose={()=>setZoomOpen(false)} title={product.name} size="lg"><div className={`aspect-[4/5] rounded-[2rem] bg-gradient-to-br ${currentImage?.tone || product.imageTone}`} /></Modal></Container></section></>
}
export default ProductDetails
