// <Data>: interface SuccessResponseApi có thể sử dụng với nhiều loại dữ liệu khác nhau
// mà không cần phải định nghĩa lại nhiều lần
export interface SuccessResponseApi<Data> {
    message: string
    data: Data
}

export interface ErrorResponseApi<Data> {
    message: string
    data?: Data
}
