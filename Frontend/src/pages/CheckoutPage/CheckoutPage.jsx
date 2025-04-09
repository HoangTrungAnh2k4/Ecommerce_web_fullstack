import { FaPlus, FaMinus } from 'react-icons/fa6';
import { RiDeleteBin6Line } from 'react-icons/ri';

const avatr =
    'https://danhgiaxe.edu.vn/upload/2024/12/bo-suu-tap-hinh-anh-gai-k8-dep-quyen-ru-khien-ban-say-dam-4.webp';

function CheckoutPage() {
    return (
        <div className="mx-auto flex gap-12">
            <div className="w-4/6 rounded-lg border px-6 py-4 shadow-lg">
                <button className="ml-auto block border px-2 py-1 text-sm">Xóa giỏ hàng</button>
                <ul className="mt-4">
                    <li className="flex justify-between border-b-2 border-gray-300 py-6">
                        <img src={avatr} alt="" className="size-[120px] object-cover object-center" />
                        <p className="-ml-6 w-[300px] font-semibold text-textColor2">
                            Nguồn Gaming ASUS TUF 1200W GOLD ATX 3.0 80 PLUS - Full Modular
                        </p>
                        <div className="flex max-w-[8rem]">
                            <button className="h-11 rounded-s-lg border border-gray-300 bg-gray-50 p-3">
                                <FaMinus />
                            </button>
                            <span className="h-11 w-20 border border-x-0 border-gray-300 bg-gray-50 py-2.5 text-center text-sm text-gray-900 outline-none">
                                {' '}
                                0
                            </span>
                            <button className="h-11 rounded-e-lg border border-gray-300 bg-gray-50 p-3">
                                <FaPlus />
                            </button>
                        </div>
                        <div className="flex flex-col items-end justify-between">
                            <p className="font-semibold text-redColor">19.000.000đ</p>
                            <RiDeleteBin6Line className="cursor-pointer rounded-full bg-gray-200 p-1 text-3xl hover:scale-110" />
                        </div>
                    </li>
                    <li className="flex justify-between border-b-2 border-gray-300 py-6">
                        <img src={avatr} alt="" className="size-[120px] object-cover object-center" />
                        <p className="-ml-6 w-[300px] font-semibold text-textColor2">
                            Nguồn Gaming ASUS TUF 1200W GOLD ATX 3.0 80 PLUS - Full Modular
                        </p>
                        <div className="flex max-w-[8rem]">
                            <button className="h-11 rounded-s-lg border border-gray-300 bg-gray-50 p-3">
                                <FaMinus />
                            </button>
                            <span className="h-11 w-20 border border-x-0 border-gray-300 bg-gray-50 py-2.5 text-center text-sm text-gray-900 outline-none">
                                {' '}
                                0
                            </span>
                            <button className="h-11 rounded-e-lg border border-gray-300 bg-gray-50 p-3">
                                <FaPlus />
                            </button>
                        </div>
                        <div className="flex flex-col items-end justify-between">
                            <p className="font-semibold text-redColor">19.000.000đ</p>
                            <RiDeleteBin6Line className="cursor-pointer rounded-full bg-gray-200 p-1 text-3xl hover:scale-110" />
                        </div>
                    </li>
                </ul>
            </div>

            <div className="h-fit w-2/6 rounded-lg border px-8 pt-4 shadow-lg">
                <h3 className="text-xl font-semibold text-textColor1">Thông tin đơn hàng</h3>

                <div className="mt-6 flex justify-between border-b-2 border-gray-400 pb-4">
                    <p className="font-semibold">Tổng tiền:</p>
                    <p className="text-xl font-semibold text-redColor">19.000.000đ</p>
                </div>

                <ul className="mt-6 list-disc text-sm text-textColor2">
                    <li>Phí vận chuyển sẽ được tính ở trang thanh toán.</li>
                    <li>Bạn có thể nhập mã giảm giá ở trang thanh toán.</li>
                </ul>

                <button className="mx-auto mb-6 mt-10 block w-2/5 rounded-lg bg-primary from-primary to-second py-2 text-white hover:bg-gradient-to-tr">
                    ĐẶT HÀNG
                </button>
            </div>
        </div>
    );
}

export default CheckoutPage;
