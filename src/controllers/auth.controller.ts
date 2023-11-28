import { type DecodedRefreshToken, type ControllerAuth } from '@interfaces/auth.interface'
import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcrypt'
import UserRepo from '@repos/user.repo'
import jwt from 'jsonwebtoken'
import env from '@config/env'
import { type Cookie } from '@interfaces/httpServer.interface'
import AuthUtil from '@utils/auth.util'

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

    const accessToken = jwt.sign({ user }, env.secret.JWT, { expiresIn: '5m' })
    const refreshToken = jwt.sign({ user }, env.secret.JWT, { expiresIn: '7d' })

    const cookieRefreshToken: Cookie = {
      name: 'refreshToken',
      value: refreshToken,
      options: {
        httpOnly: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days in milliseconds
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

    const newAccessToken = jwt.sign({ user }, env.secret.JWT, { expiresIn: '5m' })
    const newRefreshToken = jwt.sign({ user }, env.secret.JWT, { expiresIn: '7d' })

    const cookieRefreshToken: Cookie = {
      name: 'refreshToken',
      value: newRefreshToken,
      options: {
        httpOnly: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    }

    return {
      statusCode: StatusCodes.OK,
      body: {
        message: 'Successfully refresh token',
        accessToken: newAccessToken
      },
      cookies: [cookieRefreshToken]
    }
  }
}

export default AuthController
