const jwt = require('jsonwebtoken')
const { findUserById } = require('../models/user.model')

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']

    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'Invalid token format' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await findUserById(decoded.id)

    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    req.user = user

    next()

  } catch (err) {
    console.error('Auth middleware error:', err)
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

module.exports = authMiddleware