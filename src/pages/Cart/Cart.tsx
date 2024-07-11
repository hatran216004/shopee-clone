import { useMutation, useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { produce } from 'immer'
import { keyBy } from 'lodash'
import { useContext, useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import purchaseApi from 'src/api/purchases.api'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchases'
import { AppContext } from 'src/context/app.context'
import { Purchase } from 'src/types/purchase.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'

const Cart = () => {
    const { extendedPurchases, setExtendedPurchases } = useContext(AppContext)
    const { data: PurChasesData, refetch } = useQuery({
        queryKey: ['purchases', { status: purchasesStatus.inCart }],
        queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
    })

    const updatePurchaseMutation = useMutation({
        mutationFn: purchaseApi.updatePurchase,
        onSuccess: () => {
            refetch()
        }
    })

    const deletePruchaseMutation = useMutation({
        mutationFn: purchaseApi.deletePurchases,
        onSuccess: (data) => {
            toast.success(data.data.message)
            refetch()
        }
    })

    const buyPruchaseMutation = useMutation({
        mutationFn: purchaseApi.buyProducts,
        onSuccess: (data) => {
            toast.success(data.data.message)
            refetch()
        }
    })

    const location = useLocation()
    const purchaseIdFromLocation = (location.state as { purchaseId: string } | null)?.purchaseId
    const purchaseInCart = PurChasesData?.data.data
    const isAllChecked = useMemo(() => extendedPurchases.every((item) => item.checked), [extendedPurchases])
    const purchasesChecked = useMemo(() => extendedPurchases.filter((item) => item.checked), [extendedPurchases])
    const purchasesCheckedLength = purchasesChecked.length
    const totalCheckedPurchasePrice = useMemo(
        () => purchasesChecked.reduce((result, curr) => result + curr.buy_count * curr.price, 0),
        [purchasesChecked]
    )

    useEffect(() => {
        setExtendedPurchases((prev) => {
            // keyBy: convert array to object
            const extendedPurchasesObject = keyBy(prev, '_id')
            return (
                purchaseInCart?.map((purchase) => {
                    const isPurchaseIdFromLocation = purchaseIdFromLocation === purchase._id
                    return {
                        ...purchase,
                        disabled: false,
                        checked: isPurchaseIdFromLocation || Boolean(extendedPurchasesObject[purchase._id]?.checked)
                    }
                }) || []
            )
        })
    }, [purchaseInCart, purchaseIdFromLocation, setExtendedPurchases])

    useEffect(() => {
        return () => {
            history.replaceState(null, '')
        }
    }, [])

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        setExtendedPurchases(
            produce((draft) => {
                draft[index].checked = e.target.checked
            })
        )
    }

    const handleCheckAll = () => {
        setExtendedPurchases((prev) =>
            prev.map((purchase) => {
                return { ...purchase, checked: !isAllChecked }
            })
        )
    }

    const handleQuantity = (index: number, value: number, enabled: boolean) => {
        if (enabled) {
            const purchase = extendedPurchases[index]
            setExtendedPurchases(
                produce((draft) => {
                    draft[index].disabled = true
                })
            )
            updatePurchaseMutation.mutate({
                product_id: purchase.product._id,
                buy_count: value
            })
        }
    }

    const handleTypeQuantity = (index: number) => {
        return (value: number) => {
            setExtendedPurchases(
                produce((draft) => {
                    draft[index].buy_count = value
                })
            )
        }
    }

    const handleDeletePurchase = (index: number) => {
        const purchase = extendedPurchases[index]
        deletePruchaseMutation.mutate([purchase._id])
    }

    const handleDeletePurchases = () => {
        const purchaseIds = purchasesChecked.map((purchase) => purchase._id)
        deletePruchaseMutation.mutate(purchaseIds)
    }

    const handleBuyProducts = () => {
        if (purchasesChecked.length > 0) {
            const body = purchasesChecked.map((purchase) => ({
                product_id: purchase.product._id,
                buy_count: purchase.buy_count
            }))
            buyPruchaseMutation.mutate(body)
        }
    }

    return (
        <>
            {extendedPurchases.length > 0 ? (
                <div className='bg-[#f5f5f5] pt-6'>
                    <div className='container'>
                        <div className='bg-white rounded-sm shadow-sm'>
                            <div className='px-9 py-[18px] flex items-center justify-between text-sm text-[#888]'>
                                <div className='flex items-center gap-3'>
                                    <input
                                        type='checkbox'
                                        className='w-5 h-5 accent-orange cursor-pointer'
                                        checked={isAllChecked}
                                        onChange={handleCheckAll}
                                    />
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
                            {extendedPurchases.map((purchase, index) => {
                                return (
                                    <div
                                        className={classNames('px-9 py-5 bg-white rounded-sm shadow-sm', {
                                            'mt-4': index !== 0,
                                            'mt-6': index === 0
                                        })}
                                        key={purchase._id}
                                    >
                                        <div className='grid grid-cols-12 items-center justify-between gap-y-3'>
                                            <div className='col-span-12 lg:col-span-6 flex items-center gap-3'>
                                                <input
                                                    type='checkbox'
                                                    className='w-5 h-5 accent-orange'
                                                    checked={purchase.checked}
                                                    onChange={(e) => handleCheck(e, index)}
                                                />
                                                <Link
                                                    to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                                                    className='flex items-start gap-3'
                                                >
                                                    <img
                                                        src={purchase.product.image}
                                                        alt={purchase.product.name}
                                                        className='w-[80px] h-[80px] object-contain border-[1px] border-slate-400'
                                                    />
                                                    <p className='line-clamp-2 w-[208px] text-sm'>
                                                        {purchase.product.name}
                                                    </p>
                                                </Link>
                                            </div>
                                            <div className='col-span-12 lg:col-span-6 grid grid-cols-5 items-center gap-y-3'>
                                                <div className='col-span-5 md:col-span-2 flex items-center justify-start gap-2 text-sm'>
                                                    <div className='flex items-center line-through text-slate-400'>
                                                        <span className='text-xs'>đ</span>
                                                        {formatCurrency(purchase.price_before_discount)}
                                                    </div>
                                                    <div className='flex items-center'>
                                                        <span className='text-xs'>đ</span>
                                                        {formatCurrency(purchase.price)}
                                                    </div>
                                                </div>
                                                <div className='col-span-5 md:col-span-1 flex items-center justify-end -ml-4 md:-ml-0'>
                                                    <QuantityController
                                                        max={purchase.product.quantity}
                                                        value={purchase.buy_count}
                                                        onIncrease={(value) =>
                                                            handleQuantity(
                                                                index,
                                                                value,
                                                                value < purchase.product.quantity
                                                            )
                                                        }
                                                        onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                                                        onType={handleTypeQuantity(index)}
                                                        onFocusOut={(value) =>
                                                            handleQuantity(
                                                                index,
                                                                value,
                                                                value >= 1 &&
                                                                    value < purchase.product.quantity &&
                                                                    value !==
                                                                        (purchaseInCart as Purchase[])[index].buy_count
                                                            )
                                                        }
                                                        disabled={purchase.disabled}
                                                    />
                                                </div>
                                                <div className='col-span-5 md:col-span-1 flex items-center justify-end text-orange text-sm'>
                                                    <span className='text-xs'>đ</span>
                                                    {formatCurrency(purchase.price * purchase.buy_count)}
                                                </div>
                                                <button
                                                    className=' col-span-5 md:col-span-1 text-sm hover:text-orange text-right'
                                                    onClick={() => handleDeletePurchase(index)}
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='mt-6 px-9 py-6 bg-white rounded-sm shadow-md sticky bottom-0 left-0 border-gray-200 border-[1px]'>
                            <div className='grid grid-cols-12 items-center justify-between'>
                                <div className='col-span-12 md:col-span-6 flex items-center justify-between md:justify-start gap-3 cursor-pointer'>
                                    <div className='flex items-center gap-3'>
                                        <input
                                            type='checkbox'
                                            className='w-5 h-5 accent-orange'
                                            id='check-all'
                                            checked={isAllChecked}
                                            onChange={handleCheckAll}
                                        />
                                        <label
                                            htmlFor='check-all'
                                            className='text-black text-[16px] capitalize select-none cursor-pointer'
                                        >
                                            chọn tất cả ({purchaseInCart?.length})
                                        </label>
                                    </div>
                                    <button
                                        className='col-span-1 text-[16px] hover:text-orange text-end'
                                        onClick={handleDeletePurchases}
                                    >
                                        Xóa
                                    </button>
                                </div>
                                <div className='col-span-12 md:col-span-6 flex items-center flex-col md:flex-row gap-2 justify-end gap-y-3'>
                                    <div className='md:mt-0 mt-3 md:text-right text-left w-full'>
                                        Tổng thanh toán ({purchasesCheckedLength} Sản phẩm):
                                    </div>
                                    <span className='text-orange text-lg text-right md:w-fit w-full'>
                                        đ{formatCurrency(totalCheckedPurchasePrice)}
                                    </span>
                                    <Button
                                        disabled={purchasesCheckedLength === 0 || buyPruchaseMutation.isLoading}
                                        className='ml-4 bg-orange border-[1px] border-orange rounded h-12 text-white flex items-center justify-center hover:opacity-80 capitalize min-w-[220px]'
                                        onClick={handleBuyProducts}
                                    >
                                        mua hàng
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='bg-[#f5f5f5] pt-8 min-h-[290px] flex items-center justify-center flex-col'>
                    <img
                        className='w-[100px] h-[100px] object-cover mx-auto'
                        src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/c44984f18d2d2211.png'
                        alt=''
                    />
                    <p className='mt-3 text-center text-base text-gray-400 font-normal'>Giỏ hàng của bạn còn trống</p>
                    <Link
                        to={path.home}
                        className='mt-3 px-10 capitalize text-white bg-orange h-[40px]  flex items-center hover:opacity-80'
                    >
                        mua ngay
                    </Link>
                </div>
            )}
        </>
    )
}

export default Cart
