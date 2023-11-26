import User from '@models/user.model'
import UserRepo from '@repos/user.repo'
import { Types } from 'mongoose'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mockingoose = require('mockingoose')

describe('UserRepo', () => {
  beforeEach(() => {
    mockingoose.resetAll()
  })

  describe('createUser', () => {
    it('should create a user', async () => {
      const createUserPayload = {
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'hashedpassword'
      }

      mockingoose(User).toReturn(createUserPayload, 'save')

      const createdUser = await UserRepo.createUser(createUserPayload)

      expect(createdUser).toMatchObject(createUserPayload)
    })
  })

  describe('findUserByEmail', () => {
    it('should find a user by email', async () => {
      const email = 'john@example.com'
      const mockUser = {
        _id: '60a6b4748f85a81d8c4c0434',
        fullName: 'John Doe',
        email,
        password: 'hashedpassword'
      }

      mockingoose(User).toReturn(mockUser, 'findOne')

      const foundUser = await UserRepo.findUserByEmail(email)

      if (foundUser !== null) {
        expect(foundUser._id).toEqual(new Types.ObjectId(mockUser._id))
        expect(foundUser.fullName).toEqual(mockUser.fullName)
        expect(foundUser.email).toEqual(mockUser.email)
        expect(foundUser.password).toEqual(mockUser.password)
      } else {
        fail('Should be return user value')
      }
    })

    it('should return null for non-existing email', async () => {
      const nonExistingEmail = 'nonexistent@example.com'

      mockingoose(User).toReturn(null, 'findOne')

      const foundUser = await UserRepo.findUserByEmail(nonExistingEmail)

      expect(foundUser).toBeNull()
    })
  })
})
