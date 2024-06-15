import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'

type Rules = {
    // index signature có thể có bất kỳ số lượng thuộc tính nào với các tên thuộc tính thuộc 'email' | 'password'
    // và giá trị của các thuộc tính này sẽ có kiểu RegisterOptions
    [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
    email: {
        required: {
            value: true,
            message: 'Trường này là bắt buộc'
        },
        pattern: {
            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            message: 'Email không đúng định dạng'
        },
        minLength: {
            value: 5,
            message: 'Email tối thiểu 5 ký tự'
        },
        maxLength: {
            value: 160,
            message: 'Email tối đa 160 ký tự'
        }
    },
    password: {
        required: {
            value: true,
            message: 'Trường này là bắt buộc'
        },
        minLength: {
            value: 6,
            message: 'Độ dai 6 - 160 ký tự'
        },
        maxLength: {
            value: 160,
            message: 'Độ dai 6 - 160 ký tự'
        }
    },
    confirm_password: {
        required: {
            value: true,
            message: 'Trường này là bắt buộc'
        },
        minLength: {
            value: 6,
            message: 'Độ dai 6 - 160 ký tự'
        },
        maxLength: {
            value: 160,
            message: 'Độ dai 6 - 160 ký tự'
        },
        validate:
            typeof getValues === 'function'
                ? (value) => value === getValues('password') || 'Nhập lại mật khẩu không khớp'
                : undefined
    }
})
