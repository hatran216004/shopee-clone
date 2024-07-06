import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import purchaseApi from 'src/api/purchases.api'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchases'
import { formatCurrency, generateNameId } from 'src/utils/utils'

const Cart = () => {
    const { data: PurChasesData } = useQuery({
        queryKey: ['purchases', { status: purchasesStatus.inCart }],
        queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
    })

    const purchaseInCart = PurChasesData?.data.data
    return (
        <div className='bg-[#f5f5f5] pt-6'>
            <div className='container'>
                <div className='bg-white rounded-sm shadow-sm'>
                    <div className='px-9 py-[18px] flex items-center justify-between text-sm text-[#888]'>
                        <div className='flex items-center gap-3'>
                            <input type='checkbox' className='w-5 h-5 accent-orange' />
                            <span className='text-black'>Sản Phẩm</span>
                        </div>
                        <div className='grid-cols-5 items-center gap-14 capitalize hidden lg:grid'>
                            <span className='col-span-2 text-center'>Đơn Giá</span>
                            <span className='col-span-1 text-center'>Số Lượng</span>
                            <span className='col-span-1 text-center ml-8'>Số Tiền</span>
                            <span className='col-span-1 text-center'>Thao Tác</span>
                        </div>
                    </div>
                </div>
                <div>
                    {purchaseInCart?.map((purchase, index) => {
                        return (
                            <div
                                className={classNames('px-9 py-5 bg-white rounded-sm shadow-sm', {
                                    'mt-4': index !== 0,
                                    'mt-6': index === 0
                                })}
                                key={purchase._id}
                            >
                                <div className='grid grid-cols-12 items-center justify-between gap-y-3'>
                                    <Link
                                        to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                                        className='col-span-12 lg:col-span-6 flex items-center gap-3'
                                    >
                                        <input type='checkbox' className='w-5 h-5 accent-orange' />
                                        <img
                                            src={purchase.product.image}
                                            alt={purchase.product.name}
                                            className='w-[80px] h-[80px] object-contain border-[1px] border-slate-400'
                                        />
                                        <p className='line-clamp-2 w-[208px] text-sm'>{purchase.product.name}</p>
                                    </Link>
                                    <div className='col-span-12 lg:col-span-6 grid grid-cols-5 items-center gap-y-3'>
                                        <div className='col-span-5 md:col-span-2 flex items-center justify-start gap-2 text-sm'>
                                            <div className='flex items-center line-through text-slate-400'>
                                                <span className='text-xs'>đ</span>
                                                {formatCurrency(purchase.price)}
                                            </div>
                                            <div className='flex items-center'>
                                                <span className='text-xs'>đ</span>
                                                {formatCurrency(purchase.price_before_discount)}
                                            </div>
                                        </div>
                                        <div className='col-span-5 md:col-span-1 flex items-center justify-end -ml-4 md:-ml-0'>
                                            <QuantityController
                                                max={purchase.product.quantity}
                                                value={purchase.buy_count}
                                            />
                                        </div>
                                        <div className='col-span-5 md:col-span-1 flex items-center justify-end text-orange text-sm'>
                                            <span className='text-xs'>đ</span>
                                            {formatCurrency(purchase.price_before_discount * purchase.buy_count)}
                                        </div>
                                        <button className=' col-span-5 md:col-span-1 text-sm hover:text-orange text-right'>
                                            Xóa
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='mt-6 px-9 py-6 bg-white rounded-sm shadow-sm sticky bottom-0 left-0'>
                    <div className='grid grid-cols-12 items-center justify-between'>
                        <div className='col-span-12 md:col-span-6 flex items-center justify-between md:justify-start gap-3 cursor-pointer'>
                            <div className='flex items-center gap-3'>
                                <input type='checkbox' className='w-5 h-5 accent-orange' />
                                <span className='text-black text-[16px] capitalize'>
                                    chọn tất cả ({purchaseInCart?.length})
                                </span>
                            </div>
                            <button className='col-span-1 text-[16px] hover:text-orange text-end'>Xóa</button>
                        </div>
                        <div className='col-span-12 md:col-span-6 flex items-center flex-col md:flex-row gap-2 justify-end gap-y-3'>
                            <div className='md:mt-0 mt-3 md:text-right text-left w-full'>
                                Tổng thanh toán (0 Sản phẩm):
                            </div>
                            <span className='text-orange text-lg text-right md:w-fit w-full'>đ0</span>
                            <Button className='ml-4 bg-orange border-[1px] border-orange rounded h-12 text-white flex items-center justify-center hover:opacity-80 capitalize min-w-[220px]'>
                                mua hàng
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
