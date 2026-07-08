import hpp from 'hpp'
import xss from 'xss-clean'

import { sanitizeObject } from '../utils/sanitize.js'

export const sanitizeInputs = (req, _res, next) => {
  req.body = sanitizeObject(req.body)
  req.params = sanitizeObject(req.params)
  next()
}

export const hppProtection = hpp()
export const xssProtection = xss()
