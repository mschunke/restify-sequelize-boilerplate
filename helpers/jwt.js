const config = require('../app/config.json');
const jwt = require('jsonwebtoken');

function signAccessToken(email) {
  return jwt.sign({ email }, config.accessSecret, { expiresIn: '15m', algorithm: 'HS256' } )
}

function signRefreshToken(email) {
  return jwt.sign({ email }, config.refreshSecret, { expiresIn: '8w', algorithm: 'HS512' } )
}

function refreshTokens(token) {
  try {
    const decoded = jwt.decode(token, { algorithm: 'HS512'})
  
    if (!decoded && !decoded.email) return null

    const accessToken = signAccessToken(decoded.email)
    const refreshToken = signRefreshToken(decoded.email)
    
    return {
      accessToken,
      refreshToken
    }
  } catch (error) {
    return null
  }
}

module.exports = {
  signAccessToken,
  signRefreshToken,
  refreshTokens,
}

