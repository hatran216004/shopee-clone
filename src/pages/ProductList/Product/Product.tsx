import { Link } from 'react-router-dom'

const Product = () => {
    return (
        <div className='col-span-1'>
            <Link
                to='/'
                className='block h-full bg-white rounded-b shadow-sm hover:-translate-y-1 hover:shadow-md
                transition-all duration-[0.2s] overflow-hidden'
            >
                <figure className='relative pt-[100%]'>
                    <img
                        src='https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-ljdypb0bv4k2e8_tn'
                        alt=''
                        className='w-full h-full object-contain absolute top-0 left-0'
                    />
                </figure>
                <div className='p-3'>
                    <h3 className='text-[#000000de] text-sm line-clamp-2'>
                        Áo sơ mi nam Basic chất kaki cao cấp cực đẹp
                    </h3>
                    <div className='mt-3 flex items-center gap-1'>
                        <span className='text-orange'>99.000đ</span>
                        <span className='line-through text-gray-400 line-clamp-1'>210.000đ</span>
                    </div>
                    <div className='mt-3 flex items-center'>
                        <div className='flex gap-1 items-center'>
                            {Array(5)
                                .fill(0)
                                .map((_, index) => {
                                    return (
                                        <div key={index} className='relative'>
                                            <svg
                                                enableBackground='new 0 0 15 15'
                                                viewBox='0 0 15 15'
                                                x='0'
                                                y='0'
                                                className='size-2.5 fill-gray-300'
                                            >
                                                <polygon
                                                    points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeMiterlimit='10'
                                                ></polygon>
                                            </svg>
                                            <div className='absolute top-0 left-0 overflow-hidden w-[50%]'>
                                                <svg
                                                    enableBackground='new 0 0 15 15'
                                                    viewBox='0 0 15 15'
                                                    x='0'
                                                    y='0'
                                                    className='size-2.5 fill-yellow-400'
                                                >
                                                    <polygon
                                                        points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        strokeMiterlimit='10'
                                                    ></polygon>
                                                </svg>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                        <span className='ml-2 text-[#000000de] text-sm'>Đã bán 24,3k</span>
                    </div>
                    <div className='capitalize mt-3 text-left text-[#000000de] text-sm opacity-60 line-clamp-1'>
                        Hà nội
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Product
