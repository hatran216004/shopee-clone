import { ResponeApi } from './utils.type'
import { User } from './user.type'

export type AuthRespone = ResponeApi<{
    access_token: string
    expires: string // hạn access_token
    user: User
}>
