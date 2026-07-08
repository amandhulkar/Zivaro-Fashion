import { FiHeart } from 'react-icons/fi'
import Button from '../../components/common/Button'
import Container from '../../components/common/Container'
import EmptyState from '../../components/common/EmptyState'
import PageHeader from '../../components/common/PageHeader'
import ProductCard from '../../components/home/ProductCard'
import { featuredProducts } from '../../data/products'
import { useWishlist } from '../../hooks/useWishlist'
const Wishlist = () => { const { wishlistItems, wishlistCount, clearWishlist } = useWishlist(); return <><PageHeader eyebrow="Wishlist" title="Your saved edit" subtitle="Wishlist is fully functional and stored locally on this device." breadcrumbs={[{label:'Home',to:'/'},{label:'Wishlist'}]} /><section className="section-y"><Container>{wishlistCount ? <><div className="mb-8 flex items-center justify-between"><p className="paragraph">{wishlistCount} saved products</p><Button variant="outline" onClick={clearWishlist}>Clear Wishlist</Button></div><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{wishlistItems.map(p=><ProductCard key={p.id} product={p}/>)}</div></> : <><EmptyState icon={FiHeart} title="No saved pieces yet" message="Start building your Zivaro wardrobe by saving products you love." /><div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{featuredProducts.slice(0,4).map(p=><ProductCard key={p.id} product={p}/>)}</div></>}</Container></section></> }
export default Wishlist
