import { FiAward, FiHeart, FiRefreshCcw, FiShield, FiTruck } from 'react-icons/fi'
export { categories } from '../data/categories'
export { allProducts, bestSellers, featuredProducts, formatPrice, getProductBySlug, newArrivals, products, trendingProducts } from '../data/products'

export const navLinks = [
  { label: 'Home', path: '/' }, { label: 'Shop', path: '/shop' }, { label: 'Categories', path: '/categories' },
  { label: 'New Arrivals', path: '/shop?sort=newest' }, { label: 'Best Sellers', path: '/shop?sort=best-sellers' }, { label: 'About', path: '/about' }, { label: 'Contact', path: '/contact' },
]
export const whyChooseUs = [
  { title:'Curated Luxury', text:'Women-first edits selected for polish, comfort, and confidence.', icon:FiAward },
  { title:'Loved Details', text:'Premium fabrics, flattering fits, and refined finishing touches.', icon:FiHeart },
  { title:'Secure Shopping', text:'A frontend foundation prepared for safe future commerce flows.', icon:FiShield },
  { title:'Easy Care', text:'Returns and support experiences designed for premium service.', icon:FiRefreshCcw },
  { title:'Fast Delivery', text:'Delivery information is visible on every product experience.', icon:FiTruck },
]
export const instagramTiles = ['Kurti Diaries','Co-ord Mood','Festive Notes','Suit Set Edit','Dupatta Details','Accessory Focus']
export const clientCare = ['Styling Appointments','Shipping Support','Returns & Exchanges','Atelier Enquiries']
export const footerLinks = {
  quick: [{label:'Home',path:'/'},{label:'Shop',path:'/shop'},{label:'Categories',path:'/categories'},{label:'About',path:'/about'}],
  support: [{label:'Contact',path:'/contact'},{label:'Wishlist',path:'/wishlist'},{label:'Cart',path:'/cart'},{label:'Checkout',path:'/checkout'}],
  policies: [{label:'Privacy Policy',path:'/privacy-policy'},{label:'Return Policy',path:'/return-policy'},{label:'Terms',path:'/terms'}],
}
