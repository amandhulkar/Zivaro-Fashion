import { motion } from 'framer-motion'
import { FiArrowRight, FiCheckCircle, FiHeart, FiShoppingBag, FiStar, FiTruck } from 'react-icons/fi'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Button from '../../components/common/Button'
import Container from '../../components/common/Container'
import SectionTitle from '../../components/common/SectionTitle'
import CategoryCard from '../../components/home/CategoryCard'
import Hero from '../../components/home/Hero'
import ProductCard from '../../components/home/ProductCard'
import { bestSellers, categories, featuredProducts, instagramTiles, newArrivals, trendingProducts, whyChooseUs } from '../../constants/siteData'

const brandSignals = [
  { icon: FiCheckCircle, title: 'Curated edits', text: 'Selected pieces for polished everyday and occasion dressing.' },
  { icon: FiHeart, title: 'Feminine detail', text: 'Soft textures, flattering silhouettes and thoughtful finishing.' },
  { icon: FiShoppingBag, title: 'Easy shopping', text: 'Shop categories, wishlist favourites and manage your cart smoothly.' },
  { icon: FiTruck, title: 'Support ready', text: 'Contact and care details are always easy to find.' },
]

const editorialPillars = [
  { title: 'Modern Indian wear', text: 'Kurtis, suit sets and co-ords shaped for today’s wardrobe.' },
  { title: 'Occasion-first styling', text: 'From brunch plans to festive nights, every edit has a mood.' },
  { title: 'Premium presentation', text: 'A boutique shopping feel with clean spacing and refined detail.' },
]

const ProductSection = ({ id, eyebrow, title, subtitle, items, dark = false }) => <section id={id} className={`section-y ${dark ? 'bg-primary text-secondary' : ''}`}><Container><div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><SectionTitle invert={dark} align="left" eyebrow={eyebrow} title={title} subtitle={subtitle} /><Button to="/shop" variant={dark ? 'secondary' : 'outline'}>View All</Button></div><div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{items.map((p)=><ProductCard key={p.id} product={p}/>)}</div></Container></section>

const Home = () => <main className="home-page overflow-hidden">
  <Hero />

  <section className="home-signal-band -mt-10 relative z-10"><Container><div className="grid gap-4 rounded-[2rem] border border-line bg-secondary p-4 shadow-luxury md:grid-cols-4">{brandSignals.map((item)=>{const Icon=item.icon; return <motion.div whileHover={{y:-4}} key={item.title} className="rounded-3xl bg-background p-5"><Icon className="text-2xl text-accent"/><h3 className="mt-4 font-semibold text-primary">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted">{item.text}</p></motion.div>})}</div></Container></section>

  <section className="section-y"><Container className="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr]"><div><p className="caption">The Zivaro mood</p><h2 className="mt-4 heading">Not just products — a complete style point of view.</h2><p className="mt-6 paragraph">Zivaro Fashion brings together wearable silhouettes, festive polish and premium styling cues so customers can shop with clarity and confidence.</p><Button to="/about" className="mt-8">Discover Zivaro</Button></div><div className="grid gap-5 md:grid-cols-3 lg:grid-cols-1">{editorialPillars.map((item, index)=><motion.div initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:index*.08}} key={item.title} className="home-editorial-card"><span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></motion.div>)}</div></Container></section>

  <section className="section-y bg-secondary"><Container><div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><SectionTitle align="left" eyebrow="Shop by mood" title="Curated collections for every plan." subtitle="Move from daily wear to festive styling with categories designed around real wardrobe moments." /><Button to="/categories" variant="outline">All Categories</Button></div><div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{categories.map((c, index)=><motion.div key={c.slug} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:index*.05}}><CategoryCard category={c}/></motion.div>)}</div></Container></section>

  <ProductSection eyebrow="Featured collection" title="The signature Zivaro wardrobe." subtitle="Elevated staples and statement pieces for the modern woman." items={featuredProducts}/>

  <section className="section-y bg-soft-pink"><Container className="grid items-center gap-10 rounded-[2.5rem] bg-secondary p-6 shadow-soft md:grid-cols-[1fr_.9fr] md:p-10"><div><p className="caption">Style finder</p><h2 className="mt-4 sub-heading">A landing page made to guide customers faster.</h2><p className="mt-5 paragraph">Highlight new drops, best sellers and occasion edits in a more editorial flow so shoppers know exactly where to go next.</p><div className="mt-7 flex flex-wrap gap-3"><Button to="/shop?sort=newest">New Arrivals</Button><Button to="/shop?sort=best-sellers" variant="outline">Best Sellers</Button></div></div><div className="home-campaign-mini"><p className="caption">Campaign note</p><h3>Pink tones, clean styling and festive-ready pieces.</h3><FiArrowRight /></div></Container></section>

  <ProductSection id="trending" eyebrow="Trending now" title="Loved this week." subtitle="High-impact pieces with polished feminine detail." items={trendingProducts} dark/>
  <ProductSection id="new-arrivals" eyebrow="New arrivals" title="Fresh from the atelier." subtitle="The latest silhouettes, textures and refined seasonal tones." items={newArrivals}/>
  <ProductSection id="best-sellers" eyebrow="Best sellers" title="Icons in rotation." subtitle="The pieces customers return to again and again." items={bestSellers}/>

  <section className="section-y bg-primary text-secondary"><Container><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="caption text-white/70">Why Zivaro</p><h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Premium feel, practical shopping flow.</h2><p className="mt-5 text-white/65">Everything is shaped to help shoppers browse, save, cart and checkout with less confusion.</p></div><div className="grid gap-5 md:grid-cols-2">{whyChooseUs.slice(0,4).map((item)=>{const Icon=item.icon; return <motion.div whileHover={{y:-5}} key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-6"><Icon className="text-3xl text-accent"/><h3 className="mt-5 font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-6 text-white/65">{item.text}</p></motion.div>})}</div></div></Container></section>

  <section className="section-y"><Container className="home-campaign-panel"><div><p className="caption">Occasion edit</p><h2 className="mt-3 sub-heading">Dress for the moment before it begins.</h2><p className="mt-5 paragraph">Explore soft tailoring, suit sets, kurtis and accessories curated for celebrations, errands, dinners and everyday rituals.</p><Button to="/shop" className="mt-8">Shop the edit</Button></div><div className="home-campaign-visual"><FiStar /></div></Container></section>

  <section className="pb-16"><Container><SectionTitle eyebrow="Style journal" title="From the Zivaro moodboard." subtitle="Editorial tiles for campaign moments, styling details and social storytelling."/><Swiper spaceBetween={16} slidesPerView={1.2} breakpoints={{640:{slidesPerView:2.2},1024:{slidesPerView:4}}} className="mt-10">{instagramTiles.map((tile, index)=><SwiperSlide key={tile}><div className="home-journal-tile"><span>0{index + 1}</span><p>{tile}</p></div></SwiperSlide>)}</Swiper></Container></section>

  <section className="pb-20"><Container className="home-newsletter-panel"><p className="caption text-white/70">Private list</p><h2 className="mt-3 text-3xl font-semibold md:text-5xl">Get first access to new edits and styling notes.</h2><p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/65">Join the Zivaro list for product drops, wardrobe ideas and seasonal campaign updates.</p><div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"><input className="focus-ring min-h-12 flex-1 rounded-full border border-white/20 bg-white/10 px-5 text-sm outline-none placeholder:text-white/50" placeholder="Email address"/><Button variant="secondary">Join Now</Button></div></Container></section>
</main>
export default Home
