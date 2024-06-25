import { Link } from 'react-router-dom'
import ProductRating from 'src/components/ProductRating'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils'
interface Props {
    product: ProductType
}

const Product = ({ product }: Props) => {
    return (
        <Link
            to='/'
            className='block h-full bg-white rounded-b shadow-sm relative hover:-translate-y-1 hover:shadow-md
                transition-all duration-[0.2s]'
        >
            <figure className='relative pt-[100%] select-none'>
                <img
                    src={product.image}
                    alt={product.name}
                    className='w-full h-full object-contain absolute top-0 left-0'
                />
            </figure>
            <div className='p-3 rounded-b'>
                <h3 className='text-[#000000de] text-sm line-clamp-2'>{product.name}</h3>
                <div className='mt-3 flex items-center gap-2'>
                    <div className='text-orange flex items-center'>
                        <span className='underline text-xs'>đ</span>
                        {formatCurrency(product.price)}
                    </div>
                    <div className='flex items-center line-through text-gray-400 line-clamp-1'>
                        <span className='underline text-xs'>đ</span>
                        <span>{formatCurrency(product.price_before_discount)}</span>
                    </div>
                </div>
                <div className='mt-3 flex items-center'>
                    <div className='flex gap-1 items-center'>
                        <ProductRating rating={product.rating} />
                    </div>
                    <span className='ml-2 text-[#000000de] text-sm'>
                        Đã bán {formatNumberToSocialStyle(product.sold)}
                    </span>
                </div>
            </div>
            <div className='bg-orange rounded-tr-sm rounded-br-sm px-1 absolute top-2 -left-1 text-xs text-white'>
                Yêu thích
                <span className='absolute left-[3px] top-full border-t-transparent border-l-red-500 border-r-transparent border-[2px] border-b-transparent -rotate-45'></span>
            </div>
        </Link>
    )
}

export default Product
