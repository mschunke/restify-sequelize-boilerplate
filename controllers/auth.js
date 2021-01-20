const bcrypt = require("bcrypt")
const { signAccessToken, signRefreshToken, refreshTokens } = require('../helpers/jwt');
const { APIError } = require('../middleware/apiError');

const UserDao = require('../database/dao/users')

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await UserDao.findUser({ email })
    const passOk = await bcrypt.compare(password, user.password)
    if (!user || !passOk) {
      APIError(res, 'LOGIN_FAILED', 'User not found')
      return
    } 

    const accessToken = signAccessToken(email)
    const refreshToken = signRefreshToken(email)

    res.send({
      success: true,
      accessToken,
      refreshToken,
    })
  } catch (error) {
    APIError(res, 'UNKNOWN_ERROR', error.message)
  }
}

function logout(req, res, next) {
  console.log(req.user)
  res.send({logout: true})
}

function refresh(req, res, next) {
  try {
    const { refreshToken } = req.body;

    const tokens = refreshTokens(refreshToken)

    if (!tokens) { 
      APIError(res, 'REFRESH_ERROR', 'Invalid refresh token')
      return    
    }
    
    res.send({
      success: true,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    })
  } catch (error) {
    APIError(res, 'REFRESH_ERROR')
  }
}

module.exports = {
  login,
  logout,
  refresh,
}