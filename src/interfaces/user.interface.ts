import { type Types } from 'mongoose'

/* Data Models */
export interface UserBase {
  _id: Types.ObjectId
  email: string
  password: string
  fullName: string
}

export interface UserCreatePayload extends Omit<UserBase, '_id'> {}

/* Repo */

export interface RepoUser {
  /**
   * Create a new user in the database.
   *
   * @param {UserCreatePayload} payload - User data to be stored in the database.
   * @returns {Promise<UserBase>} The created user.
   */
  createUser: (payload: UserCreatePayload) => Promise<UserBase>
  /**
   * Find a user in the database by email.
   *
   * @param {string} email - Email address to search for.
   * @returns {Promise<UserBase | null>} The found user or null if not found.
   */
  findUserByEmail: (email: string) => Promise<UserBase | null>
}
