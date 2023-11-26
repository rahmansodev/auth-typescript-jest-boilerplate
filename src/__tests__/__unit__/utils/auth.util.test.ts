import AuthUtil from '@utils/auth.util'

describe('AuthUtil', () => {
  describe('validateEmail', () => {
    it('should return true for a valid email', () => {
      const validEmail = 'test@example.com'
      const result = AuthUtil.validateEmail(validEmail)
      expect(result).toBe(true)
    })

    it('should return false for an invalid email', () => {
      const invalidEmail = 'invalid-email'
      const result = AuthUtil.validateEmail(invalidEmail)
      expect(result).toBe(false)
    })
  })

  describe('validatePassword', () => {
    it('should return true for a valid password', () => {
      const validPassword = 'StrongP@ss1'
      const result = AuthUtil.validatePassword(validPassword)
      expect(result).toBe(true)
    })

    it('should return false for a password with length less than 8 characters', () => {
      const shortPassword = 'Short1'
      const result = AuthUtil.validatePassword(shortPassword)
      expect(result).toBe(false)
    })

    it('should return false for a password without an uppercase letter', () => {
      const passwordWithoutUppercase = 'lowercase1@'
      const result = AuthUtil.validatePassword(passwordWithoutUppercase)
      expect(result).toBe(false)
    })

    it('should return false for a password without a lowercase letter', () => {
      const passwordWithoutLowercase = 'UPPERCASE1@'
      const result = AuthUtil.validatePassword(passwordWithoutLowercase)
      expect(result).toBe(false)
    })

    it('should return false for a password without a digit', () => {
      const passwordWithoutDigit = 'NoDigit@Special'
      const result = AuthUtil.validatePassword(passwordWithoutDigit)
      expect(result).toBe(false)
    })

    it('should return false for a password without a special character', () => {
      const passwordWithoutSpecialChar = 'NoSpecialCharacter123'
      const result = AuthUtil.validatePassword(passwordWithoutSpecialChar)
      expect(result).toBe(false)
    })

    it('should return false for a password with spaces', () => {
      const passwordWithSpaces = 'Password With Spaces'
      const result = AuthUtil.validatePassword(passwordWithSpaces)
      expect(result).toBe(false)
    })
  })
})
