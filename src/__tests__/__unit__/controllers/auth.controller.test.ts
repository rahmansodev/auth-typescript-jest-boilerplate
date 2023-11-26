import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import AuthUtil from '@utils/auth.util'
import AuthController from '@controllers/auth.controller'
import UserRepo from '@repos/user.repo'
import { generateHttpRequestMock } from '@utils/mocks/httpRequestMock.util'

jest.mock('bcrypt')
jest.mock('jsonwebtoken')
jest.mock('@repos/user.repo')
jest.mock('@utils/auth.util')

describe('AuthController', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('registerUser', () => {
    it('should return BAD_REQUEST if password is undefined', async () => {
      const req = generateHttpRequestMock({ body: { email: 'test@example.com', fullName: 'John Doe' } })
      const result = await AuthController.registerUser(req)

      expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST)
      expect(result.body.message).toBe('Password required')
    })

    it('should return BAD_REQUEST if fullName is undefined', async () => {
      const req = generateHttpRequestMock({ body: { email: 'test@example.com', password: 'testPassword' } })
      const result = await AuthController.registerUser(req)

      expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST)
      expect(result.body.message).toBe('fullName required')
    })

    it('should return BAD_REQUEST if email is invalid', async () => {
      const req = generateHttpRequestMock({
        body: { email: 'invalidEmail', password: 'testPassword', fullName: 'John Doe' }
      })
      const result = await AuthController.registerUser(req)

      expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST)
      expect(result.body.message).toBe('Email invalid')
    })

    it('should return BAD_REQUEST if password is invalid/weak', async () => {
      ;(AuthUtil.validateEmail as jest.Mock).mockResolvedValue(true) // Mock email is valid
      const req = generateHttpRequestMock({
        body: { email: 'test@example.com', password: 'weak', fullName: 'John Doe' }
      })
      const result = await AuthController.registerUser(req)

      expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST)
      expect(result.body.message).toBe('Password invalid')
    })

    it('should return BAD_REQUEST if user with email already exists even though password is strong', async () => {
      ;(AuthUtil.validateEmail as jest.Mock).mockResolvedValue(true) // Mock email is valid
      ;(AuthUtil.validatePassword as jest.Mock).mockResolvedValue(true) // Mock password is strong enough
      ;(UserRepo.findUserByEmail as jest.Mock).mockResolvedValue({}) // Mock that user already exists

      const req = generateHttpRequestMock({
        body: { email: 'existing@example.com', password: 'test$Tr0ngPassword', fullName: 'John Doe' }
      })
      const result = await AuthController.registerUser(req)

      expect(result.statusCode).toBe(StatusCodes.BAD_REQUEST)
      expect(result.body.message).toBe('User with this email already exist')
    })

    it('should return OK if registration is successful', async () => {
      ;(AuthUtil.validateEmail as jest.Mock).mockResolvedValue(true) // Mock email is valid
      ;(AuthUtil.validatePassword as jest.Mock).mockResolvedValue(true) // Mock password is strong enough
      // Mock UserRepo.findUserByEmail to return null (indicating user doesn't exist)
      ;(UserRepo.findUserByEmail as jest.Mock).mockResolvedValue(null)

      // Mock bcrypt.hashSync to return a hashed password
      ;(bcrypt.hashSync as jest.Mock).mockReturnValue('hashedPassword')

      const req = generateHttpRequestMock({
        body: { email: 'test@example.com', password: 'test$Tr0ngPassword', fullName: 'John Doe' }
      })

      const result = await AuthController.registerUser(req)

      expect(result.statusCode).toBe(StatusCodes.OK)
      expect(result.body.message).toBe('User successfully created')
    })
  })

  describe('loginUser', () => {
    it('should return OK with access token and refresh token cookie if login is successful', async () => {
      // Mock jwt.sign to return tokens
      ;(jwt.sign as jest.Mock).mockReturnValueOnce('fakeAccessToken').mockReturnValueOnce('fakeRefreshToken')

      const user = {
        _id: '60a6b4748f85a81d8c4c0434',
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'hashedpassword'
      }
      const req = generateHttpRequestMock({ user })

      const result = await AuthController.loginUser(req)

      // Check the response
      expect(result.statusCode).toBe(StatusCodes.OK)
      expect(result.body.message).toBe('User successfully logged in')
      expect(result.body.accessToken).toBe('fakeAccessToken')

      // Check the cookie
      expect(result.cookies).toHaveLength(1)
      expect(result.cookies[0].name).toBe('refreshToken')
      expect(result.cookies[0].value).toBe('fakeRefreshToken')
    })
  })
})
