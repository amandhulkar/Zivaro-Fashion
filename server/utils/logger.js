const formatMessage = (level, message, meta) => {
  const timestamp = new Date().toISOString()
  return meta ? `[${timestamp}] ${level}: ${message} ${JSON.stringify(meta)}` : `[${timestamp}] ${level}: ${message}`
}

export const logger = {
  info: (message, meta) => console.log(formatMessage('INFO', message, meta)),
  warn: (message, meta) => console.warn(formatMessage('WARN', message, meta)),
  error: (message, meta) => console.error(formatMessage('ERROR', message, meta)),
}
