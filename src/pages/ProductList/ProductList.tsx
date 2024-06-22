import AsideFilter from './AsideFilter'
import Product from './Product'
import SortProductList from './SortProductList'

const ProductList = () => {
    return (
        <div className='bg-[#f5f5f5] py-6 border-b-[3px] border-orange'>
            <div className='container'>
                <div className='grid grid-cols-12'>
                    <div className='col-span-2 mr-7'>
                        <AsideFilter />
                    </div>
                    <div className='col-span-10'>
                        <SortProductList />
                        <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-3'>
                            {Array(30)
                                .fill(0)
                                .map((_, index) => {
                                    return (
                                        <div className='col-span-1' key={index}>
                                            <Product />
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList
