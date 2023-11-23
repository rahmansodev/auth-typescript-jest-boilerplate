import mongoose from 'mongoose'
import env from '@config/env'
import { onMongoError } from '@config/eventhandlers/mongo.eventHandler'
import { captureException } from '@sentry/node'
const MONGO_URI: string = `${env.database.MONGODB_URI}${env.database.MONGODB_DB_NAME}`

// need to require these for populate model
require('@models/user.model')

const mongoConnect = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI)
  } catch (error) {
    captureException(error)
    process.exit(1)
  }
}

// handlers
mongoose.connection.on('connecting', () => {
  console.info('[MongoDB] connecting')
})

mongoose.connection.on('error', (error: Error) => {
  onMongoError(error)
})

mongoose.connection.on('connected', () => {
  console.info('[MongoDB] connected')
})

mongoose.connection.once('open', () => {
  console.info('[MongoDB] connection opened')
})

mongoose.connection.on('reconnected', () => {
  console.warn('[MongoDB] reconnected')
})

mongoose.connection.on('reconnectFailed', () => {
  console.error('[MongoDB] reconnectFailed')
})

mongoose.connection.on('disconnected', () => {
  console.warn('[MongoDB] disconnected')
})

mongoose.connection.on('fullsetup', () => {
  console.debug('[MongoDB] reconnecting... %d')
})

void mongoConnect()
