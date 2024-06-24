const SortProductList = () => {
    return (
        <div className='bg-[rgb(237,237,237)] py-3 px-5'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <p className='text-sm text-gray-500'>Sắp xếp theo</p>
                    <button className='bg-orange h-[34px] px-3 text-white text-sm capitalize hover:opacity-80'>
                        Phổ biến
                    </button>
                    <button className='bg-white h-[34px] px-3 text-sm capitalize hover:opacity-80 shadow-sm'>
                        Mới nhất
                    </button>
                    <button className='bg-white h-[34px] px-3 text-sm capitalize hover:opacity-80 shadow-sm'>
                        Bán chạy
                    </button>
                    <button className='w-[200px] bg-white h-[34px] px-3 text-sm capitalize cursor-pointer relative flex items-center justify-between group shadow-sm'>
                        <span>Giá</span>
                        <svg viewBox='0 0 7 11' className='size-2.5 fill-[#cccccc] -rotate-90'>
                            <path
                                d='M4.694078 9.8185598L.2870824 5.4331785c-.1957415-.1947815-.1965198-.511363-.0017382-.7071046a.50867033.50867033 0 0 1 .000868-.0008702L4.7381375.2732784 4.73885.273991c.1411545-.127878.3284279-.205779.5338961-.205779.4393237 0 .7954659.3561422.7954659.7954659 0 .2054682-.077901.3927416-.205779.5338961l.0006632.0006632-.0226101.0226101a.80174653.80174653 0 0 1-.0105706.0105706L2.4680138 4.7933195c-.1562097.1562097-.1562097.4094757 0 .5656855a.45579485.45579485 0 0 0 .0006962.0006944l3.3930018 3.3763607-.0009482.0009529c.128869.1413647.2074484.3293723.2074484.5357331 0 .4393237-.3561422.7954659-.7954659.7954659-.2049545 0-.391805-.077512-.5328365-.2048207l-.0003877.0003896-.0097205-.0096728a.80042023.80042023 0 0 1-.0357234-.0355483z'
                                fillRule='nonzero'
                            ></path>
                        </svg>
                        <div className='absolute w-full top-full left-0'>
                            <div className='p-3 bg-white text-left hover:text-orange group-hover-display-block'>
                                Giá: thấp đến cao
                            </div>
                            <div className='p-3 bg-white text-left hover:text-orange group-hover-display-block'>
                                Giá: cao đến thấp
                            </div>
                        </div>
                    </button>
                </div>
                <div className='flex items-center gap-3'>
                    <div>
                        <span className='text-orange text-sm'>1</span>
                        <span className=' text-sm'>/9</span>
                    </div>
                    <div className='h-[34px] flex items-center'>
                        <button className='cursor-not-allowed rounded-sm h-full px-3 flex items-center justify-center bg-white border-[1px] border-[#00000017]'>
                            <svg viewBox='0 0 7 11' className='size-2.5 fill-[#cccccc]'>
                                <path
                                    d='M4.694078 9.8185598L.2870824 5.4331785c-.1957415-.1947815-.1965198-.511363-.0017382-.7071046a.50867033.50867033 0 0 1 .000868-.0008702L4.7381375.2732784 4.73885.273991c.1411545-.127878.3284279-.205779.5338961-.205779.4393237 0 .7954659.3561422.7954659.7954659 0 .2054682-.077901.3927416-.205779.5338961l.0006632.0006632-.0226101.0226101a.80174653.80174653 0 0 1-.0105706.0105706L2.4680138 4.7933195c-.1562097.1562097-.1562097.4094757 0 .5656855a.45579485.45579485 0 0 0 .0006962.0006944l3.3930018 3.3763607-.0009482.0009529c.128869.1413647.2074484.3293723.2074484.5357331 0 .4393237-.3561422.7954659-.7954659.7954659-.2049545 0-.391805-.077512-.5328365-.2048207l-.0003877.0003896-.0097205-.0096728a.80042023.80042023 0 0 1-.0357234-.0355483z'
                                    fillRule='nonzero'
                                ></path>
                            </svg>
                        </button>
                        <button className='rounded-sm h-full px-3 flex items-center justify-center cursor-pointer border-[1px] border-[#00000017]'>
                            <svg viewBox='0 0 7 11' className='size-2.5 rotate-180'>
                                <path
                                    d='M4.694078 9.8185598L.2870824 5.4331785c-.1957415-.1947815-.1965198-.511363-.0017382-.7071046a.50867033.50867033 0 0 1 .000868-.0008702L4.7381375.2732784 4.73885.273991c.1411545-.127878.3284279-.205779.5338961-.205779.4393237 0 .7954659.3561422.7954659.7954659 0 .2054682-.077901.3927416-.205779.5338961l.0006632.0006632-.0226101.0226101a.80174653.80174653 0 0 1-.0105706.0105706L2.4680138 4.7933195c-.1562097.1562097-.1562097.4094757 0 .5656855a.45579485.45579485 0 0 0 .0006962.0006944l3.3930018 3.3763607-.0009482.0009529c.128869.1413647.2074484.3293723.2074484.5357331 0 .4393237-.3561422.7954659-.7954659.7954659-.2049545 0-.391805-.077512-.5328365-.2048207l-.0003877.0003896-.0097205-.0096728a.80042023.80042023 0 0 1-.0357234-.0355483z'
                                    fillRule='nonzero'
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SortProductList
