import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'
const Modal = ({ open, onClose, title, description, children, footer, size='md' }) => {
  useEffect(() => { if (!open) return; const onKey = (e) => e.key === 'Escape' && onClose?.(); document.addEventListener('keydown', onKey); document.body.style.overflow='hidden'; return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow='' } }, [open, onClose])
  const widths = { sm:'max-w-md', md:'max-w-xl', lg:'max-w-3xl' }
  return <AnimatePresence>{open && <motion.div className="fixed inset-0 z-[80] flex items-center justify-center bg-primary/60 p-4 backdrop-blur-sm" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={onClose}><motion.div onMouseDown={(e)=>e.stopPropagation()} initial={{opacity:0,scale:.96,y:20}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.96,y:20}} className={`w-full ${widths[size]} rounded-3xl bg-secondary p-6 shadow-luxury`}><div className="flex items-start justify-between gap-4"><div>{title && <h2 className="text-2xl font-semibold text-primary">{title}</h2>}{description && <p className="mt-2 small-text">{description}</p>}</div><button aria-label="Close modal" onClick={onClose} className="rounded-full p-2 text-muted hover:bg-gray-100 hover:text-accent"><FiX /></button></div><div className="mt-6">{children}</div>{footer && <div className="mt-6">{footer}</div>}</motion.div></motion.div>}</AnimatePresence>
}
export default Modal
