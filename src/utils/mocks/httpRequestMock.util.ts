import { type HttpRequest } from '@interfaces/httpServer.interface'

interface HttpRequestMockParams {
  user?: object
  params?: object
  body?: object
  query?: object
}

export const generateHttpRequestMock = (reqParams?: HttpRequestMockParams): HttpRequest => {
  const query = reqParams?.query ?? {}
  const params = reqParams?.params ?? {}
  const body = reqParams?.body ?? {}
  const user = reqParams?.user ?? undefined
  const httpRequestMock: HttpRequest = {
    query,
    params,
    ip: undefined,
    method: '',
    path: '',
    headers: {
      'Content-Type': undefined,
      Referer: undefined,
      'User-Agent': undefined
    },
    user,
    timestamp: new Date(),
    body
  }

  return httpRequestMock
}
