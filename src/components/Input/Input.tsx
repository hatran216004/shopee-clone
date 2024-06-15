import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props {
    type: React.HTMLInputTypeAttribute
    placeholder?: string
    errorMessage?: string
    className?: string
    name: string
    rules?: RegisterOptions
    autoComplete?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>
}

const Input = ({ type, placeholder, errorMessage, name, rules, autoComplete, register }: Props) => {
    return (
        <div className='mt-2'>
            <input
                autoComplete={autoComplete}
                placeholder={placeholder}
                type={type}
                className='p-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                {...register(name, rules)}
            />
            <div className='mt-2 text-red-600 text-sm min-h-[1.3rem]'>{errorMessage}</div>
        </div>
    )
}

export default Input
