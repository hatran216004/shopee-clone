import { useState } from 'react'
import InputNumber, { InputNumberProps } from '../InputNumber'

interface Props extends InputNumberProps {
    max?: number
    onIncrease?: (value: number) => void
    onDecrease?: (value: number) => void
    onType?: (value: number) => void
    classNameWrapper?: string
}

const QuantityController = ({
    max,
    onIncrease,
    onDecrease,
    classNameWrapper = 'ml-4',
    value,
    onType,
    ...rest
}: Props) => {
    const [localValue, setLocalValue] = useState<number>(Number(value || 1))

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let _value = +e.target.value
        if (max !== undefined && _value > max) {
            _value = max
        } else if (_value < 1) {
            _value = 1
        }
        onType && onType(_value)
        setLocalValue(_value)
    }

    const increase = () => {
        let _value = Number(value || localValue) + 1
        if (max !== undefined && _value > max) {
            _value = max
        }
        onIncrease && onIncrease(_value)
        setLocalValue(_value)
    }

    const decrease = () => {
        let _value = Number(value || localValue) - 1
        if (_value < 1) {
            _value = 1
        }
        onDecrease && onDecrease(_value)
        setLocalValue(_value)
    }

    return (
        <div className={'flex items-center h-[32px] ' + classNameWrapper}>
            <button className='px-2 h-full border-gray-200 border-2 rounded-tl-sm rounded-bl-sm' onClick={decrease}>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-3'
                >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
                </svg>
            </button>
            <InputNumber
                value={value || localValue}
                className='w-14 h-full px-1 border-t-2 border-b-2 border-gray-200'
                classNameError='hidden'
                classNameInput='h-full w-full outline-none text-center'
                onChange={handleChange}
                {...rest}
            />
            <button className='px-2 h-full border-gray-200 border-2 rounded-tr-sm rounded-br-sm' onClick={increase}>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-3'
                >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                </svg>
            </button>
        </div>
    )
}

export default QuantityController
