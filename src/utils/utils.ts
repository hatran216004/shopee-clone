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

// giá gốc - giá sau sale / giá gốc * 100% => % giảm
export const rateSale = (original: number, sale: number) => Math.round(((original - sale) / original) * 100) + '%'

// func xóa các ký tự đặc biệt trên bàn phím
const removeSpecialCharacter = (str: string) =>
    // eslint-disable-next-line no-useless-escape
    str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

/*
    const name = "Hello, World!";
    const id = "12345";
    const nameId = generateNameId({ name, id });
    console.log(nameId); // Output: Hello-World-i.12345
*/
export const generateNameId = ({ name, id }: { name: string; id: string }) => {
    return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i.${id}`
}

/*
    const nameId = "Hello-World-i.12345";
    const id = getIdFromNameId(nameId);
    arr: ['Hello-World', '12345']
    console.log(id); // Output: 12345
*/
export const getIdFromNameId = (nameId: string) => {
    const arr = nameId.split('-i.')
    return arr[arr.length - 1]
}
