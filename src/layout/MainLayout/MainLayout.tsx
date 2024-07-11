import Footer from 'src/components/Footer'
import Header from 'src/components/Header'

interface Props {
    children?: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
    return (
        <div className='bg-[#f5f5f5]'>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default MainLayout
