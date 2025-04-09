import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';

import Slider from '../../components/ui/Slider';
import Category from './Category';
import Banner from './Banner';
import { getListBestSellerAPI } from '../../api/userAPI';

import { AuthContext } from './../../components/hooks/authContext';

const list = new Array(10).fill(0);

function HomePage() {
    const data = useContext(AuthContext);
    console.log(data);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getListBestSellerAPI('cpu');
                console.log(response.data);
            } catch (error) {
                console.error(error);
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
