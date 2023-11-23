import { type Server } from 'http'
import { type Address } from 'cluster'
import { captureException } from '@sentry/node'

/**
 * @param  {NodeJS.ErrnoException} error
 * @param  {number|string|boolean} port
 * @returns throw error
 */
export function onError(error: NodeJS.ErrnoException, port: number | string | boolean): void {
  captureException(error)
  if (error.syscall !== 'listen') {
    process.exit(1)
  }

  const bind: string = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

  switch (error.code) {
    case 'EACCES':
      console.log(`${bind} requires elevated privileges`)
      process.exit(1)

      break
    case 'EADDRINUSE':
      console.log(`${bind} is already in use`)
      process.exit(1)

      break
    default:
      process.exit(1)
  }
}

/**
 * @export onListening
 */
export function onListening(this: Server): void {
  const addr: Address | any = this.address()
  const bind: string = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`

  console.log(`Listening debugging on ${bind}`)
}

/**
 * @export onDevelopment
 */
export function onRequest(): void {}
