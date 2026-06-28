const errorMiddleware = (err, req, res, next) => {
    console.error('❌ Error:', err)
  
    // PostgreSQL errors
    if (err.code === '23505') {
      return res.status(400).json({
        message: 'Duplicate entry — this record already exists'
      })
    }
  
    if (err.code === '23503') {
      return res.status(400).json({
        message: 'Related record not found'
      })
    }
  
    if (err.code === '23502') {
      return res.status(400).json({
        message: 'Required field is missing'
      })
    }
  
    // JWT errors
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({
        message: 'Invalid token'
      })
    }
  
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: 'Token expired — please login again'
      })
    }
  
    // Default error
    res.status(err.status || 500).json({
      message: err.message || 'Internal server error'
    })
  }
  
  module.exports = errorMiddleware