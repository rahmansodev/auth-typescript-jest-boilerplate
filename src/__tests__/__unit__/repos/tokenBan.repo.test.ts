import TokenBan from '@models/tokenBan.model'
import TokenBanRepo from '@repos/tokenBan.repo'
import { Types } from 'mongoose'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mockingoose = require('mockingoose')

describe('TokenBanRepo', () => {
  beforeEach(() => {
    mockingoose.resetAll()
  })

  describe('createTokenBan', () => {
    it('should create a tokenBan', async () => {
      const createTokenBanPayload = {
        token: 'theToken'
      }

      mockingoose(TokenBan).toReturn(createTokenBanPayload, 'save')

      const createdTokenBan = await TokenBanRepo.createTokenBan(createTokenBanPayload)

      expect(createdTokenBan).toMatchObject(createTokenBanPayload)
    })
  })

  describe('findTokenBanByToken', () => {
    it('should find a tokenBan by token', async () => {
      const token = 'bannedToken'
      const mockTokenBan = {
        _id: '60a6b4748f85a81d8c4c0434',
        token
      }

      mockingoose(TokenBan).toReturn(mockTokenBan, 'findOne')

      const foundTokenBan = await TokenBanRepo.findTokenBanByToken(token)

      if (foundTokenBan !== null) {
        expect(foundTokenBan._id).toEqual(new Types.ObjectId(mockTokenBan._id))
        expect(foundTokenBan.token).toEqual(mockTokenBan.token)
      } else {
        fail('Should be return tokenBan value')
      }
    })

    it('should return null for non-banned token', async () => {
      const nonExistingToken = 'nonbannedTOken'

      mockingoose(TokenBan).toReturn(null, 'findOne')

      const foundTokenBan = await TokenBanRepo.findTokenBanByToken(nonExistingToken)

      expect(foundTokenBan).toBeNull()
    })
  })
})
