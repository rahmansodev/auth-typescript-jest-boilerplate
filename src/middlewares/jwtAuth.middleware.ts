// import * as HttpStatus from 'http-status-codes'
// import * as jwt from 'jsonwebtoken'
import { type Request, type NextFunction, type Response } from 'express'
// import app from '@config/server/serverExpressApp'
import { captureException } from '@sentry/node'
import env from '@config/env'
import passport from 'passport'
import { type UserBase } from '@interfaces/user.interface'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const JwtStrategy = require('passport-jwt').Strategy
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ExtractJwt = require('passport-jwt').ExtractJwt

/**
 * Initializes the JWT strategy middleware for Passport.
 * @function
 * @returns {void}
 */
export const jwtStrategyMiddleware = (): void => {
  const opts = {
    secretOrKey: env.secret.JWT,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
  }

  passport.use(
    new JwtStrategy(
      opts,
      async (jwtPayload: { user: UserBase | null }, done: (arg0: null, arg1: boolean | UserBase) => any) => {
        if (jwtPayload.user !== null) {
          return done(null, jwtPayload.user)
        }

        return done(null, false)
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
