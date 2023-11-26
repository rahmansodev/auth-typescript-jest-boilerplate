import { type Request, type NextFunction, type Response } from 'express'
import { captureException } from '@sentry/node'
import env from '@config/env'
import passport from 'passport'
import { type UserBase } from '@interfaces/user.interface'
import User from '@models/user.model'
import bcrypt from 'bcrypt'
import { type Document, type Types } from 'mongoose'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

/**
 * Initializes the JWT strategy middleware for Passport.
 * @function
 * @returns {void}
 */
export const jwtStrategyMiddleware = (): void => {
  const opts = {
    secretOrKey: env.secret.JWT,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  }

  passport.use(
    new JwtStrategy(
      opts,
      (jwtPayload: { user: UserBase | null }, done: (arg0: null, arg1: boolean | UserBase) => any) => {
        // Define a separate function to handle the async logic with a Promise<void> return type
        // to supress typescript error
        const handleAsyncLogic = async (): Promise<void> => {
          if (jwtPayload.user !== null) {
            return done(null, jwtPayload.user)
          }
          return done(null, false)
        }

        // Call the async function and handle any errors
        handleAsyncLogic().catch((error) => done(error, false))
      }
    )
  )
}

/**
 * Middleware for configuring the local strategy for Passport.
 *
 * @returns {void}
 */
export const localStrategyMiddleware = (): void => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      (
        email: string,
        password: string,
        done: (
          arg0: unknown,
          arg1: boolean | (Document<unknown, UserBase> & UserBase & Required<{ _id: Types.ObjectId }>)
        ) => any
      ) => {
        // Define a separate function to handle the async logic with a Promise<void> return type
        // to supress typescript error
        const handleAsyncLogic = async (): Promise<void> => {
          try {
            const user = await User.findOne({ email })

            if (user === null) {
              return done(null, false)
            }

            const passwordMatch = bcrypt.compareSync(password, user.password)

            if (!passwordMatch) {
              return done(null, false)
            }

            return done(null, user)
          } catch (error) {
            return done(error, false)
          }
        }

        // Call the async function and handle any errors
        handleAsyncLogic().catch((error) => done(error, false))
      }
    )
  )
}

/**
 * Middleware to check if a user is authenticated using Passport.
 * @function
 * @param {RequestWithUser} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {void}
 */
export function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
  try {
    passport.authenticate(['jwt'], { session: false })(req, res, next)
  } catch (error) {
    console.log(error)
    captureException(error)
  }
}

/**
 * Middleware for authenticating login requests using Passport local strategy.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 * @returns {void}
 */
export function isLoginAuthenticated(req: Request, res: Response, next: NextFunction): void {
  try {
    passport.authenticate(['local'], { session: false })(req, res, next)
  } catch (error) {
    console.log(error)
    captureException(error)
  }
}

/**
 * Initialize authentication middleware by setting up local and JWT strategies.
 *
 * @returns {void}
 */
export const initAuthMiddleware = (): void => {
  try {
    // init local strategy
    localStrategyMiddleware()
    // init jwt strategy
    jwtStrategyMiddleware()
  } catch (error) {
    console.log(error)
    captureException(error)
  }
}
