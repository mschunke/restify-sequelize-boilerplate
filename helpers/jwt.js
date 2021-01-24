const config = require('../app/config.json');
const jwt = require('jsonwebtoken');

function signAccessToken(uuid) {
  return jwt.sign({ uuid }, config.accessSecret, { expiresIn: config.accessExp, algorithm: config.accessAlgo } )
}

function signRefreshToken(uuid) {
  return jwt.sign({ uuid }, config.refreshSecret, { expiresIn: config.refreshExp, algorithm: config.refreshAlgo } )
}

function refreshTokens(token) {
  try {
    const decoded = jwt.decode(token, { algorithm: 'HS512'})
  
    if (!decoded && !decoded.uuid) return null

    const accessToken = signAccessToken(decoded.uuid)
    const refreshToken = signRefreshToken(decoded.uuid)
    
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

