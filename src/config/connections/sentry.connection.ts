import * as Sentry from '@sentry/node'
import env from '@config/env'

Sentry.init({
  dsn: env.sentry.SENTRY_DSN
})
