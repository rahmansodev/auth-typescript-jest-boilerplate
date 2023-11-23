import { type NextFunction, type Response } from 'express'
import type { HttpRequest, HttpResponse, RequestWithUser } from '@interfaces/httpServer.interface'
import { captureException } from '@sentry/node'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

function controllerCb(controller: any) {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.originalUrl,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent')
      },
      user: req.user,
      timestamp: new Date()
    }
    controller(httpRequest)
      .then((httpResponse: HttpResponse) => {
        // Headers
        if (httpResponse.headers !== null) {
          res.set(httpResponse.headers)
        } else {
          res.set({ 'Content-Type': 'application/json' })
        }

        res.type('json')

        res.status(httpResponse.statusCode).send(httpResponse.body)
      })
      .catch((error: unknown) => {
        console.log(error)
        captureException(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: ReasonPhrases.INTERNAL_SERVER_ERROR
        })
      })
  }
}

function middlewareCb(middleware: any) {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.originalUrl,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent')
      },
      user: req.user,
      timestamp: new Date()
    }
    middleware(httpRequest, res, next)
      .then((httpResponse: HttpResponse) => {
        if (httpResponse.statusCode === StatusCodes.OK) {
          next()
        } else {
          // Headers
          if (httpResponse.headers !== null) {
            res.set(httpResponse.headers)
          } else {
            res.set({ 'Content-Type': 'application/json' })
          }

          res.type('json')

          res.status(httpResponse.statusCode).send(httpResponse.body)
        }
      })
      .catch((error: unknown) => {
        console.log(error)
        captureException(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: ReasonPhrases.INTERNAL_SERVER_ERROR
        })
      })
  }
}

export { controllerCb, middlewareCb }
