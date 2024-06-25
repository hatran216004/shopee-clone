import classNames from 'classnames'
import { sortBy, order as orderConstant } from 'src/constants/product'
import { QueryConfig } from '../ProductList'
import { ProductListConfig } from 'src/types/product.type'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { omit } from 'lodash'

interface Props {
    queryConfig: QueryConfig
    pageSize: number
}
const SortProductList = ({ pageSize, queryConfig }: Props) => {
    const { sort_by = sortBy.createdAt, order } = queryConfig
    const currentPage = Number(queryConfig.page)
    const navigate = useNavigate()
    // Exclude<ProductListConfig['sort_by'], undefined>: tạo ra một kiểu mới, loại bỏ undefined.
    const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
        return sort_by === sortByValue
    }

    const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
        navigate({
            pathname: path.home,
            search: createSearchParams(
                omit(
                    {
                        ...queryConfig,
                        sort_by: sortByValue
                    },
                    ['order']
                )
            ).toString()
        })
    }

    const handlePriceOrder = (value: Exclude<ProductListConfig['order'], undefined>) => {
        navigate({
            pathname: path.home,
            search: createSearchParams({
                ...queryConfig,
                sort_by: sortBy.price, // sort theo giá
                order: value // sắp xếp theo asc / desc
            }).toString()
        })
    }

    return (
        <div className='bg-[rgb(237,237,237)] py-3 px-5'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <p className='text-sm text-gray-500'>Sắp xếp theo</p>
                    <button
                        onClick={() => handleSort(sortBy.view)}
                        className={classNames('h-[34px] px-3 text-sm capitalize hover:opacity-80 shadow-sm', {
                            'bg-orange text-white': isActiveSortBy(sortBy.view),
                            'bg-white': !isActiveSortBy(sortBy.view)
                        })}
                    >
                        Phổ biến
                    </button>
                    <button
                        onClick={() => handleSort(sortBy.createdAt)}
                        className={classNames('h-[34px] px-3 text-sm capitalize hover:opacity-80 shadow-sm', {
                            'bg-orange text-white': isActiveSortBy(sortBy.createdAt),
                            'bg-white': !isActiveSortBy(sortBy.createdAt)
                        })}
                    >
                        Mới nhất
                    </button>
                    <button
                        onClick={() => handleSort(sortBy.sold)}
                        className={classNames('h-[34px] px-3 text-sm capitalize hover:opacity-80 shadow-sm', {
                            'bg-orange text-white': isActiveSortBy(sortBy.sold),
                            'bg-white': !isActiveSortBy(sortBy.sold)
                        })}
                    >
                        Bán chạy
                    </button>
                    <select
                        value={order || ''}
                        onChange={(e) =>
                            handlePriceOrder(e.target.value as Exclude<ProductListConfig['order'], undefined>)
                        }
                        className={classNames(
                            'w-[200px] h-[34px] px-3 text-sm capitalize cursor-pointer relative flex items-center justify-between shadow-sm outline-none',
                            {
                                'bg-orange text-white': isActiveSortBy(sortBy.price),
                                'bg-white': !isActiveSortBy(sortBy.price)
                            }
                        )}
                    >
                        <option value='' disabled className='bg-white text-black'>
                            Giá
                        </option>
                        <option value={orderConstant.asc} className='bg-white text-black'>
                            Giá: thấp đến cao
                        </option>
                        <option value={orderConstant.desc} className='bg-white text-black'>
                            Giá: cao đến thấp
                        </option>
                    </select>
                </div>
                <div className='flex items-center gap-3'>
                    <div>
                        <span className='text-orange text-sm'>{currentPage}</span>
                        <span className=' text-sm'>/{pageSize}</span>
                    </div>
                    <div className='h-[34px] flex items-center'>
                        {currentPage === 1 ? (
                            <span className='cursor-not-allowed rounded-sm h-full px-3 flex items-center justify-center bg-white border-[1px] border-[#00000017]'>
                                <svg viewBox='0 0 7 11' className='size-2.5 fill-[#cccccc]'>
                                    <path
                                        d='M4.694078 9.8185598L.2870824 5.4331785c-.1957415-.1947815-.1965198-.511363-.0017382-.7071046a.50867033.50867033 0 0 1 .000868-.0008702L4.7381375.2732784 4.73885.273991c.1411545-.127878.3284279-.205779.5338961-.205779.4393237 0 .7954659.3561422.7954659.7954659 0 .2054682-.077901.3927416-.205779.5338961l.0006632.0006632-.0226101.0226101a.80174653.80174653 0 0 1-.0105706.0105706L2.4680138 4.7933195c-.1562097.1562097-.1562097.4094757 0 .5656855a.45579485.45579485 0 0 0 .0006962.0006944l3.3930018 3.3763607-.0009482.0009529c.128869.1413647.2074484.3293723.2074484.5357331 0 .4393237-.3561422.7954659-.7954659.7954659-.2049545 0-.391805-.077512-.5328365-.2048207l-.0003877.0003896-.0097205-.0096728a.80042023.80042023 0 0 1-.0357234-.0355483z'
                                        fillRule='nonzero'
                                    ></path>
                                </svg>
                            </span>
                        ) : (
                            <Link
                                to={{
                                    pathname: path.home,
                                    search: createSearchParams({
                                        ...queryConfig,
                                        page: (currentPage - 1).toString()
                                    }).toString()
                                }}
                                className='bg-white rounded-sm h-full px-3 flex items-center justify-cente border-[1px] border-[#00000017]'
                            >
                                <svg viewBox='0 0 7 11' className='size-2.5'>
                                    <path
                                        d='M4.694078 9.8185598L.2870824 5.4331785c-.1957415-.1947815-.1965198-.511363-.0017382-.7071046a.50867033.50867033 0 0 1 .000868-.0008702L4.7381375.2732784 4.73885.273991c.1411545-.127878.3284279-.205779.5338961-.205779.4393237 0 .7954659.3561422.7954659.7954659 0 .2054682-.077901.3927416-.205779.5338961l.0006632.0006632-.0226101.0226101a.80174653.80174653 0 0 1-.0105706.0105706L2.4680138 4.7933195c-.1562097.1562097-.1562097.4094757 0 .5656855a.45579485.45579485 0 0 0 .0006962.0006944l3.3930018 3.3763607-.0009482.0009529c.128869.1413647.2074484.3293723.2074484.5357331 0 .4393237-.3561422.7954659-.7954659.7954659-.2049545 0-.391805-.077512-.5328365-.2048207l-.0003877.0003896-.0097205-.0096728a.80042023.80042023 0 0 1-.0357234-.0355483z'
                                        fillRule='nonzero'
                                    ></path>
                                </svg>
                            </Link>
                        )}
                        {currentPage < pageSize ? (
                            <Link
                                to={{
                                    pathname: path.home,
                                    search: createSearchParams({
                                        ...queryConfig,
                                        page: (currentPage + 1).toString()
                                    }).toString()
                                }}
                                className='bg-white rounded-sm h-full px-3 flex items-center justify-center cursor-pointer border-[1px] border-[#00000017]'
                            >
                                <svg viewBox='0 0 7 11' className='size-2.5 rotate-180'>
                                    <path
                                        d='M4.694078 9.8185598L.2870824 5.4331785c-.1957415-.1947815-.1965198-.511363-.0017382-.7071046a.50867033.50867033 0 0 1 .000868-.0008702L4.7381375.2732784 4.73885.273991c.1411545-.127878.3284279-.205779.5338961-.205779.4393237 0 .7954659.3561422.7954659.7954659 0 .2054682-.077901.3927416-.205779.5338961l.0006632.0006632-.0226101.0226101a.80174653.80174653 0 0 1-.0105706.0105706L2.4680138 4.7933195c-.1562097.1562097-.1562097.4094757 0 .5656855a.45579485.45579485 0 0 0 .0006962.0006944l3.3930018 3.3763607-.0009482.0009529c.128869.1413647.2074484.3293723.2074484.5357331 0 .4393237-.3561422.7954659-.7954659.7954659-.2049545 0-.391805-.077512-.5328365-.2048207l-.0003877.0003896-.0097205-.0096728a.80042023.80042023 0 0 1-.0357234-.0355483z'
                                        fillRule='nonzero'
                                    ></path>
                                </svg>
                            </Link>
                        ) : (
                            <span className='bg-white cursor-not-allowed rounded-sm h-full px-3 flex items-center justify-center border-[1px] border-[#00000017]'>
                                <svg viewBox='0 0 7 11' className='size-2.5 rotate-180 fill-[#cccccc]'>
                                    <path
                                        d='M4.694078 9.8185598L.2870824 5.4331785c-.1957415-.1947815-.1965198-.511363-.0017382-.7071046a.50867033.50867033 0 0 1 .000868-.0008702L4.7381375.2732784 4.73885.273991c.1411545-.127878.3284279-.205779.5338961-.205779.4393237 0 .7954659.3561422.7954659.7954659 0 .2054682-.077901.3927416-.205779.5338961l.0006632.0006632-.0226101.0226101a.80174653.80174653 0 0 1-.0105706.0105706L2.4680138 4.7933195c-.1562097.1562097-.1562097.4094757 0 .5656855a.45579485.45579485 0 0 0 .0006962.0006944l3.3930018 3.3763607-.0009482.0009529c.128869.1413647.2074484.3293723.2074484.5357331 0 .4393237-.3561422.7954659-.7954659.7954659-.2049545 0-.391805-.077512-.5328365-.2048207l-.0003877.0003896-.0097205-.0096728a.80042023.80042023 0 0 1-.0357234-.0355483z'
                                        fillRule='nonzero'
                                    ></path>
                                </svg>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SortProductList
