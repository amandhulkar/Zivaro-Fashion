const Input = ({ label, error, hint, iconLeft, iconRight, as = 'input', className = '', inputClassName = '', ...props }) => {
  const Field = as === 'textarea' ? 'textarea' : 'input'
  return (
    <label className={`block space-y-2 ${className}`}>
      {label && <span className="small-text font-medium text-text">{label}</span>}
      <span className="relative block">
        {iconLeft && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">{iconLeft}</span>}
        <Field className={`focus-ring w-full rounded-2xl border border-line bg-secondary px-4 py-3 text-sm text-text outline-none transition placeholder:text-gray-400 focus:border-accent ${iconLeft ? 'pl-11' : ''} ${iconRight ? 'pr-11' : ''} ${as === 'textarea' ? 'min-h-32 resize-none' : ''} ${inputClassName}`} {...props} />
        {iconRight && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">{iconRight}</span>}
      </span>
      {hint && !error && <span className="text-xs text-muted">{hint}</span>}
      {error && <span className="text-xs text-danger">{error}</span>}
    </label>
  )
}
export default Input
