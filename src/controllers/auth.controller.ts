import { type DecodedRefreshToken, type ControllerAuth } from '@interfaces/auth.interface'
import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcrypt'
import UserRepo from '@repos/user.repo'
import jwt from 'jsonwebtoken'
import env from '@config/env'
import { type Cookie } from '@interfaces/httpServer.interface'
import AuthUtil from '@utils/auth.util'
import AuthConstant from '@constants/auth.constant'
import TokenBanUtil from '@utils/tokenBan.util'
import TokenBanRepo from '@repos/tokenBan.repo'

/**
 * Controller handling authentication-related operations.
 * @type {ControllerAuth}
 */
const AuthController: ControllerAuth = {
  async registerUser(req) {
    const { email, password, fullName } = req.body

    if (email === undefined) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        body: {
          message: 'Email required'
        }
      }
    }

    if (password === undefined) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        body: {
          message: 'Password required'
        }
      }
    }

    if (fullName === undefined) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        body: {
          message: 'fullName required'
        }
      }
    }

    // check validity email
    const isEmailValid = AuthUtil.validateEmail(email)

    if (!isEmailValid) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        body: {
          message: 'Email invalid'
        }
      }
    }

    // check valdity password
    const isPasswordValid = AuthUtil.validatePassword(password)

    if (!isPasswordValid) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        body: {
          message: 'Password invalid'
        }
      }
    }

    // check is user already exist
    const isUserExist = await UserRepo.findUserByEmail(email)

    if (isUserExist !== null) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        body: {
          message: 'User with this email already exist'
        }
      }
    }

    // Hash the password before saving it to the database
    const hashedPassword = bcrypt.hashSync(password, 10)

    // Create a new user
    await UserRepo.createUser({ email, password: hashedPassword, fullName })

    return {
      statusCode: StatusCodes.OK,
      body: {
        message: 'User successfully created'
      }
    }
  },
  async loginUser(req) {
    // no need to check user or password again, since already handled by the passport local middleware
    const user = req.user

    const accessToken = jwt.sign({ user }, env.secret.JWT, { expiresIn: AuthConstant.ACCESS_TOKEN_EXPIRY })
    const refreshToken = jwt.sign({ user }, env.secret.JWT, { expiresIn: AuthConstant.REFRESH_TOKEN_EXPIRY })

    const cookieRefreshToken: Cookie = {
      name: 'refreshToken',
      value: refreshToken,
      options: {
        httpOnly: true,
        expires: AuthConstant.COOKIE_REFRESH_TOKEN_EXPIRY
      }
    }

    return {
      statusCode: StatusCodes.OK,
      body: {
        message: 'User successfully logged in',
        accessToken
      },
      cookies: [cookieRefreshToken]
    }
  },
  async refreshToken(req) {
    // Get refreshToken from the cookie
    const { refreshToken } = req.cookies

    if (refreshToken === undefined) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        body: {
          message: 'Refresh token not found'
        }
      }
    }

    // Verify the refreshToken
    const decoded: DecodedRefreshToken | string = jwt.verify(refreshToken, env.secret.JWT)

    if (typeof decoded === 'string') {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        body: {
          message: 'Decoded invalid'
        }
      }
    }

    const { user } = decoded

    if (user === undefined) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        body: {
          message: 'User decoded undefined'
        }
      }
    }

    if (user._id === undefined || user.email === undefined || user.fullName === undefined) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        body: {
          message: 'Jwt payload user structure invalid'
        }
      }
    }

    // check is refresh token banned before
    const isTokenBanned = await TokenBanUtil.isTokenBanned(refreshToken)

    if (isTokenBanned) {
      return {
        statusCode: StatusCodes.FORBIDDEN,
        body: {
          message: 'Refresh token cannot be used anymore'
        }
      }
    }

    // create new access token and rotate refreshtoken
    const accessToken = jwt.sign({ user }, env.secret.JWT, { expiresIn: AuthConstant.ACCESS_TOKEN_EXPIRY })
    const rotatedRefreshToken = jwt.sign({ user }, env.secret.JWT, { expiresIn: AuthConstant.REFRESH_TOKEN_EXPIRY })

    const cookieRefreshToken: Cookie = {
      name: 'refreshToken',
      value: rotatedRefreshToken,
      options: {
        httpOnly: true,
        expires: AuthConstant.COOKIE_REFRESH_TOKEN_EXPIRY
      }
    }

    // lastly ban the refresh token so it can't be used anymore
    const tokenBanPayload = {
      token: refreshToken
    }
    await TokenBanRepo.createTokenBan(tokenBanPayload)

    return {
      statusCode: StatusCodes.OK,
      body: {
        message: 'Successfully refresh token',
        accessToken
      },
      cookies: [cookieRefreshToken]
    }
  }
}

export default AuthController
