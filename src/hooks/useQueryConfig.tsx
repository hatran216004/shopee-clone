import useQueryParams from './useQueryParams'
import { ProductListConfig } from 'src/types/product.type'
import { omitBy, isUndefined } from 'lodash'

export type QueryConfig = {
    [key in keyof ProductListConfig]: string
}
const useQueryConfig = () => {
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
    return queryConfig
}

export default useQueryConfig
