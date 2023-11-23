import * as dotenv from 'dotenv'

dotenv.config()

interface Config {
  port: string | number
  hostname: {
    SERVER: string
    CLIENT: string
  }
  database: {
    MONGODB_URI: string
    MONGODB_DB_NAME: string
  }
  secret: {
    JWT: string
  }
  sentry: {
    SENTRY_DSN: string
  }
}

const NODE_ENV: string = process.env.NODE_ENV ?? 'development'

const development: Config = {
  port: process.env.PORT ?? 5000,
  hostname: {
    SERVER: process.env.SERVER_URI ?? 'http://localhost:5000',
    CLIENT: process.env.CLIENT_URI ?? 'http://localhost:5000'
  },
  database: {
    MONGODB_URI: process.env.MONGODB_URI ?? 'mongodb://localhost:27017/',
    MONGODB_DB_NAME: process.env.MONGODB_DB_NAME ?? 'dbDev'
  },
  secret: {
    JWT: process.env.JWT_SECRET ?? 'TOP_SECRET'
  },
  sentry: {
    SENTRY_DSN: process.env.SENTRY_DSN ?? 'SENTRY_DSN_KEY'
  }
}

const staging: Config = {
  port: process.env.PORT ?? 5000,
  hostname: {
    SERVER: process.env.SERVER_URI ?? 'https://staging_uri',
    CLIENT: process.env.CLIENT_URI ?? 'https://client.staging_uri'
  },
  database: {
    MONGODB_URI: process.env.MONGODB_URI ?? 'mongodb://staging_uri/',
    MONGODB_DB_NAME: process.env.MONGODB_DB_NAME ?? 'dbProd'
  },
  secret: {
    JWT: process.env.JWT_SECRET ?? 'TOP_SECRET'
  },
  sentry: {
    SENTRY_DSN: process.env.SENTRY_DSN ?? 'SENTRY_DSN_KEY'
  }
}

const production: Config = {
  port: process.env.PORT ?? 5000,
  hostname: {
    SERVER: process.env.SERVER_URI ?? 'https://production_uri',
    CLIENT: process.env.CLIENT_URI ?? 'https://client.production_uri'
  },
  database: {
    MONGODB_URI: process.env.MONGODB_URI ?? 'mongodb://production_uri/',
    MONGODB_DB_NAME: process.env.MONGODB_DB_NAME ?? 'dbProd'
  },
  secret: {
    JWT: process.env.JWT_SECRET ?? 'TOP_SECRET'
  },
  sentry: {
    SENTRY_DSN: process.env.SENTRY_DSN ?? 'SENTRY_DSN_KEY'
  }
}

const test: Config = {
  port: process.env.TEST_PORT ?? 5000,
  hostname: {
    SERVER: process.env.TEST_SERVER_URI ?? 'https://test_uri',
    CLIENT: process.env.TEST_CLIENT_URI ?? 'https://client.test_uri'
  },
  database: {
    MONGODB_URI: process.env.TEST_MONGODB_URI ?? 'mongodb://test_uri/',
    MONGODB_DB_NAME: process.env.TEST_MONGODB_DB_NAME ?? 'dbProd'
  },
  secret: {
    JWT: process.env.TEST_JWT_SECRET ?? 'TOP_SECRET'
  },
  sentry: {
    SENTRY_DSN: process.env.TEST_SENTRY_DSN ?? 'SENTRY_DSN_KEY'
  }
}

const config: Record<string, Config> = {
  development,
  staging,
  test,
  production
}

export default config[NODE_ENV]
