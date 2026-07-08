import { motion } from 'framer-motion'
import Breadcrumb from './Breadcrumb'
import Container from './Container'
const PageHeader = ({ eyebrow, title, subtitle, breadcrumbs = [], children, align='center' }) => <section className="gradient-blush border-b border-line py-12 md:py-16"><Container><motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} className={align === 'left' ? 'text-left' : 'mx-auto max-w-3xl text-center'}>{breadcrumbs.length > 0 && <Breadcrumb items={breadcrumbs} className={align === 'left' ? 'mb-6' : 'mb-6 justify-center'} />}{eyebrow && <p className="caption">{eyebrow}</p>}<h1 className="mt-3 heading">{title}</h1>{subtitle && <p className="mt-5 paragraph">{subtitle}</p>}{children && <div className="mt-8">{children}</div>}</motion.div></Container></section>
export default PageHeader
