import { type UtilAuth } from '@interfaces/auth.interface'
import validator from 'validator'

/**
 * Utility functions related to authentication.
 * @type {UtilAuth}
 */
const AuthUtil: UtilAuth = {
  validateEmail(email) {
    // Check if the email is valid
    const isEmailValid = validator.isEmail(email)

    // Return true if the email is valid
    return isEmailValid
  },
  validatePassword(password) {
    // Check if the password is at least 8 characters long
    const isLengthValid = validator.isLength(password, { min: 8 })

    // Check if the password contains at least one uppercase letter
    const hasUppercase = /[A-Z]/.test(password)

    // Check if the password contains at least one lowercase letter
    const hasLowercase = /[a-z]/.test(password)

    // Check if the password contains at least one digit
    const hasDigit = /\d/.test(password)

    // Check if the password contains at least one special character
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    // Check if the password contains any spaces
    const hasNoSpaces = !/\s/.test(password)

    // Return true if all conditions are met
    return Boolean(isLengthValid) && hasUppercase && hasLowercase && hasDigit && hasSpecialChar && hasNoSpaces
  }
}

export default AuthUtil
