const avatr = 'https://nguyencongpc.vn/media/product/250-27134-gigabyte-z890-aorus-master-1.jpg';

function Cart() {
    return (
        <div className="absolute right-0 -mt-2 hidden w-[400px] animate-fade-up rounded-lg border bg-white p-3 shadow animate-duration-500 group-hover:block">
            <ul className="h-[300px] overflow-y-auto pr-2">
                <li className="flex gap-4 border-b border-gray-300 py-2">
                    <img src={avatr} alt="" className="size-[70px] rounded-lg object-cover object-center" />
                    <div>
                        <p className="line-clamp-2 text-xs font-semibold text-textColor1">
                            BỘ PC GAMING I5 12400F / RAM 16G / VGA RTX 3070 8G{' '}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                            <p className="text-sm font-semibold text-black">x 1</p>
                            <p className="font-semibold text-redColor">19.000.000đ</p>
                        </div>
                    </div>
                </li>
                <li className="flex gap-4 border-b border-gray-300 py-2">
                    <img src={avatr} alt="" className="size-[70px] rounded-lg object-cover object-center" />
                    <div>
                        <p className="line-clamp-2 text-xs font-semibold text-textColor1">
                            BỘ PC GAMING I5 12400F / RAM 16G / VGA RTX 3070 8G{' '}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                            <p className="text-sm font-semibold text-black">x 1</p>
                            <p className="font-semibold text-redColor">19.000.000đ</p>
                        </div>
                    </div>
                </li>
                <li className="flex gap-4 border-b border-gray-300 py-2">
                    <img src={avatr} alt="" className="size-[70px] rounded-lg object-cover object-center" />
                    <div>
                        <p className="line-clamp-2 text-xs font-semibold text-textColor1">
                            BỘ PC GAMING I5 12400F / RAM 16G / VGA RTX 3070 8G{' '}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                            <p className="text-sm font-semibold text-black">x 1</p>
                            <p className="font-semibold text-redColor">19.000.000đ</p>
                        </div>
                    </div>
                </li>
                <li className="flex gap-4 border-b border-gray-300 py-2">
                    <img src={avatr} alt="" className="size-[70px] rounded-lg object-cover object-center" />
                    <div>
                        <p className="line-clamp-2 text-xs font-semibold text-textColor1">
                            BỘ PC GAMING I5 12400F / RAM 16G / VGA RTX 3070 8G{' '}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                            <p className="text-sm font-semibold text-black">x 1</p>
                            <p className="font-semibold text-redColor">19.000.000đ</p>
                        </div>
                    </div>
                </li>
            </ul>

            <div className="border-t border-gray-300 pb-2 pt-4">
                <div className="flex items-center justify-center gap-2">
                    <p className="text-sm">Tổng tiền hàng</p>
                    <p className="text-sm text-redColor">(4 sản phẩm)</p>
                    <p className="font-semibold text-redColor">72.000.000đ</p>
                </div>

                <a
                    href="/checkout"
                    className="mx-4 mt-6 block rounded-lg bg-primary from-primary to-second px-5 py-2.5 text-center text-white hover:bg-gradient-to-tr"
                >
                    Thanh toán
                </a>
            </div>
        </div>
    );
}

export default Cart;
