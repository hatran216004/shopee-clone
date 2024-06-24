import { useQuery } from '@tanstack/react-query'
import AsideFilter from './AsideFilter'
import Product from './Product'
import SortProductList from './SortProductList'
import productApi from 'src/api/product.api'
import useQueryParams from 'src/hooks/useQueryParams'

const LIMIT = 30
const ProductList = () => {
    const queryParams = useQueryParams()

    const { data } = useQuery({
        queryKey: ['products', queryParams], // gọi lại queryFn khi queryParams thay đổi
        queryFn: () => {
            return productApi.getProducts(queryParams)
        }
    })
    console.log(data)
    return (
        <div className='bg-[#f5f5f5] py-6 border-b-[3px] border-orange'>
            <div className='container'>
                <div className='grid grid-cols-12'>
                    <div className='col-span-2 mr-7'>
                        <AsideFilter />
                    </div>
                    <div className='col-span-10'>
                        <SortProductList />
                        <div className='mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2'>
                            {Array(LIMIT)
                                .fill(0)
                                .map((_, index) => {
                                    return <Product key={index} />
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList
