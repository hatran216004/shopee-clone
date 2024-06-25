import AsideFilter from './AsideFilter'
import Product from './Product'
import SortProductList from './SortProductList'
import productApi from 'src/api/product.api'
import useQueryParams from 'src/hooks/useQueryParams'
import Pagitation from 'src/components/Pagitation'
import { ProductListConfig } from 'src/types/product.type'
import categoryApi from 'src/api/category.api'

import { useQuery } from '@tanstack/react-query'
import { omitBy, isUndefined } from 'lodash'

export type QueryConfig = {
    [key in keyof ProductListConfig]: string
}
const ProductList = () => {
    const queryParams: QueryConfig = useQueryParams()
    const queryConfig: QueryConfig = omitBy(
        {
            page: queryParams.page || '1',
            limit: queryParams.limit || '20',
            sort_by: queryParams.sort_by,
            name: queryParams.name,
            exclude: queryParams.exclude,
            order: queryParams.order,
            price_max: queryParams.price_max,
            price_min: queryParams.price_min,
            rating_filter: queryParams.rating_filter,
            category: queryParams.category
        },
        isUndefined
    )
    const { data } = useQuery({
        queryKey: ['products', queryConfig], // gọi lại queryFn khi queryParams thay đổi
        queryFn: () => productApi.getProducts(queryConfig as ProductListConfig),
        keepPreviousData: true
    })

    const categoryQuery = useQuery({
        queryKey: ['categories'],
        queryFn: () => categoryApi.getCategory()
    })

    return (
        <div className='bg-[#f5f5f5] border-b-[4px] border-orange py-6'>
            <div className='container'>
                <div className='grid grid-cols-12'>
                    <div className='col-span-2 mr-7'>
                        <AsideFilter categories={categoryQuery.data?.data.data || []} queryConfig={queryConfig} />
                    </div>
                    <div className='col-span-10'>
                        {data && (
                            <>
                                <SortProductList
                                    queryConfig={queryConfig}
                                    pageSize={data?.data.data.pagination.page_size}
                                />
                                <div className='mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2'>
                                    {data.data.data.products.map((product) => {
                                        return (
                                            <div className='col-span-1' key={product._id}>
                                                <Product product={product} />
                                            </div>
                                        )
                                    })}
                                </div>
                                <Pagitation queryConfig={queryConfig} pageSize={data?.data.data.pagination.page_size} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList
