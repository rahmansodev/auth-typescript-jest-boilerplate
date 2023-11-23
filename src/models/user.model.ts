import { type UserBase } from '@interfaces/user.interface'
import mongoose, { Schema } from 'mongoose'

const userSchema: Schema = new Schema<UserBase>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

const User = mongoose.model<UserBase>('User', userSchema)

export default User
