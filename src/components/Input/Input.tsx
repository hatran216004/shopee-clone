import { InputHTMLAttributes } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    errorMessage?: string
    classNameInput?: string
    classNameError?: string
    rules?: RegisterOptions
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register?: UseFormRegister<any>
}

const Input = ({
    classNameInput = 'p-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    classNameError = 'mt-2 text-red-600 text-sm min-h-[1.3rem]',
    errorMessage,
    name,
    rules,
    className,
    register,
    ...rest
}: Props) => {
    const registerResult = register && name ? register(name, rules) : null
    return (
        <div className={className}>
            <input className={classNameInput} {...registerResult} {...rest} />
            <div className={classNameError}>{errorMessage}</div>
        </div>
    )
}

export default Input
