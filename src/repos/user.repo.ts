import { type UserBase, type RepoUser, type UserCreatePayload } from '@interfaces/user.interface'
import User from '@models/user.model'

/**
 * Repository for user-related database operations.
 * @type {RepoUser}
 */
const UserRepo: RepoUser = {
  async createUser(payload: UserCreatePayload): Promise<UserBase> {
    return await User.create(payload)
  },
  async findUserByEmail(email: string): Promise<UserBase | null> {
    return await User.findOne({ email })
  }
}

export default UserRepo
