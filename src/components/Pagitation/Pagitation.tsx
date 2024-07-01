import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import path from 'src/constants/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'

/*
    - Với range = 2 áp dụng cho khoảng cách đầu, cuối và xung quanh current_page
    TH1:
    [1] 2 3 ... 19 20
    1 [2] 3 4 ... 19 20
    1 2 [3] 4 5 ... 19 20
    1 2 3 [4] 5 6 ... 19 20
    1 2 3 4 [5] 6 7 ... 19 20
    
    TH2:
    1 2 ... 4 5 [6] 7 8 ... 19 20
    1 2 ... 13 14 [15] 16 17 ... 19 20
    
    TH3:
    1 2 ... 14 15 [16] 17 18 19 20
    1 2 ... 16 17 [18] 19 20
    1 2 ... 7 18 [19] 20
    1 2 ... 18 19 [20]
*/

interface Props {
    queryConfig: QueryConfig
    pageSize: number
}

const RANGE = 2 // phạm vi các trang xung quanh trang hiện tại
const Pagitation = ({ queryConfig, pageSize }: Props) => {
    const currentPage = Number(queryConfig.page)

    const renderPagination = () => {
        let dotAfter = false // theo dõi ... đã được thêm vào sau các trang chưa
        let dotBefore = false // theo dõi ... đã được thêm vào trước các trang chưa

        const renderDotBefore = (index: number) => {
            if (!dotBefore) {
                dotBefore = true
                return (
                    <span
                        key={index}
                        className='h-full px-4 flex items-end rounded-sm text-[#939393] select-none cursor-text'
                    >
                        ...
                    </span>
                )
            }
            return null
        }

        const renderDotAfter = (index: number) => {
            if (!dotAfter) {
                dotAfter = true
                return (
                    <span
                        key={index}
                        className='h-full px-4 flex items-end rounded-sm text-[#939393] select-none cursor-text'
                    >
                        ...
                    </span>
                )
            }
            return null
        }

        return Array(pageSize)
            .fill(0)
            .map((_, index) => {
                const pageNumber = index + 1
                // TH1: currentPage thuộc 1 - 5 && (currentPage + 2 < pageNumber(...) < 19)
                if (
                    currentPage <= RANGE * 2 + 1 &&
                    pageNumber > currentPage + RANGE &&
                    pageNumber < pageSize - RANGE + 1
                ) {
                    return renderDotAfter(index)
                } // TH2
                // 5 < currentPage < 16: kt currentPage thỏa TH2
                else if (currentPage > RANGE * 2 + 1 && currentPage < pageSize - RANGE * 2) {
                    // (2 < pageNumber(...) < currentPage - RANGE): hiển thị 2 page đầu và 2 page trước currentPage
                    if (pageNumber < currentPage - RANGE && pageNumber > RANGE) {
                        return renderDotBefore(index)
                    } // (currentPage + 2 < pageNumber(...) < 19): hiển thị 2 page cuối và 2 page sau currentPage
                    else if (pageNumber > currentPage + RANGE && pageNumber < pageSize - RANGE + 1) {
                        return renderDotAfter(index)
                    }
                } // TH3 currentPage >= 16 && (2 < pageNumber(...) < currentPage - 2)
                else if (
                    currentPage >= pageSize - RANGE * 2 &&
                    pageNumber < currentPage - RANGE &&
                    pageNumber > RANGE
                ) {
                    return renderDotBefore(index)
                }

                return (
                    <Link
                        to={{
                            pathname: path.home,
                            search: createSearchParams({
                                ...queryConfig,
                                page: pageNumber.toString()
                            }).toString()
                        }}
                        key={index}
                        className={classNames('h-full px-4 flex items-center rounded-sm select-none', {
                            'bg-orange': pageNumber === currentPage,
                            'bg-white': pageNumber !== currentPage,
                            'text-[#939393]': pageNumber !== currentPage,
                            'text-white': pageNumber === currentPage
                        })}
                    >
                        {pageNumber}
                    </Link>
                )
            })
    }
    return (
        <div className='mt-8 flex items-center justify-center h-[30px] gap-3'>
            {currentPage > 1 ? (
                <Link
                    to={{
                        pathname: path.home,
                        search: createSearchParams({
                            ...queryConfig,
                            page: (currentPage - 1).toString()
                        }).toString()
                    }}
                    className='h-full px-4 flex items-center'
                >
                    <svg
                        enableBackground='new 0 0 11 11'
                        viewBox='0 0 11 11'
                        x='0'
                        y='0'
                        className='fill-[#939393] size-3'
                    >
                        <g>
                            <path d='m8.5 11c-.1 0-.2 0-.3-.1l-6-5c-.1-.1-.2-.3-.2-.4s.1-.3.2-.4l6-5c .2-.2.5-.1.7.1s.1.5-.1.7l-5.5 4.6 5.5 4.6c.2.2.2.5.1.7-.1.1-.3.2-.4.2z'></path>
                        </g>
                    </svg>
                </Link>
            ) : (
                <span className='h-full px-4 flex items-center cursor-not-allowed'>
                    <svg
                        enableBackground='new 0 0 11 11'
                        viewBox='0 0 11 11'
                        x='0'
                        y='0'
                        className='fill-[#939393]/40 size-3'
                    >
                        <g>
                            <path d='m8.5 11c-.1 0-.2 0-.3-.1l-6-5c-.1-.1-.2-.3-.2-.4s.1-.3.2-.4l6-5c .2-.2.5-.1.7.1s.1.5-.1.7l-5.5 4.6 5.5 4.6c.2.2.2.5.1.7-.1.1-.3.2-.4.2z'></path>
                        </g>
                    </svg>
                </span>
            )}
            {renderPagination()}
            {currentPage < pageSize ? (
                <Link
                    to={{
                        pathname: path.home,
                        search: createSearchParams({
                            ...queryConfig,
                            page: (currentPage + 1).toString()
                        }).toString()
                    }}
                    className='h-full px-4 flex items-center'
                >
                    <svg
                        enableBackground='new 0 0 11 11'
                        viewBox='0 0 11 11'
                        x='0'
                        y='0'
                        className='fill-[#939393] size-3 rotate-180'
                    >
                        <g>
                            <path d='m8.5 11c-.1 0-.2 0-.3-.1l-6-5c-.1-.1-.2-.3-.2-.4s.1-.3.2-.4l6-5c .2-.2.5-.1.7.1s.1.5-.1.7l-5.5 4.6 5.5 4.6c.2.2.2.5.1.7-.1.1-.3.2-.4.2z'></path>
                        </g>
                    </svg>
                </Link>
            ) : (
                <span className='h-full px-4 flex items-center cursor-not-allowed'>
                    <svg
                        enableBackground='new 0 0 11 11'
                        viewBox='0 0 11 11'
                        x='0'
                        y='0'
                        className='fill-[#939393]/40 size-3 rotate-180'
                    >
                        <g>
                            <path d='m8.5 11c-.1 0-.2 0-.3-.1l-6-5c-.1-.1-.2-.3-.2-.4s.1-.3.2-.4l6-5c .2-.2.5-.1.7.1s.1.5-.1.7l-5.5 4.6 5.5 4.6c.2.2.2.5.1.7-.1.1-.3.2-.4.2z'></path>
                        </g>
                    </svg>
                </span>
            )}
        </div>
    )
}

export default Pagitation
