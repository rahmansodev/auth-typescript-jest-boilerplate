import { type ConstantAuth } from '@interfaces/auth.interface'

const AuthConstant: ConstantAuth = {
  ACCESS_TOKEN_EXPIRY: '5m',
  REFRESH_TOKEN_EXPIRY: '7d',
  COOKIE_REFRESH_TOKEN_EXPIRY: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
}

export default AuthConstant
