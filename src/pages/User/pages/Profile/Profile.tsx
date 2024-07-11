const Profile = () => {
    return (
        <div className='pt-[18px] pb-[40px] bg-white rounded-md px-[30px]'>
            <div className='pb-[18px] border-b-[1px] border-gray-300'>
                <p className='text-[#333] text-lg capitalize'>hồ sơ của tôi</p>
                <span className='mt-1 text-[#555] text-sm'>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
            </div>
            <div className='mt-7 flex items-center lg:flex-row flex-col gap-y-6'>
                <form className='lg:pr-[50px] pr-0 w-full'>
                    <div className='flex items-center'>
                        <div className='mr-6 text-[#555555cc] capitalize text-sm w-[162px] max-w-full text-right'>
                            Email
                        </div>
                        <p className='text-[#333]'>ha*********@gmail.com</p>
                    </div>
                    <div className='mt-7 flex items-center'>
                        <div className='mr-6 text-[#555555cc] capitalize text-sm w-[162px] max-w-full text-right'>
                            Tên
                        </div>
                        <div className='h-[41px] px-2 bg-white border-[1px] border-[#00000024] w-[418px] max-w-full'>
                            <input type='text' className='w-full h-full outline-none' />
                        </div>
                    </div>
                    <div className='mt-7 flex items-center'>
                        <div className='mr-6 text-[#555555cc] capitalize text-sm w-[162px] max-w-full text-right'>
                            số điện thoại
                        </div>
                        <div className='h-[41px] px-2 bg-white border-[1px] border-[#00000024] w-[418px] max-w-full'>
                            <input type='text' className='w-full h-full outline-none' />
                        </div>
                    </div>
                    <div className='mt-7 flex items-center'>
                        <div className='mr-6 text-[#555555cc] capitalize text-sm w-[162px] max-w-full text-right'>
                            địa chỉ
                        </div>
                        <div className='h-[41px] px-2 bg-white border-[1px] border-[#00000024] w-[418px] max-w-full'>
                            <input type='text' className='w-full h-full outline-none' />
                        </div>
                    </div>
                    <div className='mt-7 flex items-center'>
                        <div className='mr-6 text-[#555555cc] capitalize text-sm w-[162px] max-w-full text-right'>
                            ngày sinh
                        </div>
                        <div className='grid grid-cols-3 items-center w-[418px] max-w-[100%] gap-4'>
                            <select className='h-[41px] col-span-1 py-1 px-2 border-[1px] border-[#00000024]'>
                                <option disabled>Ngày</option>
                            </select>
                            <select className='h-[41px] col-span-1 py-1 px-2 border-[1px] border-[#00000024]'>
                                <option disabled>Tháng</option>
                            </select>
                            <select className='h-[41px] col-span-1 py-1 px-2 border-[1px] border-[#00000024] '>
                                <option disabled>Năm</option>
                            </select>
                        </div>
                    </div>
                </form>
                <div className='pt-4 w-full h-full lg:border-l-[1px] lg:border-t-transparent border-[#00000024] border-t-[1px] flex items-center justify-center flex-col'>
                    <figure className='w-[100px] h-[100px] rounded-full overflow-hidden'>
                        <img
                            src='https://i.pinimg.com/564x/cf/10/97/cf1097d36e5e44e836bbf3f777d2afc3.jpg'
                            alt=''
                            className='w-full h-full object-cover cursor-pointer'
                        />
                    </figure>
                    <div className='mt-3'>
                        <input type='file' hidden accept='.jpg,.jpeg,.png' />
                        <button className='capitalize h-[40px] px-5 border-[1px] border-[#00000024] text-sm text-[#555] hover:bg-gray-100'>
                            chọn ảnh
                        </button>
                    </div>
                    <div className='mt-3'>
                        <div className='text-[#999] text-sm'>Dụng lượng file tối đa 1 MB</div>
                        <div className='text-[#999] text-sm'>Định dạng:.JPEG, .PNG</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
