const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  }
  
  const setTokenCookie = (res, token) => {
    res.cookie('token', token, cookieOptions)
  }
  
  const clearTokenCookie = (res) => {
    res.clearCookie('token', {
      httpOnly: cookieOptions.httpOnly,
      secure: cookieOptions.secure,
      sameSite: cookieOptions.sameSite,
    })
  }
  
  module.exports = { setTokenCookie, clearTokenCookie }