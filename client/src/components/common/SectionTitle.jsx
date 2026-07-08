import { motion } from 'framer-motion'
const SectionTitle = ({ eyebrow, title, subtitle, align = 'center', invert = false, className = '', maxWidth = 'max-w-3xl' }) => {
  const alignment = align === 'left' ? 'text-left' : 'mx-auto text-center'
  return <motion.div initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-80px'}} transition={{duration:.55}} className={`${maxWidth} ${alignment} ${className}`}>{eyebrow && <p className="caption">{eyebrow}</p>}<h2 className={`mt-3 sub-heading ${invert ? 'text-secondary' : ''}`}>{title}</h2>{subtitle && <p className={`mt-4 paragraph ${invert ? 'text-white/70' : ''}`}>{subtitle}</p>}</motion.div>
}
export default SectionTitle
