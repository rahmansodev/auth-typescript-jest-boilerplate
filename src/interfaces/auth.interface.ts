import { type HttpResponse, type HttpRequestWithUser, type Cookie } from '@interfaces/httpServer.interface'

/* Controller */
export interface HttpRequestRegUser extends HttpRequestWithUser {
  body: {
    fullName: string | undefined
    email: string | undefined
    password: string | undefined
  }
}

export interface HttpResponseRegUser extends HttpResponse {
  body: {
    message: string
  }
}

export interface HttpRequestLoginUser extends HttpRequestWithUser {
  body: {
    email: string | undefined
    password: string | undefined
  }
}

export interface HttpResponseLoginUser extends HttpResponse {
  body: {
    message: string
    accessToken: string
  }
  cookies: Cookie[]
}

export interface ControllerAuth {
  /**
   * Register a new user.
   *
   * @param {HttpRequestRegUser} req - Express request object.
   * @returns {Promise<HttpResponseRegUser>} Response object.
   */
  registerUser: (req: HttpRequestRegUser) => Promise<HttpResponseRegUser>
  /**
   * Log in a user and create the accessToken and refreshToken.
   *
   * @param {HttpRequestLoginUser} req - Express request object.
   * @returns {Promise<HttpResponseLoginUser>} Response object.
   */
  loginUser: (req: HttpRequestLoginUser) => Promise<HttpResponseLoginUser>
}

/* Utils */

export interface UtilAuth {
  /**
   * Validate an email address.
   *
   * @param {string} email - The email address to validate.
   * @returns {boolean} True if the email is valid, false otherwise.
   */
  validateEmail: (email: string) => boolean
  /**
   * Validate a password based on various criteria.
   *
   * @param {string} password - The password to validate.
   * @returns {boolean} True if the password meets the specified criteria, false otherwise.
   */
  validatePassword: (password: string) => boolean
}
