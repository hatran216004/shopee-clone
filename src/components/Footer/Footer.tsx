const Footer = () => {
    return (
        <footer className="py-16 bg-neutral-100 text-textFooter">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-1">
                        <div className="text-sm text-textFooter text-center">
                            © 2024 Shopee. Tất cả các quyền được bảo lưu.
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="text-sm text-textFooter text-center">
                            Quốc gia & Khu vực:
                            <span className="px-1 border-r-2 border-slate-300">Singapore</span>
                            <span className="px-1 border-r-2 border-slate-300">Indonesia</span>
                            <span className="px-1 border-r-2 border-slate-300">Thái Lan</span>
                            <span className="px-1 border-r-2 border-slate-300">Malaysia</span>
                            <span className="px-1 border-r-2 border-slate-300">Philippines</span>
                            <span className="px-1 border-r-2 border-slate-300">Brazil</span>
                            <span className="px-1 border-r-2 border-slate-300">México</span>
                            <span className="px-1 border-r-2 border-slate-300">Colombia</span>
                            <span className="px-1 border-r-2 border-slate-300">Chile</span>
                            <span className="px-1 border-r-2 border-slate-300">Chile</span>
                            <span className="px-1 border-r-2 border-slate-300">Đài Loan</span>
                        </div>
                    </div>
                </div>
                <div className="text-center text-sm mt-10">
                    <div className="mb-8 text-xs">Công ty TNHH Shopee</div>
                    <div className="mt-2 text-xs">
                        Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba
                        Đình, Thành phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
                    </div>
                    <div className="mt-2 text-xs">Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Bùi Anh Tuấn</div>
                    <div className="mt-2 text-xs">
                        Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015
                    </div>
                    <div className="mt-2 text-xs">© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
