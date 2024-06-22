import { User } from 'src/types/user.type'

export const setAccessTokenToLS = (access_token: string) => localStorage.setItem('access_token', access_token)

export const clearLS = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
}

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''

export const setUserToLS = (user: User) => localStorage.setItem('user', JSON.stringify(user))

export const getUserFromLS = () => {
    const result = localStorage.getItem('user')
    return result ? JSON.parse(result) : null
}
