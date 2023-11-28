import TokenBanUtil from '@utils/tokenBan.util' // Adjust the import path as needed
import TokenBanRepo from '@repos/tokenBan.repo' // Adjust the import path as needed

jest.mock('@repos/tokenBan.repo')

describe('TokenBanUtil', () => {
  it('should return false when the token is not banned', async () => {
    // Arrange
    const mockTokenBan = null
    ;(TokenBanRepo.findTokenBanByToken as jest.Mock).mockResolvedValue(mockTokenBan)

    // Act
    const result = await TokenBanUtil.isTokenBanned('nonBannedToken')

    // Assert
    expect(result).toBe(false)
    // Ensure that TokenBanRepo.findTokenBanByToken is called with the correct token
    expect(TokenBanRepo.findTokenBanByToken).toHaveBeenCalledWith('nonBannedToken')
  })

  it('should return true when the token is banned', async () => {
    // Arrange
    const mockTokenBan = { _id: 'mockId', token: 'bannedToken' }
    ;(TokenBanRepo.findTokenBanByToken as jest.Mock).mockResolvedValue(mockTokenBan)

    // Act
    const result = await TokenBanUtil.isTokenBanned('bannedToken')

    // Assert
    expect(result).toBe(true)
    // Ensure that TokenBanRepo.findTokenBanByToken is called with the correct token
    expect(TokenBanRepo.findTokenBanByToken).toHaveBeenCalledWith('bannedToken')
  })
})
