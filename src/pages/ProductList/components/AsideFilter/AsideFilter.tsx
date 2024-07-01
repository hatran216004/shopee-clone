import Button from 'src/components/Button'
import InputNumber from 'src/components/InputNumber'
import { Category } from 'src/types/category.type'
import { type QueryConfig } from 'src/hooks/useQueryConfig'
import path from 'src/constants/path'
import { Schema, schema } from 'src/utils/rules'
import { type NoUndefinedField } from 'src/types/utils.type'
import FilterRatingStar from '../FilterRatingStar'

import classNames from 'classnames'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'

interface Props {
    categories: Category[]
    queryConfig: QueryConfig
}

/*
    rule validate
    + Nếu có price_min và price_max => price_max >= price_min
    + Nếu chỉ có price_min thì k có price_max và ngc lại
*/
type formData = NoUndefinedField<Pick<Schema, 'price_min' | 'price_max'>>
const priceSchema = schema.pick(['price_min', 'price_max'])

const AsideFilter = ({ categories, queryConfig }: Props) => {
    const { category } = queryConfig
    const navigate = useNavigate()
    const {
        control,
        handleSubmit,
        trigger, // kích hoạt validate form khi cần
        formState: { errors }
    } = useForm<formData>({
        defaultValues: {
            price_min: '',
            price_max: ''
        },
        resolver: yupResolver(priceSchema),
        shouldFocusError: false
    })
    const onSubmit = handleSubmit((data) => {
        navigate({
            pathname: path.home,
            search: createSearchParams({
                ...queryConfig,
                price_max: data.price_max,
                price_min: data.price_min
            }).toString()
        })
    })

    const handleRemoveAll = () => {
        navigate({
            pathname: path.home,
            search: createSearchParams(
                omit(queryConfig, ['rating_filter', 'category', 'price_min', 'price_max'])
            ).toString()
        })
    }

    return (
        <aside className='py-4'>
            <Link to={path.home} className='pb-3 flex items-center'>
                <svg
                    viewBox='0 0 12 10'
                    className={classNames('mr-3 size-3', {
                        'fill-orange': !category
                    })}
                >
                    <g stroke='none'>
                        <g transform='translate(-373 -208)'>
                            <g transform='translate(155 191)'>
                                <g transform='translate(218 17)'>
                                    <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                                    <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                                    <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
                <p
                    className={classNames('text-[1rem] font-semibold', {
                        'text-orange': !category
                    })}
                >
                    Tất cả Danh mục
                </p>
            </Link>
            <div className='border-b-[1px] border-[#0000000d]'></div>
            <ul className='my-3'>
                {categories.map((categoryItem) => {
                    const isActive = categoryItem._id === category
                    return (
                        <li className='py-2 px-3' key={categoryItem._id}>
                            <Link
                                to={{
                                    pathname: path.home,
                                    search: createSearchParams({
                                        ...queryConfig,
                                        category: categoryItem._id
                                    }).toString()
                                }}
                                className={classNames('text-sm font-semibold relative', {
                                    'text-orange': isActive,
                                    'text-slate-700': !isActive
                                })}
                            >
                                {categoryItem.name}
                                {isActive && (
                                    <svg
                                        viewBox='0 0 4 7'
                                        className='fill-orange size-2 absolute -left-3 top-2/4 -translate-y-2/4'
                                    >
                                        <polygon points='4 3.5 0 0 0 7'></polygon>
                                    </svg>
                                )}
                            </Link>
                        </li>
                    )
                })}
            </ul>
            <Link to='' className='py-4 flex items-center font-semibold uppercase'>
                <svg viewBox='0 0 15 15' x='0' y='0' className='size-3 mr-3 stroke-current'>
                    <g>
                        <polyline
                            fill='none'
                            points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeMiterlimit='10'
                        ></polyline>
                    </g>
                </svg>
                BỘ LỌC TÌM KIẾM
            </Link>
            <div className='border-b-[1px] border-[#0000000d]'></div>
            <div className='my-5'>
                <div className='text-[#000000de]'>Khoảng giá</div>
                <form className='mt-4' onSubmit={onSubmit}>
                    <div className='flex items-center'>
                        <Controller
                            control={control}
                            name='price_min'
                            render={({ field }) => {
                                return (
                                    <InputNumber
                                        type='text'
                                        placeholder='đ TỪ'
                                        classNameError='hidden'
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(e)
                                            trigger('price_max')
                                        }}
                                    />
                                )
                            }}
                        />
                        <div className='mx-2 border-b-[1px] border-gray-400 h-1 w-12'></div>
                        <Controller
                            control={control}
                            name='price_max'
                            render={({ field }) => {
                                return (
                                    <InputNumber
                                        type='text'
                                        placeholder='đ ĐẾN'
                                        classNameError='hidden'
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(e)
                                            trigger('price_min')
                                        }}
                                    />
                                )
                            }}
                        />
                    </div>
                    <div className='mt-1 text-sm text-red-500 text-nowrap text-center min-h-5'>
                        {errors.price_min?.message}
                    </div>
                    <Button className='mt-1 w-full py-1 uppercase bg-orange text-white hover:opacity-90 select-none'>
                        áp dụng
                    </Button>
                </form>
            </div>
            <div className='border-b-[1px] border-[#0000000d]'></div>
            <div className='my-5'>
                <div className='text-[#000000de] capitalize'>Đánh Giá</div>
                <FilterRatingStar queryConfig={queryConfig} />
            </div>
            <div className='border-b-[1px] border-[#0000000d]'></div>
            <Button
                className='mt-4 w-full py-1 uppercase bg-orange text-white hover:opacity-90 select-none'
                onClick={handleRemoveAll}
            >
                xóa tất cả
            </Button>
        </aside>
    )
}

export default AsideFilter
