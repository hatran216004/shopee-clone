import { InputHTMLAttributes, forwardRef } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    errorMessage?: string
    classNameInput?: string
    classNameError?: string
}

const InputNumber = forwardRef<HTMLInputElement, Props>(function InputNumberInner(
    {
        classNameInput = 'p-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
        classNameError = 'mt-2 text-red-600 text-sm min-h-[1.3rem]',
        errorMessage,
        className,
        onChange,
        ...rest
    },
    ref
) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if ((/^\d+$/.test(value) || value === '') && onChange) {
            onChange(e)
        }
    }
    return (
        <div className={className}>
            <input className={classNameInput} {...rest} onChange={handleChange} ref={ref} />
            <div className={classNameError}>{errorMessage}</div>
        </div>
    )
})

export default InputNumber
