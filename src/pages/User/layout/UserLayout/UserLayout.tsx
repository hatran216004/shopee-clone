import { Outlet } from 'react-router-dom'
import UserSideNav from '../../components/UserSideNav'

const UserLayout = () => {
    return (
        <div className='mt-8'>
            <div className='container'>
                <div className='grid grid-cols-12 items-start gap-y-4'>
                    <div className='col-span-12 xl:col-span-2'>
                        <UserSideNav />
                    </div>
                    <div className='col-span-12 xl:col-span-10'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserLayout
