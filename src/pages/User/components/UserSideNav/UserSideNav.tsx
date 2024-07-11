import { Link } from 'react-router-dom'
import path from 'src/constants/path'

const UserSideNav = () => {
    return (
        <div className='mr-8'>
            <div className='flex items-center border-b-[1px] border-gray-300 pb-4'>
                <Link to={path.profile} className='w-12 h-12 rounded-full block overflow-hidden'>
                    <img
                        src='https://i.pinimg.com/564x/cf/10/97/cf1097d36e5e44e836bbf3f777d2afc3.jpg'
                        alt=''
                        className='w-full h-full object-cover'
                    />
                </Link>
                <div className='pl-4'>
                    <p className='text-[#333] text-sm font-[600] truncate'>@hatran</p>
                    <Link to={path.profile} className='flex items-center'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='size-2 mr-2'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125'
                            />
                        </svg>
                        <span className='text-gray-500 text-sm capitalize'>Sửa hồ sơ</span>
                    </Link>
                </div>
            </div>
            <Link to={path.profile} className='mt-5 flex items-center hover:last:text-orange group/item'>
                <img
                    src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4'
                    alt=''
                    className='w-5 h-5 mr-3'
                />
                <span className='capitalize text-[#000000de] text-sm group-hover/item:text-orange'>
                    Tài khoản của tôi
                </span>
            </Link>
            <Link to={path.changePassword} className='mt-5 flex items-center hover:last:text-orange group/item'>
                <img
                    src='https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078'
                    alt=''
                    className='w-5 h-5 mr-3'
                />
                <span className='capitalize text-[#000000de] text-sm group-hover/item:text-orange'>Đơn mua</span>
            </Link>
            <Link to={path.purchaseHistory} className='mt-5 flex items-center hover:last:text-orange group/item'>
                <img
                    src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4'
                    alt=''
                    className='w-5 h-5 mr-3'
                />
                <span className='capitalize text-[#000000de] text-sm group-hover/item:text-orange'>Đổi mật khẩu</span>
            </Link>
        </div>
    )
}

export default UserSideNav
