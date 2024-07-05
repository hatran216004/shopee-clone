import { InputHTMLAttributes, forwardRef, useState } from 'react'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
    errorMessage?: string
    classNameInput?: string
    classNameError?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
    {
        classNameInput = 'p-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
        classNameError = 'mt-2 text-red-600 text-sm min-h-[1.3rem]',
        errorMessage,
        className,
        onChange,
        value,
        ...rest
    },
    ref
) {
    const [localValue, setLocalValue] = useState<string>(value as string)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        // (/^\d+$/.test(value): kiểm tra value có phải là một chuỗi chỉ chứa các ký tự số hay không
        if (/^\d+$/.test(value) || value === '') {
            onChange && onChange(e)
            setLocalValue(value)
        }
    }
    return (
        <div className={className}>
            <input className={classNameInput} {...rest} onChange={handleChange} ref={ref} value={value || localValue} />
            <div className={classNameError}>{errorMessage}</div>
        </div>
    )
})

export default InputNumber
