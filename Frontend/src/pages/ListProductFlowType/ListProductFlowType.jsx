import { useParams } from 'react-router-dom';
import { FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6';

import ItemCard from '../../components/ui/Item.card';
import pc from '../../assets/images/PC/pc1.jpg';
import vgaSlide from '../../assets/images/slider/vga.webp';

function ListProductFlowType() {
    const { id } = useParams();

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const data = [
        {
            id: 'pc',
            name: 'PC Build Sẵn',
        },
        {
            id: 'cpu',
            name: 'CPU - Bộ Vi Xử Lý',
        },
        {
            id: 'vga',
            name: 'VGA - Card Màn Hình',
        },
    ];

    return (
        <div className="">
            <img src={vgaSlide} alt="" className="rounded-lg" />

            <h1 className="mt-6 text-center text-2xl font-semibold text-[#0f5b99]">
                {data.find((item) => item.id === id)?.name}
            </h1>

            <div className="mt-6 rounded-lg bg-gradient-to-r from-[#8f0000] via-redColor to-[#8f0000] px-6 py-6">
                <h3 className="text-center text-3xl font-semibold text-white">TOP 10 SẢN PHẨM</h3>
                <div className="mt-6 flex gap-6">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <ItemCard
                            key={index}
                            item={{
                                image: pc,
                                bestSale: true,
                                name: 'Màn hình TUF Gaming VG249Q3A (24 inch/ Full HD/ 180Hz/ FreeSync/ 1ms GTG)',
                                oldPrice: '20.000.000đ',
                                newPrice: '18.000.000đ',
                                discount: '-10%',
                                countSold: '20',
                            }}
                        />
                    ))}
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
                <filter className="inline-flex gap-4">
                    <div className="flex w-fit cursor-pointer items-center gap-2 rounded-lg border bg-[#f8f8f8] px-[10px] py-2 text-sm text-[#515151]">
                        <FaArrowTrendUp />
                        <p>Giá tăng dần</p>
                    </div>
                    <div className="flex w-fit cursor-pointer items-center gap-2 rounded-lg border bg-[#f8f8f8] px-[10px] py-2 text-sm text-[#515151]">
                        <FaArrowTrendDown />
                        <p>Giá giảm dần</p>
                    </div>
                </filter>
            </div>
        </div>
    );
}

export default ListProductFlowType;
