import { FaPlus, FaMinus } from 'react-icons/fa6';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { use, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const avatr =
    'https://danhgiaxe.edu.vn/upload/2024/12/bo-suu-tap-hinh-anh-gai-k8-dep-quyen-ru-khien-ban-say-dam-4.webp';

function CheckoutPage() {
    const [listCheckout, setListCheckout] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const handleDeleteItem = (id) => {
        const updatedList = listCheckout.filter((item) => item.id !== id);
        setListCheckout(updatedList);
        sessionStorage.setItem('listCheckout', JSON.stringify(updatedList));
    };

    const handleChangeQuantity = (id, type) => {
        const updatedList = listCheckout.map((item) => {
            if (item.id === id) {
                const quantity = type === 'plus' ? item.quantity + 1 : item.quantity - 1;
                if (quantity < 1) return item; // Prevent quantity from going below 1

                return { ...item, quantity };
            }
            return item;
        });
        setListCheckout(updatedList);
        sessionStorage.setItem('listCheckout', JSON.stringify(updatedList));
    };

    useEffect(() => {
        const fromStorage = sessionStorage.getItem('listCheckout');

        if (fromStorage) {
            const parsed = JSON.parse(fromStorage);
            setListCheckout(parsed);
        }
    }, []);

    useEffect(() => {
        const total = listCheckout.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);

        setTotalPrice(total);
    }, [listCheckout]);

    if (!listCheckout || Array.isArray(listCheckout) === false) {
        return <div>Loading...</div>;
    }

    return (
        <div className="mx-auto flex gap-12">
            <div className="w-4/6 rounded-lg border px-6 py-4 shadow-lg">
                <button className="ml-auto block border px-2 py-1 text-sm">Xóa giỏ hàng</button>
                <ul className="mt-4">
                    {listCheckout.length != 0 &&
                        listCheckout?.map((item, index) => {
                            return (
                                <li key={index} className="flex justify-between border-b-2 border-gray-300 py-6">
                                    <img src={avatr} alt="" className="size-[120px] object-cover object-center" />
                                    <p className="-ml-6 w-[300px] font-semibold text-textColor2">{item.name}</p>
                                    <div className="flex max-w-[8rem]">
                                        <button
                                            onClick={() => {
                                                handleChangeQuantity(item.id, 'minus');
                                            }}
                                            className="h-11 rounded-s-lg border border-gray-300 bg-gray-50 p-3"
                                        >
                                            <FaMinus />
                                        </button>
                                        <span className="h-11 w-20 border border-x-0 border-gray-300 bg-gray-50 py-2.5 text-center text-sm text-gray-900 outline-none">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => {
                                                handleChangeQuantity(item.id, 'plus');
                                            }}
                                            className="h-11 rounded-e-lg border border-gray-300 bg-gray-50 p-3"
                                        >
                                            <FaPlus />
                                        </button>
                                    </div>
                                    <div className="flex flex-col items-end justify-between">
                                        <p className="font-semibold text-redColor">
                                            {item.price?.toLocaleString('vi-VN')}
                                        </p>
                                        <RiDeleteBin6Line
                                            onClick={() => {
                                                handleDeleteItem(item.id);
                                            }}
                                            className="cursor-pointer rounded-full bg-gray-200 p-1 text-3xl hover:scale-110"
                                        />
                                    </div>
                                </li>
                            );
                        })}
                </ul>
            </div>

            <div className="h-fit w-2/6 rounded-lg border px-8 pt-4 shadow-lg">
                <h3 className="text-xl font-semibold text-textColor1">Thông tin đơn hàng</h3>

                <div className="mt-6 flex justify-between border-b-2 border-gray-400 pb-4">
                    <p className="font-semibold">Tổng tiền:</p>
                    <p className="text-xl font-semibold text-redColor">{totalPrice.toLocaleString('vi-VN')}</p>
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
