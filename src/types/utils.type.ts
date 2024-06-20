// <Data>: interface ResponseApi có thể sử dụng với nhiều loại dữ liệu khác nhau
// mà không cần phải định nghĩa lại nhiều lần
export interface ResponseApi<Data> {
    message: string
    data?: Data
}
