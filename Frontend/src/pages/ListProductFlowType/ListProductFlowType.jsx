import { useParams } from 'react-router-dom';
import { FaArrowTrendUp, FaArrowTrendDown, FaPlus } from 'react-icons/fa6';

import ItemCard from '../../components/ui/Item.card';
import vgaSlide from '../../assets/images/slider/vga.webp';
import { useEffect, useState } from 'react';

import { getListEquipmentByTypeAPI, getListBestSellerAPI } from '../../api/userAPI';
import { addNewProductAPI } from './../../api/adminAPI';

import ModalAddProduct from './ModalAddProduct';
import { toast } from 'react-toastify';

function ListProductFlowType() {
    const { id } = useParams();

    const [listProduct, setListProduct] = useState([]);
    const [listBestSeller, setListBestSeller] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);

    const equipmentType = {
        cpu: 'CPU - Bộ Vi Xử Lý',
        gpu: 'GPU - Card Màn Hình',
        mainboard: 'Mainboard - Bo Mạch Chủ',
        monitor: 'Màn Hình Máy Tính',
        laptop: 'Laptop - Phụ Kiện',
        pc: 'PC Build Sẵn',
        ssd: 'Thiết Bị Lưu Trữ',
    };

    const getListEquipmentByType = async () => {
        try {
            const response = await getListEquipmentByTypeAPI(id);

            setListProduct(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getListBestSeller = async () => {
        try {
            const response = await getListBestSellerAPI(id);
            setListBestSeller(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleAddProduct = async (data) => {
        try {
            const response = await addNewProductAPI(data);
            if (response.status === 200) {
                setVisible(false);
                getListEquipmentByType();
                // getListBestSeller();
                toast.success('Thêm sản phẩm thành công');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            if (error.response?.data?.message) {
                toast.error(error.response?.data?.message);
            } else if (error.response?.data?.error) {
                toast.error(error.response?.data?.error);
            }
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        getListEquipmentByType();
        getListBestSeller();
    }, [id]);

    return (
        <div className="">
            <img src={vgaSlide} alt="" className="rounded-lg" />

            <h1 className="mt-6 text-center text-2xl font-semibold text-[#0f5b99]">{equipmentType[id]}</h1>

            <div className="mt-6 rounded-lg bg-gradient-to-r from-[#8f0000] via-redColor to-[#8f0000] px-6 py-6">
                <h3 className="text-center text-3xl font-semibold text-white">TOP 10 SẢN PHẨM</h3>
                <div className="mt-6 flex gap-6">
                    {loading ? (
                        <div className="flex h-[300px] items-center justify-center rounded-lg border bg-[#f8f8f8] text-[#515151]">
                            Loading...
                        </div>
                    ) : listBestSeller.length === 0 ? (
                        <div className="flex h-[300px] items-center justify-center rounded-lg border bg-[#f8f8f8] text-[#515151]">
                            Không có sản phẩm nào
                        </div>
                    ) : (
                        listBestSeller.map((item, index) => (
                            <ItemCard
                                key={index}
                                item={{
                                    image: item.images?.[0],
                                    bestSale: true,
                                    name: item.name,
                                    price: item.price,
                                    discount: item.discount,
                                    countSold: item.sold_quantity ?? 0,
                                    sold_quantity: item.sold_quantity,
                                }}
                            />
                        ))
                    )}
                </div>
            </div>

            <div className="mt-6 rounded-lg border bg-white">
                <div className="flex border-b border-gray-300 p-4">
                    <p className="mr-6 w-fit flex-shrink-0 text-sm font-semibold">Khoảng giá:</p>
                    <ul className="flex flex-wrap gap-4">
                        <li className="rounded-lg border bg-[#f8f8f8] px-2 py-1 text-sm">1 triệu - 4 triệu</li>
                        <li className="rounded-lg border bg-[#f8f8f8] px-2 py-1 text-sm">5 triệu - 9 triệu</li>
                        <li className="rounded-lg border bg-[#f8f8f8] px-2 py-1 text-sm">10 triệu - 15 triệu</li>
                        <li className="rounded-lg border bg-[#f8f8f8] px-2 py-1 text-sm">16 triệu - 20 triệu</li>
                        <li className="rounded-lg border bg-[#f8f8f8] px-2 py-1 text-sm">21 triệu - 30 triệu</li>
                        <li className="rounded-lg border bg-[#f8f8f8] px-2 py-1 text-sm">1 triệu - 4 triệu</li>
                        <li className="rounded-lg border bg-[#f8f8f8] px-2 py-1 text-sm">5 triệu - 9 triệu</li>
                    </ul>
                </div>
                <div className="flex p-4">
                    <p className="mr-6 w-fit flex-shrink-0 text-sm font-semibold">Chọn theo tiêu chí:</p>
                    <ul className="flex flex-wrap gap-4"></ul>
                </div>
            </div>

            <div className="mt-6 rounded-lg border bg-white p-4">
                {/* filter */}
                <div className="inline-flex w-full gap-4">
                    <div className="flex w-fit cursor-pointer items-center gap-2 rounded-lg border bg-[#f8f8f8] px-[10px] py-2 text-sm text-[#515151] hover:bg-gray-200">
                        <FaArrowTrendUp />
                        <p>Giá tăng dần</p>
                    </div>
                    <div className="flex w-fit cursor-pointer items-center gap-2 rounded-lg border bg-[#f8f8f8] px-[10px] py-2 text-sm text-[#515151] hover:bg-gray-200">
                        <FaArrowTrendDown />
                        <p>Giá giảm dần</p>
                    </div>
                    <div
                        onClick={() => {
                            setVisible(true);
                        }}
                        className="btn ml-auto flex w-fit cursor-pointer items-center gap-4 rounded-lg border bg-[#f8f8f8] px-[10px] py-2 text-[#515151] hover:bg-gray-200"
                    >
                        <p>Thêm sản phẩm</p>
                        <FaPlus className="text-xl" />
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-6">
                    {loading ? (
                        <div className="flex h-[300px] items-center justify-center rounded-lg border bg-[#f8f8f8] text-[#515151]">
                            Loading...
                        </div>
                    ) : listProduct.length === 0 ? (
                        <div className="flex h-[300px] items-center justify-center rounded-lg border bg-[#f8f8f8] text-[#515151]">
                            Không có sản phẩm nào
                        </div>
                    ) : (
                        listProduct.map((item, index) => (
                            <ItemCard
                                key={index}
                                item={{
                                    id: item.id,
                                    image: item.images?.[0],
                                    best_seller: item.best_seller,
                                    name: item.name,
                                    price: item.price,
                                    discount: item.discount,
                                    countSold: item.sold_quantity ?? 0,
                                    sold_quantity: item.sold_quantity,
                                }}
                            />
                        ))
                    )}
                </div>
            </div>

            <ModalAddProduct id={id} visible={visible} setVisible={setVisible} handleAddProduct={handleAddProduct} />
        </div>
    );
}

export default ListProductFlowType;
