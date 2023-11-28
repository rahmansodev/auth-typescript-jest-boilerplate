import { type UtilTokenBan } from '@interfaces/tokenBan.interface'
import TokenBanRepo from '@repos/tokenBan.repo'

/**
 * Utility functions related to TokenBan.
 * @type {UtilTokenBan}
 */
const TokenBanUtil: UtilTokenBan = {
  async isTokenBanned(token) {
    const tokenBan = await TokenBanRepo.findTokenBanByToken(token)

    if (tokenBan === null) {
      return false
    } else {
      return true
    }
  }
}

export default TokenBanUtil
