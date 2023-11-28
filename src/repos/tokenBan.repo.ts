import { type RepoTokenBan } from '@interfaces/tokenBan.interface'
import TokenBan from '@models/tokenBan.model'

/**
 * Repository for tokenBan-related database operations.
 * @type {RepoTokenBan}
 */
const TokenBanRepo: RepoTokenBan = {
  async createTokenBan(payload) {
    return await TokenBan.create(payload)
  },
  async findTokenBanByToken(token) {
    const query = {
      token
    }
    return await TokenBan.findOne(query)
  }
}

export default TokenBanRepo
