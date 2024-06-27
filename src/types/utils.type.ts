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

/*
    [P in keyof T]: lặp qua từng thuộc tính P trong các key của T
    -?: loại bỏ undefined của key optional 
    NonNullable<T[P]>: đảm bảo rằng T[P] không thể là null hoặc undefined
    => NoUndefinedField<T> loại bỏ undefined từ tất cả các trường (P) trong một kiểu T cho trc
    
    vd: type ExampleType = {
        a?: string;
        b: {
            c?: number;
            d: string | undefined;
    }
    -- TransformedType sẽ trở thành:
        {
            a: string;
            b: {
                c: number;
                d: string;
            };
        }
    }
*/
export type NoUndefinedField<T> = {
    [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
