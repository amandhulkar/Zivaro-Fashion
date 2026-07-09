import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiHeart, FiLogOut, FiMenu, FiSearch, FiSettings, FiShoppingBag, FiUser, FiX } from 'react-icons/fi'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import Container from '../common/Container'
import Modal from '../common/Modal'
import SearchInput from '../common/SearchInput'
import { navLinks } from '../../constants/siteData'
import { useAuth } from '../../hooks/useAuth'
import { useCart } from '../../hooks/useCart'
import { useProducts } from '../../hooks/useProducts'
import { useWishlist } from '../../hooks/useWishlist'
import { showSuccessToast } from '../../utils/toast'

const CountBadge = ({ count }) => count > 0 ? <span className="absolute -right-2 -top-2 h-4 min-w-4 rounded-full bg-accent px-1 text-center text-[10px] leading-4 text-secondary">{count}</span> : null

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [hasShadow, setHasShadow] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()
  const { user, isAuthenticated, logout } = useAuth()
  const { suggestions } = useProducts({ query })
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setHasShadow(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const submitSearch = (value = query) => {
    const q = value.trim()
    if (!q) return
    setSearchOpen(false)
    setIsOpen(false)
    navigate(`/shop?q=${encodeURIComponent(q)}`)
  }

  const handleLogout = async () => {
    await logout()
    setIsOpen(false)
    showSuccessToast('Logged out successfully')
    navigate('/login')
  }

  const baseLinkClass = 'relative text-[11px] font-semibold uppercase tracking-[0.12em] transition hover:text-accent'
  const getPath = (path) => path.split('?')[0]
  const getQuery = (path) => path.split('?')[1] || ''
  const isNavActive = (path) => location.pathname === getPath(path) && location.search.replace(/^\?/, '') === getQuery(path)
  const handleNavClick = (path, extraOnClick) => {
    extraOnClick?.()
    setIsOpen(false)
    setSearchOpen(false)
    if (path === '/shop') window.dispatchEvent(new Event('reset-shop'))
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const renderNavLink = (link, extraProps = {}) => <button key={link.label} type="button" className={`${baseLinkClass} ${isNavActive(link.path) ? 'text-accent' : 'text-primary'}`} onClick={()=>handleNavClick(link.path, extraProps.onClick)}>{link.label}</button>
  const linkClass = ({ isActive }) => `${baseLinkClass} ${isActive ? 'text-accent' : 'text-primary'}`
  const profilePath = isAuthenticated ? '/profile' : '/login'

  const iconLink = (path, label, icon, badge) => <button type="button" aria-label={label} className="relative transition hover:text-accent" onClick={()=>handleNavClick(path)}>{icon}{badge}</button>
  const icons = <><button aria-label="Search" onClick={() => setSearchOpen(true)} className="transition hover:text-accent"><FiSearch /></button>{iconLink('/wishlist', 'Wishlist', <FiHeart />, <CountBadge count={wishlistCount} />)}{iconLink('/cart', 'Cart', <FiShoppingBag />, <CountBadge count={cartCount} />)}{user?.role === 'admin' && iconLink('/admin/dashboard', 'Admin Dashboard', <FiSettings />)}{iconLink(profilePath, 'Profile', <FiUser />)}{isAuthenticated && <button aria-label="Logout" onClick={handleLogout} className="transition hover:text-accent"><FiLogOut /></button>}</>

  return <header className={`sticky top-0 z-[90] bg-secondary/95 backdrop-blur-xl transition ${hasShadow ? 'shadow-soft' : 'border-b border-line'}`}><Container className="flex h-20 items-center justify-between gap-3"><NavLink to="/" className="shrink-0 text-base font-extrabold uppercase tracking-[0.16em] text-primary lg:text-lg">Zivaro <span className="text-accent">Fashion</span></NavLink><nav className="hidden items-center gap-3 xl:flex 2xl:gap-5">{navLinks.map((l)=>renderNavLink(l))}</nav><div className="hidden shrink-0 items-center gap-3 text-xl text-primary md:flex 2xl:gap-5">{icons}</div><button className="text-2xl xl:hidden" onClick={()=>setIsOpen(true)} aria-label="Open menu"><FiMenu /></button></Container><AnimatePresence>{isOpen && <motion.div className="fixed inset-0 z-[100] bg-primary/50 backdrop-blur-sm xl:hidden" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setIsOpen(false)}><motion.aside initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring',stiffness:260,damping:30}} onClick={(e)=>e.stopPropagation()} className="ml-auto min-h-screen w-[86%] max-w-sm bg-secondary p-6 shadow-luxury"><div className="flex items-center justify-between"><span className="font-bold uppercase tracking-[0.2em]">Zivaro</span><button onClick={()=>setIsOpen(false)} aria-label="Close menu"><FiX className="text-2xl" /></button></div><nav className="mt-10 flex flex-col gap-5">{navLinks.map((l)=>renderNavLink(l, { onClick:()=>setIsOpen(false) }))}{isAuthenticated && <NavLink onClick={()=>setIsOpen(false)} to={profilePath} className={linkClass}>My Account</NavLink>}{user?.role === 'admin' && <NavLink onClick={()=>setIsOpen(false)} to="/admin/dashboard" className={linkClass}>Admin Dashboard</NavLink>}</nav><div className="mt-10 flex flex-wrap gap-6 text-2xl">{icons}</div></motion.aside></motion.div>}</AnimatePresence><Modal open={searchOpen} onClose={()=>setSearchOpen(false)} title="Search the edit" description="Explore kurtis, co-ords, suit sets and accessories." size="md"><form onSubmit={(e)=>{e.preventDefault(); submitSearch()}}><SearchInput value={query} onChange={(e)=>setQuery(e.target.value)} onClear={()=>setQuery('')} autoFocus /></form><div className="mt-5 grid gap-2 text-sm text-muted">{(suggestions.length ? suggestions : ['Kurti','Co-ord Set','Suit Set','Accessories']).map((s)=><button key={s} className="rounded-2xl bg-background p-3 text-left hover:text-accent" onClick={()=>submitSearch(s)}>{s}</button>)}</div></Modal></header>
}
export default Navbar
