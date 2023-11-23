import { type NextFunction, type Request, type Response, type Application, Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import morgan from 'morgan'
import HealthRouter from '@routes/health.route'
import { isAuthenticated } from '@middlewares/jwtAuth.middleware'

export function init(app: Application): void {
  const router: Router = Router()

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny'))
  }

  // No Need Authentication Route
  app.use('/health', HealthRouter)

  // Need Authentication Route
  // add below here need authenticated route
  app.use(isAuthenticated)

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found.' })
  })
  app.use(router)
}
