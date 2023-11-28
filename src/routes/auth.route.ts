/* eslint-disable @typescript-eslint/no-misused-promises */
import AuthController from '@controllers/auth.controller'
import { isLoginAuthenticated } from '@middlewares/auth.middleware'
import { controllerCb } from '@middlewares/callback.middleware'
import { Router } from 'express'

const router = Router()

router.post('/register', controllerCb(AuthController.registerUser))
router.post('/refreshToken', controllerCb(AuthController.refreshToken))
router.post('/login', isLoginAuthenticated, controllerCb(AuthController.loginUser))

export default router
