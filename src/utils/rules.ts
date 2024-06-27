import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

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
            message: 'Độ dài 6 - 160 ký tự'
        },
        maxLength: {
            value: 160,
            message: 'Độ dài 6 - 160 ký tự'
        }
    },
    confirm_password: {
        required: {
            value: true,
            message: 'Trường này là bắt buộc'
        },
        minLength: {
            value: 6,
            message: 'Độ dài 6 - 160 ký tự'
        },
        maxLength: {
            value: 160,
            message: 'Độ dài 6 - 160 ký tự'
        },
        validate:
            typeof getValues === 'function'
                ? (value) => value === getValues('password') || 'Nhập lại mật khẩu không khớp'
                : undefined
    }
})

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
    const { price_min, price_max } = this.parent
    if (price_min !== '' && price_max !== '') {
        return Number(price_max) >= Number(price_min)
    }
    return price_min !== '' || price_max !== '' // một trong 2 price_min || price_max được nhập => true
}

export const schema = yup.object({
    email: yup
        .string()
        .required('Trường này là bắt buộc')
        .email('Email không hợp lệ')
        .min(5, 'Độ dài 5 - 160 ký tự')
        .max(160, 'Độ dài 5 - 160 ký tự'),
    password: yup
        .string()
        .required('Trường này là bắt buộc')
        .min(6, 'Độ dài 6 - 160 ký tự')
        .max(160, 'Độ dài 6 - 160 ký tự'),
    confirm_password: yup
        .string()
        .required('Trường này là bắt buộc')
        .min(6, 'Độ dài 6 - 160 ký tự')
        .max(160, 'Độ dài 6 - 160 ký tự')
        .oneOf([yup.ref('password')], 'Nhập lại mật khẩu không khớp'),
    price_min: yup.string().ensure().test({
        name: 'price-not-allowed', // tên cho rule,
        message: 'Giá không phù hợp',
        test: testPriceMinMax
    }),
    price_max: yup.string().ensure().test({
        name: 'price-not-allowed', // tên cho rule,
        message: 'Giá không phù hợp',
        test: testPriceMinMax
    })
})

export type Schema = yup.InferType<typeof schema>

// export const loginSchema = schema.pick(['email', 'password'])
// export type LoginSchema = yup.InferType<typeof loginSchema>
