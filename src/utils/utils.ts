import axios, { AxiosError, HttpStatusCode } from 'axios'
// import HttpStatusCode from 'src/constants/httpStatusCode.enum'

// hàm kiểm tra 1 obj lỗi có phải là lỗi Axios hay không
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
    // eslint-disable-next-line import/no-named-as-default-member
    return axios.isAxiosError(error) // kiểm tra xem error có phải là một lỗi Axios hay không.
}

// tra xem một lỗi có phải là lỗi Unprocessable Entity (422) từ Axios hay không
// AxiosError<FormError>: dữ liệu trong response.data của lỗi sẽ có kiểu là FormError
export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
    return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

// format price
export const formatCurrency = (currency: number) => {
    return new Intl.NumberFormat('de-DE').format(currency)
}

// format qty
export const formatNumberToSocialStyle = (value: number) => {
    return new Intl.NumberFormat('en', {
        notation: 'compact',
        maximumFractionDigits: 1
    })
        .format(value)
        .replace('.', ',')
        .toLocaleLowerCase()
}
