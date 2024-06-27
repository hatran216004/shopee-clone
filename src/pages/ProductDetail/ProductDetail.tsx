import productApi from 'src/api/product.api'
import ProductRating from 'src/components/ProductRating'
import { formatCurrency, formatNumberToSocialStyle, rateSale } from 'src/utils/utils'
import InputNumber from 'src/components/InputNumber'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import DOMPurify from 'dompurify'

const ProductDetail = () => {
    const { id } = useParams()
    const { data: productDetailData } = useQuery({
        queryKey: ['productDetail', id],
        queryFn: () => productApi.getProductDetail(id as string)
    })
    const product = productDetailData?.data.data
    return (
        <div className='bg-[#f5f5f5] py-8'>
            <div className='container'>
                {product && (
                    <>
                        <section className='bg-white p-4 rounded-sm shadow-sm'>
                            <div className='grid grid-cols-12 gap-7 items-start'>
                                <div className=' col-span-12 lg:col-span-5'>
                                    <figure className='pt-[100%] relative w-full'>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className='absolute top-0 left-0 w-full h-full object-contain'
                                        />
                                    </figure>
                                    <div className='mt-4 relative grid grid-cols-5 items-center gap-3'>
                                        {product.images.slice(0, 5).map((img, index) => {
                                            const isActive = index === 0
                                            return (
                                                <figure key={index} className='relative pt-[100%] cursor-pointer'>
                                                    <img
                                                        src={img}
                                                        alt=''
                                                        className='absolute top-0 left-0 w-full h-full object-cover'
                                                    />
                                                    {isActive && (
                                                        <div className='absolute inset-0 bg-transparent border-orange border-2 rounded-sm'></div>
                                                    )}
                                                </figure>
                                            )
                                        })}
                                        <button className='absolute left-0 top-1/2 -translate-y-1/2 bg-black/20 h-8 w-5 flex items-center justify-center hover:opacity-90'>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='none'
                                                viewBox='0 0 24 24'
                                                strokeWidth={1.5}
                                                stroke='white'
                                                className='size-4'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    d='M15.75 19.5 8.25 12l7.5-7.5'
                                                />
                                            </svg>
                                        </button>
                                        <button className='absolute right-0 top-1/2 -translate-y-1/2 bg-black/20 h-8 w-5 flex items-center justify-center hover:opacity-90'>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='none'
                                                viewBox='0 0 24 24'
                                                strokeWidth={1.5}
                                                stroke='white'
                                                className='size-4 rotate-180'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    d='M15.75 19.5 8.25 12l7.5-7.5'
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className='col-span-12 lg:col-span-7'>
                                    <div>
                                        <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
                                        <div className='mt-7 flex items-center'>
                                            <div className='flex items-center gap-3'>
                                                <span className='text-orange text-lg border-b-2 border-orange'>
                                                    {product.rating}
                                                </span>
                                                <div className='flex items-center'>
                                                    <ProductRating
                                                        rating={product.rating}
                                                        activeClassname='size-4 fill-orange'
                                                        noneActiveClassname='size-4 fill-gray-300'
                                                    />
                                                </div>
                                                <div className='mx-3 bg-gray-600/30 w-[1px] h-7'></div>
                                                <div className='flex items-center'>
                                                    <span className='text-lg text-black mr-2'>
                                                        {formatNumberToSocialStyle(product.quantity)}
                                                    </span>
                                                    <span className='text-sm text-black/60'>Đã bán</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='mt-7 flex items-center p-4 bg-[#f5f5f5]'>
                                            <span className='flex items-center text-gray-500 text-xl line-through'>
                                                <span className='text-xs mr-1 underline'>đ</span>
                                                {product.price_before_discount}
                                            </span>
                                            <span className='ml-4 flex items-center text-orange text-3xl'>
                                                <span className='text-lg underline'>đ</span>
                                                {formatCurrency(product.price)}
                                            </span>
                                            <div className='px-2 bg-orange uppercase ml-3 text-white text-sm'>
                                                {rateSale(product.price_before_discount, product.price)}
                                                giảm
                                            </div>
                                        </div>
                                        <div className='mt-7 flex items-center'>
                                            <div className='text-gray-500 text-md mr-3 capitalize'>số lượng</div>
                                            <div className='flex items-center ml-4 h-[32px]'>
                                                <button className='px-2 h-full border-gray-200 border-2 rounded-tl-sm rounded-bl-sm'>
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        fill='none'
                                                        viewBox='0 0 24 24'
                                                        strokeWidth={1.5}
                                                        stroke='currentColor'
                                                        className='size-3'
                                                    >
                                                        <path
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                            d='M5 12h14'
                                                        />
                                                    </svg>
                                                </button>
                                                <InputNumber
                                                    value={1}
                                                    className='w-14 h-full px-1 border-t-2 border-b-2 border-gray-200'
                                                    classNameError='hidden'
                                                    classNameInput='h-full w-full outline-none text-center'
                                                />
                                                <button className='px-2 h-full border-gray-200 border-2 rounded-tr-sm rounded-br-sm'>
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        fill='none'
                                                        viewBox='0 0 24 24'
                                                        strokeWidth={1.5}
                                                        stroke='currentColor'
                                                        className='size-3'
                                                    >
                                                        <path
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                            d='M12 4.5v15m7.5-7.5h-15'
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className='ml-6 text-sm text-gray-500'>
                                                {product.quantity} sản phẩm có sẵn
                                            </div>
                                        </div>
                                        <div className='mt-8 flex items-center'>
                                            <button className='bg-[#ffeee8] border-[1px] border-orange rounded h-12 px-5 text-orange flex items-center hover:opacity-80'>
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    fill='none'
                                                    viewBox='0 0 24 24'
                                                    strokeWidth={1.5}
                                                    stroke='currentColor'
                                                    className='size-4 mr-3'
                                                >
                                                    <path
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                                                    />
                                                </svg>
                                                Thêm vào giỏ hàng
                                            </button>
                                            <button className='ml-4 bg-orange border-[1px] border-orange rounded h-12 text-white flex items-center justify-center hover:opacity-80 capitalize min-w-[180px]'>
                                                mua ngay
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className='mt-8 bg-white p-4 rounded-sm shadow-sm'>
                            <div className='rounded bg-gray-50 p-4 text-lg uppercase text-slate-700'>
                                mô tả sản phẩm
                            </div>
                            <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(product.description)
                                    }}
                                />
                            </div>
                        </section>
                    </>
                )}
            </div>
        </div>
    )
}

export default ProductDetail
