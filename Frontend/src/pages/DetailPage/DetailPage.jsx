import { FaPlus, FaMinus, FaHeadphones, FaArrowsRotate } from 'react-icons/fa6';
import { GiTakeMyMoney, GiMoneyStack, GiReceiveMoney } from 'react-icons/gi';
import { TbTruckDelivery } from 'react-icons/tb';
import { MdOutlineWifiProtectedSetup, MdOutlineFiberNew } from 'react-icons/md';

import { Swiper, SwiperSlide } from 'swiper/react';

import pc from '../../assets/images/PC/pc1.jpg';

import Evaluation from './Evaluation';
import Specification from './Specification';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getEquipmentDetailAPI, getRateAPI, addToCartAPI } from '../../api/userAPI';
import { toast } from 'react-toastify';

function DetailPage() {
    const { id } = useParams();
    const [listRate, setListRate] = useState([]);
    const [equipmentInfor, setEquipmentInfor] = useState({});
    const [quantityChoose, setQuantityChoose] = useState(1);

    const navigate = useNavigate();

    const handleQuantityChoose = (value) => {
        if (value === 'plus') {
            setQuantityChoose((prev) => prev + 1);
        } else if (value === 'minus') {
            setQuantityChoose((prev) => (prev > 0 ? prev - 1 : 0));
        }
    };

    const handleAddToCart = async () => {
        const data = {
            equipmentId: id,
            quantity: quantityChoose,
        };
        if (quantityChoose <= 0) {
            toast.error('Vui lòng chọn số lượng sản phẩm');
            return;
        }

        try {
            const response = await addToCartAPI(data);

            if (response.data) {
                toast.success('Thêm vào giỏ hàng thành công');
            }
        } catch (error) {
            console.log(error);
            if (error.status === 409) {
                toast.error('Sản phẩm đã có trong giỏ hàng');
            }
        }
    };

    const getRateData = async () => {
        try {
            const response = await getRateAPI(id);

            if (response.data) {
                setListRate(response.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        const getEquipmentInfor = async () => {
            try {
                const response = await getEquipmentDetailAPI(id);

                if (response.data) {
                    setEquipmentInfor(response.data);
                }
            } catch (err) {
                console.log(err);
            }
        };

        getRateData();
        getEquipmentInfor();
    }, [id]);

    return (
        <div>
            <div className="flex rounded-lg border bg-white p-4 shadow">
                <div className="w-[400px] flex-1">
                    <div className="flex items-center justify-center">
                        <img src={pc} alt="" className="w-3/5" />
                    </div>
                    <div className="mx-auto mt-8 flex w-[90%] overflow-x-auto pb-4">
                        <Swiper spaceBetween={20} slidesPerView={5}>
                            {Array.from({ length: 10 }).map((_, index) => (
                                <SwiperSlide key={index}>
                                    <div
                                        key={index}
                                        className="flex w-[90px] items-center justify-center rounded-lg border border-[#b8b8b8] p-[1px]"
                                    >
                                        <img src={pc} alt="" className="rounded-lg" />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
                <div className="flex-1 pl-4">
                    <h2 className="text-xl font-semibold text-black">{equipmentInfor.name || 'Tên sản phẩm'}</h2>
                    <div className="mt-2 text-sm">
                        <span className="text-textColor2">Tình trạng: </span>
                        {equipmentInfor.stock_quantity ? (
                            <span className="text-green-600">Còn hàng</span>
                        ) : (
                            <span className="text-redColor">Hết hàng</span>
                        )}
                    </div>
                    <div className="mt-6 flex items-center gap-4 rounded-xl border border-[#b8b8b8] bg-[#f7f9fb] p-4">
                        <span className="text-3xl font-semibold text-redColor">
                            {(equipmentInfor.price * (1 - equipmentInfor.discount / 100)).toLocaleString('vi-VN')}
                        </span>
                        <span className="text-textColor2 line-through">
                            {equipmentInfor?.price?.toLocaleString('vi-VN') || '0'}
                        </span>
                        <span className="rounded-md border border-redColor px-4 py-1 text-sm text-redColor">
                            {equipmentInfor.discount || 0}%
                        </span>
                    </div>

                    <div className="z-0 mt-6 flex items-center gap-4">
                        <p className="font-semibold">Số lượng:</p>

                        <div className="flex max-w-[8rem] items-center">
                            <button
                                onClick={() => {
                                    handleQuantityChoose('minus');
                                }}
                                className="h-11 rounded-s-lg border border-gray-300 p-3 hover:bg-gray-100"
                            >
                                <FaMinus />
                            </button>
                            <span className="flex h-11 w-20 items-center justify-center border border-x-0 border-gray-300 py-2.5 text-center text-gray-900 outline-none">
                                {quantityChoose}
                            </span>
                            <button
                                onClick={() => {
                                    handleQuantityChoose('plus');
                                }}
                                className="h-11 rounded-e-lg border border-gray-300 p-3 hover:bg-gray-100"
                            >
                                <FaPlus />
                            </button>
                        </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                        <button
                            onClick={handleAddToCart}
                            className="w-1/2 rounded-lg border border-redColor py-2 text-redColor hover:shadow-inner hover:shadow-redColor"
                        >
                            THÊM VÀO GIỎ HÀNG
                        </button>
                        <button
                            onClick={() => {
                                navigate('/checkout');
                                sessionStorage.setItem(
                                    'listCheckout',
                                    JSON.stringify([{ ...equipmentInfor, quantity: quantityChoose }]),
                                );
                            }}
                            className="w-1/2 rounded-lg bg-redColor from-redColor to-[#e8d01e] text-white hover:bg-gradient-to-tr"
                        >
                            MUA NGAY
                        </button>
                    </div>

                    <h3 className="mt-6 font-semibold text-textColor2">YÊN TÂM MUA HÀNG</h3>
                    <ul className="mt-4 flex flex-wrap gap-x-16 gap-y-4">
                        <li className="flex w-1/2 items-center gap-2">
                            <GiTakeMyMoney className="text-2xl text-redColor" />
                            <p className="text-sm text-textColor2">Cam kết giá tốt nhất thị trường.</p>
                        </li>
                        <li className="flex items-center gap-2">
                            <MdOutlineFiberNew className="text-3xl text-redColor" />
                            <p className="text-sm text-textColor2">Sản phẩm mới 100%.</p>
                        </li>

                        <li className="flex w-1/2 items-center gap-2">
                            <GiReceiveMoney className="text-2xl text-redColor" />
                            <p className="text-sm text-textColor2">Hỗ trợ trả góp - Thủ tục nhanh gọn.</p>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaArrowsRotate className="text-2xl text-redColor" />
                            <p className="text-sm text-textColor2">Lỗi 1 đổi 1 ngay lập tức.</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-12 flex gap-4">
                <div className="w-3/5">
                    <Evaluation
                        equipmenId={parseInt(id)}
                        listRate={listRate}
                        setListRate={setListRate}
                        getRateData={getRateData}
                    />
                </div>
                <div className="w-2/5">
                    <Specification />
                </div>
            </div>

            <div className="mt-12 flex flex-wrap justify-between">
                <div className="flex flex-shrink-0 items-center rounded-lg border border-[#b8b8b8] bg-[#f7f9fb] p-4">
                    <TbTruckDelivery className="mr-3 mt-1 text-[50px]" />
                    <div>
                        <p className="text-sm font-semibold">CHÍNH SÁCH GIAO HÀNG</p>
                        <p className="text-sm text-textColor2">Nhận và thanh toán tại nhà</p>
                    </div>
                </div>
                <div className="flex flex-shrink-0 items-center rounded-lg border border-[#b8b8b8] bg-[#f7f9fb] p-4">
                    <MdOutlineWifiProtectedSetup className="mr-3 mt-1 rotate-90 text-[46px]" />
                    <div>
                        <p className="text-sm font-semibold">CHÍNH SÁCH GIAO HÀNG</p>
                        <p className="text-sm text-textColor2">Nhận và thanh toán tại nhà</p>
                    </div>
                </div>
                <div className="flex flex-shrink-0 items-center rounded-lg border border-[#b8b8b8] bg-[#f7f9fb] p-4">
                    <GiMoneyStack className="mr-3 mt-1 text-[50px]" />
                    <div>
                        <p className="text-sm font-semibold">CHÍNH SÁCH GIAO HÀNG</p>
                        <p className="text-sm text-textColor2">Nhận và thanh toán tại nhà</p>
                    </div>
                </div>
                <div className="flex flex-shrink-0 items-center rounded-lg border border-[#b8b8b8] bg-[#f7f9fb] p-4">
                    <FaHeadphones className="mr-3 text-[40px]" />
                    <div>
                        <p className="text-sm font-semibold">CHÍNH SÁCH GIAO HÀNG</p>
                        <p className="text-sm text-textColor2">Nhận và thanh toán tại nhà</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailPage;
