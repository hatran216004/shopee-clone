import classNames from 'classnames'

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
    currentPage: number
    pageSize: number
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const RANGE = 2 // phạm vi các trang xung quanh trang hiện tại
const Pagitation = ({ currentPage, pageSize, setCurrentPage }: Props) => {
    const renderPagination = () => {
        let dotAfter = false // theo dõi ... đã được thêm vào sau các trang chưa
        let dotBefore = false // theo dõi ... đã được thêm vào trước các trang chưa

        const renderDotBefore = (index: number) => {
            if (!dotBefore) {
                dotBefore = true
                return (
                    <button
                        key={index}
                        className='h-full px-4 flex items-end rounded-sm text-[#939393] select-none cursor-text'
                    >
                        ...
                    </button>
                )
            }
            return null
        }

        const renderDotAfter = (index: number) => {
            if (!dotAfter) {
                dotAfter = true
                return (
                    <button
                        key={index}
                        className='h-full px-4 flex items-end rounded-sm text-[#939393] select-none cursor-text'
                    >
                        ...
                    </button>
                )
            }
            return null
        }

        return Array(pageSize)
            .fill(0)
            .map((_, index) => {
                const pageNumber = index + 1
                // TH1: currentPage thuộc 1 - 5 && vd: pageNumber = 7 > currentPage = 4 + RANGE = 2 && pageNumber < 19 (20 - 2 + 1)
                if (
                    currentPage <= RANGE * 2 + 1 &&
                    pageNumber > currentPage + RANGE &&
                    pageNumber < pageSize - RANGE + 1
                ) {
                    return renderDotAfter(index)
                } else if (currentPage > RANGE * 2 + 1 && currentPage < pageSize - RANGE * 2) {
                    if (pageNumber < currentPage - RANGE && pageNumber > RANGE) {
                        return renderDotBefore(index)
                    } else if (pageNumber > currentPage + RANGE && pageNumber < pageSize - RANGE + 1) {
                        return renderDotAfter(index)
                    }
                } else if (
                    currentPage >= pageSize - RANGE * 2 &&
                    pageNumber > RANGE &&
                    pageNumber < currentPage - RANGE
                ) {
                    return renderDotBefore(index)
                }

                return (
                    <button
                        onClick={() => setCurrentPage(pageNumber)}
                        key={index}
                        className={classNames('h-full px-4 flex items-center rounded-sm select-none', {
                            'bg-orange': pageNumber === currentPage,
                            'bg-white': pageNumber !== currentPage,
                            'text-[#939393]': pageNumber !== currentPage,
                            'text-white': pageNumber === currentPage
                        })}
                    >
                        {pageNumber}
                    </button>
                )
            })
    }

    const handleClick = (type: string) => {
        return () => {
            if (type === 'prev') {
                if (currentPage > 1) {
                    setCurrentPage((prev) => prev - 1)
                }
            }
            if (type === 'next') {
                if (currentPage < pageSize) {
                    setCurrentPage((prev) => prev + 1)
                    console.log(currentPage)
                }
            }
        }
    }
    return (
        <div className='mt-8 flex items-center justify-center h-[30px] gap-3'>
            <button
                className={classNames('h-full px-4 flex items-center', {
                    'cursor-not-allowed': currentPage === 1
                })}
                onClick={handleClick('prev')}
            >
                <svg enableBackground='new 0 0 11 11' viewBox='0 0 11 11' x='0' y='0' className='fill-[#939393] size-3'>
                    <g>
                        <path d='m8.5 11c-.1 0-.2 0-.3-.1l-6-5c-.1-.1-.2-.3-.2-.4s.1-.3.2-.4l6-5c .2-.2.5-.1.7.1s.1.5-.1.7l-5.5 4.6 5.5 4.6c.2.2.2.5.1.7-.1.1-.3.2-.4.2z'></path>
                    </g>
                </svg>
            </button>
            {renderPagination()}
            <button
                className={classNames('h-full px-4 flex items-center', {
                    'cursor-not-allowed': currentPage === pageSize
                })}
                onClick={handleClick('next')}
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
            </button>
        </div>
    )
}

export default Pagitation
