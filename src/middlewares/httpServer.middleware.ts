import * as bodyParser from 'body-parser'
// import * as compression from 'compression';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import type express from 'express'
import helmet from 'helmet'
import { initAuthMiddleware } from '@middlewares/auth.middleware'

/**
 * @export
 * @param {express.Application} app
 */
export function configure(app: express.Application): void {
  // express middleware
  app.use(
    bodyParser.urlencoded({
      extended: false
    })
  )
  app.use(bodyParser.json())
  // parse Cookie header and populate req.cookies with an object keyed by the cookie names.
  app.use(cookieParser())
  // returns the compression middleware
  // app.use(compression());
  // helps you secure your Express apps by setting various HTTP headers
  app.use(helmet())
  // providing a Connect/Express middleware that can be used to enable CORS with various options
  app.use(cors())

  // init auth middleware
  initAuthMiddleware()
}
