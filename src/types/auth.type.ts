import { SuccessResponseApi } from './utils.type'
import { User } from './user.type'

export type AuthRespone = SuccessResponseApi<{
    access_token: string
    expires: string // hạn access_token
    user: User
}>
