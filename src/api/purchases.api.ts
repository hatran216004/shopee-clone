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
    addToCart: (body: { product_id: string; buy_count: number }) => {
        return http.post<SuccessResponseApi<Purchase>>(`${URL}/add-to-cart`, body)
    },
    buyProducts: (body: { product_id: string; buy_count: number }[]) => {
        return http.post<SuccessResponseApi<Purchase[]>>(`${URL}/buy-products`, body)
    },
    updatePurchase: (body: { product_id: string; buy_count: number }) => {
        return http.put<SuccessResponseApi<Purchase>>(`${URL}/update-purchase`, body)
    },
    deletePurchases: (purchaseId: string[]) => {
        return http.delete<SuccessResponseApi<{ deleted_count: number }>>(`${URL}/purchases`, {
            data: purchaseId
        })
    }
}

export default purchaseApi
