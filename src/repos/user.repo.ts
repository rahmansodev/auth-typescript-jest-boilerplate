import { type RepoUser } from '@interfaces/user.interface'
import User from '@models/user.model'

/**
 * Repository for user-related database operations.
 * @type {RepoUser}
 */
const UserRepo: RepoUser = {
  async createUser(payload) {
    return await User.create(payload)
  },
  async findUserByEmail(email) {
    return await User.findOne({ email })
  }
}

export default UserRepo
