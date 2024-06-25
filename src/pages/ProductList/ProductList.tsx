import AsideFilter from './AsideFilter'
import Product from './Product'
import SortProductList from './SortProductList'
import productApi from 'src/api/product.api'
import useQueryParams from 'src/hooks/useQueryParams'
import Pagitation from 'src/components/Pagitation'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const ProductList = () => {
    const queryParams = useQueryParams()
    const [currentPage, setCurrentPage] = useState<number>(1)

    const { data } = useQuery({
        queryKey: ['products', queryParams], // gọi lại queryFn khi queryParams thay đổi
        queryFn: () => {
            return productApi.getProducts(queryParams)
        }
    })
    console.log(data)
    return (
        <div className='bg-[#f5f5f5] py-6 border-b-[4px] border-orange'>
            <div className='container'>
                <div className='grid grid-cols-12'>
                    <div className='col-span-2 mr-7'>
                        <AsideFilter />
                    </div>
                    <div className='col-span-10'>
                        <SortProductList />
                        <div className='mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2'>
                            {data &&
                                data.data.data.products.map((product) => {
                                    return (
                                        <div className='col-span-1' key={product._id}>
                                            <Product product={product} />
                                        </div>
                                    )
                                })}
                        </div>
                        <Pagitation currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={20} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList
