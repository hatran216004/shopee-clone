import { Purchase, PurchaseListStatus } from 'src/types/purchase.api'
import { SuccessResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'purchases'

const purchaseApi = {
    getPurchases: (params: { status: PurchaseListStatus }) => {
        return http.get<SuccessResponseApi<Purchase[]>>(URL, {
            params
        })
    },
    addToCart: (body: { productId: string; buyCound: number }) => {
        return http.post<SuccessResponseApi<Purchase>>(`${URL}/add-to-cart`, body)
    }
}

export default purchaseApi
