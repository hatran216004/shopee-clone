import path from 'src/constants/path'
import Popover from '../Popover'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import authApi from 'src/api/auth.api'
import { purchasesStatus } from 'src/constants/purchases'

const NavHeader = () => {
    const { isAuthenticated, setIsAuthenticated, setUser, user } = useContext(AppContext)
    const queryClient = useQueryClient()
    const logoutMutation = useMutation({
        mutationFn: authApi.logoutAccount,
        onSuccess: () => {
            setIsAuthenticated(false)
            setUser(null)
            queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
        }
    })
    return (
        <div className='flex'>
            <div className='hidden items-center text-slate-100 text-sm lg:flex'>
                <span className='pe-2 border-r-2 border-red-400'>Kênh người bán</span>
                <span className='px-2 border-r-2 border-red-400'>Trở thành Người bán Shopee</span>
                <span className='px-2 border-r-2 border-red-400'>Tải ứng dụng</span>
                <span className='px-2'>Kết nối</span>
            </div>
            <div className='ml-auto flex items-center cursor-pointer gap-4'>
                <Popover
                    className='ps-4 flex items-center text-sm text-slate-100 hover:opacity-90'
                    renderPopover={
                        <div className='bg-white relative shadow-md rounded-sm border-gray-200'>
                            <div className='w-48 flex flex-col items-start text-sm'>
                                <button className='p-3 hover:text-orange w-full text-left'>Tiếng Việt</button>
                                <button className='p-3 hover:text-orange w-full text-left'>English</button>
                            </div>
                        </div>
                    }
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='size-5'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
                        />
                    </svg>
                    <span className='ps-1 pe-1'>Tiếng Việt</span>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='size-5'
                    >
                        <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
                    </svg>
                </Popover>
                {isAuthenticated && (
                    <Popover
                        className='flex items-center text-sm text-slate-100 gap-2'
                        renderPopover={
                            <div className='bg-white relative shadow-md rounded-sm border-gray-200'>
                                <div className='flex flex-col items-start text-sm'>
                                    <Link
                                        to={path.profile}
                                        className='py-3 px-4 hover:bg-[#fafafa]  hover:text-[#00bfa5] w-full text-left'
                                    >
                                        Tài khoản của tôi
                                    </Link>
                                    <Link
                                        to='#!'
                                        className='py-3 px-4 hover:bg-[#fafafa]  hover:text-[#00bfa5] w-full text-left'
                                    >
                                        Đơn mua
                                    </Link>
                                    <button
                                        onClick={() => logoutMutation.mutate()}
                                        className='py-3 px-4 hover:bg-[#fafafa]  hover:text-[#00bfa5] w-full text-left'
                                    >
                                        Đăng xuất
                                    </button>
                                </div>
                            </div>
                        }
                    >
                        <div className='w-6 h-6 rounded-full'>
                            <img
                                className='w-full h-full object-cover rounded-full'
                                src='https://i.pinimg.com/564x/cf/10/97/cf1097d36e5e44e836bbf3f777d2afc3.jpg'
                                alt=''
                            />
                        </div>
                        <span>{user?.email}</span>
                    </Popover>
                )}
                {!isAuthenticated && (
                    <div className='flex items-center text-sm text-slate-100'>
                        <Link to={path.register} className='pe-2 border-r-2 border-red-400 hover:opacity-90'>
                            Đăng ký
                        </Link>
                        <Link to={path.login} className='ps-2 hover:opacity-90'>
                            Đăng nhập
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default NavHeader
