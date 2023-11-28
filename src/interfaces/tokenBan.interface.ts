import { type Types } from 'mongoose'

/* Data Models */
export interface TokenBanBase {
  _id: Types.ObjectId
  token: string
}

export interface TokenBanCreatePayload extends Omit<TokenBanBase, '_id'> {}

/* Repos */

export interface RepoTokenBan {
  /**
   * Create a new tokenBan in the database for banning refresh token of being used.
   *
   * @param {TokenBanCreatePayload} payload - tokenBan data token to be stored in the database.
   * @returns {Promise<TokenBanBase>} The created tokenBan.
   */
  createTokenBan: (payload: TokenBanCreatePayload) => Promise<TokenBanBase>
  /**
   * Find a token ban by its token in the database.
   *
   * @param {string} token - The token to search for in the database.
   * @returns {Promise<TokenBanBase | null>} A promise that resolves to the found token ban or null if not found.
   */
  findTokenBanByToken: (token: string) => Promise<TokenBanBase | null>
}

/* Utils */

export interface UtilTokenBan {
  /**
   * Check if a token is banned in the database.
   *
   * @param {string} token - The token to check for ban status.
   * @returns {Promise<boolean>} A promise that resolves to true if the token is banned, otherwise false.
   */
  isTokenBanned: (token: string) => Promise<boolean>
}
