import { Link } from 'react-router-dom';
import { useEffect } from 'react';

import Slider from '../../components/Slider/Slider';
import Category from './Category';
import Banner from './Banner';
import { getListBestSeller } from '../../api/userAPI';

const list = new Array(10).fill(0);

function HomePage() {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getListBestSeller({ type: 'pc' });
                console.log(response);
            } catch (error) {
                console.error('Error fetching best seller products:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mx-auto">
            <Banner list={list} />

            <h1 className="mb-6 mt-12 border-l-4 border-primary pl-3 text-xl font-semibold text-textColor1">
                DANH MỤC NỔI BẬT
            </h1>
            <Category className="" />

            <div className="mb-6 mt-12 flex items-center justify-between">
                <h1 className="block border-l-4 border-primary pl-3 pt-[2px] text-xl font-semibold text-textColor1">
                    PC THEO NHU CẦU
                </h1>
                <Link to={'/list-product/pc'} className="block border px-2 py-1">
                    Xem tất cả
                </Link>
            </div>
            <Slider list={list} />

            <div className="mb-6 mt-12 flex items-center justify-between">
                <h1 className="border-l-4 border-primary pl-3 pt-[2px] text-xl font-semibold text-textColor1">
                    CPU - BỘ VI XỬ LÝ
                </h1>
                <Link to={'/list-product/cpu'} className="border px-2 py-1">
                    Xem tất cả
                </Link>
            </div>
            <Slider list={list} />

            <div className="mb-6 mt-12 flex items-center justify-between">
                <h1 className="border-l-4 border-primary pl-3 pt-[2px] text-xl font-semibold text-textColor1">
                    VGA - CARD MÀN HÌNH
                </h1>
                <Link to={'/list-product/vga'} className="border px-2 py-1">
                    Xem tất cả
                </Link>
            </div>
            <Slider list={list} />
        </div>
    );
}

export default HomePage;
