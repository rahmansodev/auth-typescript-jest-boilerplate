import { captureException } from '@sentry/node'

const onMongoError = (error: unknown): void => {
  console.error('Mongo connection error occurred. Exiting...')
  captureException(error)
  process.exit(1)
}

export { onMongoError }
