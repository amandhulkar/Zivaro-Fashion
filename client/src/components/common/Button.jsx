import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-primary text-secondary hover:bg-accent shadow-soft hover:shadow-glow',
  secondary: 'bg-accent text-secondary hover:bg-primary shadow-soft',
  outline: 'border border-primary bg-transparent text-primary hover:border-accent hover:text-accent',
  ghost: 'bg-transparent text-primary hover:text-accent',
}
const sizes = { sm: 'px-4 py-2 text-xs', md: 'px-6 py-3 text-sm', lg: 'px-8 py-4 text-sm' }

const Button = ({ children, to, variant = 'primary', size = 'md', iconLeft, iconRight, className = '', type = 'button', disabled = false, ...props }) => {
  const classes = `focus-ring inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase tracking-[0.18em] transition duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`
  if (to) return <Link to={to} className={classes} {...props}>{iconLeft}{children}{iconRight}</Link>
  return <button type={type} disabled={disabled} className={classes} {...props}>{iconLeft}{children}{iconRight}</button>
}
export default Button
