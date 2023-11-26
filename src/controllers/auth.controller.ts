import {
  type HttpRequestRegUser,
  type ControllerAuth,
  type HttpResponseRegUser,
  type HttpRequestLoginUser,
  type HttpResponseLoginUser
} from '@interfaces/auth.interface'
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
  async registerUser(req: HttpRequestRegUser): Promise<HttpResponseRegUser> {
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
  async loginUser(req: HttpRequestLoginUser): Promise<HttpResponseLoginUser> {
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
  }
}

export default AuthController
