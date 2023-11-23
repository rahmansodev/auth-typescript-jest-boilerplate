import express from 'express'
import * as Middleware from '@middlewares/httpServer.middleware'
import * as Routes from '@routes/index'
import env from '@config/env'

/**
 * @constant {express.Application}
 */
const app: express.Application = express()

/**
 * @constructs express.Application Middleware
 */
Middleware.configure(app)

/**
 * @constructs express.Application Routes
 */
Routes.init(app)

/**
 * sets port 5000 to default or unless otherwise specified in the environment
 */
app.set('port', env.port ?? '5000')

/**
 * sets secret to 'superSecret', otherwise specified in the environment
 */
app.set('jwt', env.secret.JWT ?? 'TOP_SECRET')

/**
 * @exports {express.Application}
 */
export default app
