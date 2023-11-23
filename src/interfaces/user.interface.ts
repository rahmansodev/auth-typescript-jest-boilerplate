import { type Types } from 'mongoose'

/* Data Models */
export interface UserBase {
  _id: Types.ObjectId
  email: string
  password: string
  fullName: string
}

export interface UserCreatePayload extends Omit<UserBase, '_id'> {}
