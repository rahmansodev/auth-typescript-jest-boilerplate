import type { Request } from 'express'
import { type UserBase } from '@interfaces/user.interface'

export interface RequestWithUser extends Request {
  user?: object | any
}

export interface HttpRequest {
  body: any
  exchangeServices?: object | any
  query: object | any
  params: object | any
  ip: string | null | undefined
  method: string
  path: string
  headers: object
  user: object | any
  timestamp?: Date
}

export interface Cookie {
  name: string
  value: string
  options?: object
}

export interface HttpResponse {
  headers?: object
  statusCode: number
  body: object
  cookies?: Cookie[]
}

export interface HttpRequestWithUser extends HttpRequest {
  user: UserBase
}
