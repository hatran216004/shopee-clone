import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { Category } from 'src/types/category.type'
import { QueryConfig } from '../ProductList'
import path from 'src/constants/path'

import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'

interface Props {
    categories: Category[]
    queryConfig: QueryConfig
}

const AsideFilter = ({ categories, queryConfig }: Props) => {
    const { category } = queryConfig

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
                <form className='mt-4'>
                    <div className='flex items-center'>
                        <Input type='text' name='from' placeholder='đ TỪ' classNameError='' />
                        <div className='mx-2 border-b-[1px] border-gray-400 h-1 w-12'></div>
                        <Input type='text' name='to' placeholder='đ ĐẾN' classNameError='' />
                    </div>
                    <Button className='mt-4 w-full py-1 uppercase bg-orange text-white hover:opacity-90 select-none'>
                        áp dụng
                    </Button>
                </form>
            </div>
            <div className='border-b-[1px] border-[#0000000d]'></div>
            <div className='my-5'>
                <div className='text-[#000000de] capitalize'>Đánh Giá</div>
                <ul className='mt-3'>
                    <li>
                        <Link to='' className='flex items-center gap-2'>
                            {Array(5)
                                .fill(0)
                                .map((_, index) => {
                                    return (
                                        <svg key={index} viewBox='0 0 9.5 8' className='size-4'>
                                            <defs>
                                                <linearGradient
                                                    id='ratingStarGradient'
                                                    x1='50%'
                                                    x2='50%'
                                                    y1='0%'
                                                    y2='100%'
                                                >
                                                    <stop offset='0' stopColor='#ffca11'></stop>
                                                    <stop offset='1' stopColor='#ffad27'></stop>
                                                </linearGradient>
                                                <polygon
                                                    id='ratingStar'
                                                    points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                                                ></polygon>
                                            </defs>
                                            <g
                                                fill='url(#ratingStarGradient)'
                                                fillRule='evenodd'
                                                stroke='none'
                                                strokeWidth='1'
                                            >
                                                <g transform='translate(-876 -1270)'>
                                                    <g transform='translate(155 992)'>
                                                        <g transform='translate(600 29)'>
                                                            <g transform='translate(10 239)'>
                                                                <g transform='translate(101 10)'>
                                                                    <use
                                                                        stroke='#ffa727'
                                                                        strokeWidth='.5'
                                                                        xlinkHref='#ratingStar'
                                                                    ></use>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                    )
                                })}
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='border-b-[1px] border-[#0000000d]'></div>
            <Button className='mt-4 w-full py-1 uppercase bg-orange text-white hover:opacity-90 select-none'>
                xóa tất cả
            </Button>
        </aside>
    )
}

export default AsideFilter
