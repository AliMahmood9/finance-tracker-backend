const rateLimit  = require('express-rate-limit');

const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max 100 requests per 15 minutes
    message: {
      message: 'Too many requests, please try again later'
    },
    standardHeaders: true,
    legacyHeaders: false,
})

// Auth rate limit — login/register only
const authLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // max 5 attempts per minute
    message: {
      message: 'Too many login attempts, please try again after 1 minute'
    },
    standardHeaders: true,
    legacyHeaders: false,
  })

  module.exports = { globalLimiter, authLimiter }