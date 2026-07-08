const dangerousKeyPattern = /(^\$|\.)/

export const sanitizeObject = (value) => {
  if (!value || typeof value !== 'object') return value
  if (Array.isArray(value)) return value.map(sanitizeObject)

  return Object.entries(value).reduce((acc, [key, childValue]) => {
    if (!dangerousKeyPattern.test(key)) {
      acc[key] = sanitizeObject(childValue)
    }
    return acc
  }, {})
}
