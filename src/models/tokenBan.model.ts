import AuthConstant from '@constants/auth.constant'
import { type TokenBanBase } from '@interfaces/tokenBan.interface'
import mongoose, { Schema } from 'mongoose'

const tokenBanSchema: Schema = new Schema<TokenBanBase>(
  {
    token: { type: String, required: true, unique: true, expires: AuthConstant.REFRESH_TOKEN_EXPIRY }
  },
  {
    timestamps: true
  }
)

const TokenBan = mongoose.model<TokenBanBase>('TokenBan', tokenBanSchema)

export default TokenBan
