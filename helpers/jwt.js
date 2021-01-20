const config = require('../app/config.json');
const jwt = require('jsonwebtoken');

function signAccessToken(email) {
  return jwt.sign({ email }, config.accessSecret, { expiresIn: config.accessExp, algorithm: config.accessAlgo } )
}

function signRefreshToken(email) {
  return jwt.sign({ email }, config.refreshSecret, { expiresIn: config.refreshExp, algorithm: config.refreshAlgo } )
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

