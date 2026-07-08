import { motion } from 'framer-motion'
import { FiShoppingBag } from 'react-icons/fi'
import Button from './Button'
const EmptyState = ({ eyebrow='Zivaro Fashion', title, message, actionLabel='Shop Now', actionTo='/shop', secondaryActionLabel, secondaryActionTo='/', icon: Icon=FiShoppingBag, className='' }) => (
  <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} className={`luxury-card mx-auto max-w-2xl p-8 text-center md:p-12 ${className}`}><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-2xl text-accent"><Icon /></div><p className="caption mt-6">{eyebrow}</p><h1 className="mt-3 text-3xl font-semibold text-primary md:text-5xl">{title}</h1><p className="mx-auto mt-4 max-w-md paragraph">{message}</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Button to={actionTo}>{actionLabel}</Button>{secondaryActionLabel && <Button to={secondaryActionTo} variant="outline">{secondaryActionLabel}</Button>}</div></motion.div>
)
export default EmptyState
