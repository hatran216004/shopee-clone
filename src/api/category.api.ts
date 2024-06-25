import { Category } from 'src/types/category.type'
import { SuccessResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'categories'
const categoryApi = {
    // response.data sẽ có kiểu <SuccessResponseApi<Category[]>
    getCategory: () => http.get<SuccessResponseApi<Category[]>>(URL)
}
export default categoryApi
