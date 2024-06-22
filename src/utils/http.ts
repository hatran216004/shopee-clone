import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { AuthRespone } from 'src/types/auth.type'
import { clearAccessTokenFromLS, getAccessTokenFromLS, saveAccessTokenToLS } from './auth'
/*
    + Khi get Api mà lấy data từ localstrage sẽ bị chậm (ls lưu vào ở cứng, đọc dữ liệu trong ổ cứng sẽ chậm hơn trong ram)
    + Khi lưu accessToken trong class => lưu trên ram => đọc dữ liệu nhanh hơn
*/
class Http {
    instance: AxiosInstance
    private accessToken: string
    constructor() {
        this.accessToken = getAccessTokenFromLS()
        this.instance = axios.create({
            baseURL: 'https://api-ecom.duthanhduoc.com/',
            timeout: 10000,
            headers: { 'Content-Type': 'application/json' }
        })
        this.instance.interceptors.request.use((config) => {
            if (this.accessToken) {
                config.headers.authorization = this.accessToken
            }
            return config
        }),
            (error: AxiosError) => {
                return Promise.reject(error)
            }

        this.instance.interceptors.response.use(
            (response) => {
                const { url } = response.config
                if (url === 'login' || url === 'register') {
                    this.accessToken = (response.data as AuthRespone).data.access_token
                    saveAccessTokenToLS(this.accessToken)
                } else if (url === 'logout') {
                    this.accessToken = ''
                    clearAccessTokenFromLS()
                }

                return response
            },
            function (error: AxiosError) {
                if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const data: any | undefined = error.response?.data
                    const message = data.message || error.message
                    toast.error(message)
                }
                return Promise.reject(error)
            }
        )
    }
}

const http = new Http().instance
export default http
