const Spinner = ({ size = 'md', label = 'Loading', className = '' }) => {
  const sizes = { sm: 'h-5 w-5', md: 'h-9 w-9', lg: 'h-12 w-12' }
  return <span role="status" aria-label={label} className={`inline-block animate-spin rounded-full border-2 border-line border-t-accent ${sizes[size]} ${className}`} />
}
export default Spinner
