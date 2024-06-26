/**
    rating = 3.4
    1 <= 3.4 => 100%
    2 <= 3.4 => 100%
    3 <= 3.4 => 100%
    4 > 3.4 => 40% (4 - 3.4 < 1) % là số thập phân
    5 > 3.4 => 0% (5 - 3.4 > 1)
 */

interface Props {
    rating: number
    activeClassname?: string
    noneActiveClassname?: string
}

const ProductRating = ({
    rating,
    activeClassname = 'size-2.5 fill-yellow-400',
    noneActiveClassname = 'size-2.5 fill-gray-300'
}: Props) => {
    const handleWidth = (order: number) => {
        if (order <= rating) {
            return '100%'
        }
        if (order > rating && order - rating < 1) {
            return (rating - Math.floor(rating)) * 100 + '%'
        } else return '0%'
    }

    return (
        <>
            {Array(5)
                .fill(0)
                .map((_, index) => {
                    return (
                        <div className='relative' key={index}>
                            <svg
                                enableBackground='new 0 0 15 15'
                                viewBox='0 0 15 15'
                                x='0'
                                y='0'
                                className={noneActiveClassname}
                            >
                                <polygon
                                    points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeMiterlimit='10'
                                ></polygon>
                            </svg>
                            <div
                                className='absolute top-0 left-0 overflow-hidden'
                                style={{ width: handleWidth(index + 1) }}
                            >
                                <svg
                                    enableBackground='new 0 0 15 15'
                                    viewBox='0 0 15 15'
                                    x='0'
                                    y='0'
                                    className={activeClassname}
                                >
                                    <polygon
                                        points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeMiterlimit='10'
                                    ></polygon>
                                </svg>
                            </div>
                        </div>
                    )
                })}
        </>
    )
}

export default ProductRating
