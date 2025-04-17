import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';

import Slider from '../../components/ui/Slider';
import Category from './Category';
import Banner from './Banner';
import { addNewOrderAPI, getListBestSellerAPI } from '../../api/userAPI';

const list = new Array(10).fill(0);

function HomePage() {
    const [listCPU, setListCPU] = useState([]);
    const [listGPU, setListGPU] = useState([]);
    const [listMainboard, setListMainboard] = useState([]);
    const [listSSD, setListSSD] = useState([]);
    const [listMonitor, setListMonitor] = useState([]);
    const [listLaptop, setListLaptop] = useState([]);
    const [listPC, setListPC] = useState([]);

    useEffect(() => {
        const fetchListBestSeller = async () => {
            try {
                const [cpuRes, gpuRes, mainboardRes, ssdRes, monitorRes, laptopRes, pcRes] = await Promise.allSettled([
                    getListBestSellerAPI('cpu'),
                    getListBestSellerAPI('gpu'),
                    getListBestSellerAPI('mainboard'),
                    getListBestSellerAPI('ssd'),
                    getListBestSellerAPI('monitor'),
                    getListBestSellerAPI('laptop'),
                    getListBestSellerAPI('pc'),
                ]);

                if (cpuRes.status === 'fulfilled') setListCPU(cpuRes.value.data);
                if (gpuRes.status === 'fulfilled') setListGPU(gpuRes.value.data);
                if (mainboardRes.status === 'fulfilled') setListMainboard(mainboardRes.value.data);
                if (ssdRes.status === 'fulfilled') setListSSD(ssdRes.value.data);
                if (monitorRes.status === 'fulfilled') setListMonitor(monitorRes.value.data);
                if (laptopRes.status === 'fulfilled') setListLaptop(laptopRes.value.data);
                if (pcRes.status === 'fulfilled') setListPC(pcRes.value.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchListBestSeller();
    }, []);

    // useEffect(()=>{
    //     const obj = {
    //         {
    //             'id':1,
    //             'name4':'hoang trung anh',
    //             'age':20
    //         },{
    //             'id':2,
    //             'name4':'hoang trung anh',
    //             'age':20
    //         }
    //     }
    // },[])

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
            <Slider list={listPC} />

            <div className="mb-6 mt-12 flex items-center justify-between">
                <h1 className="border-l-4 border-primary pl-3 pt-[2px] text-xl font-semibold text-textColor1">
                    CPU - BỘ VI XỬ LÝ
                </h1>
                <Link to={'/list-product/cpu'} className="border px-2 py-1">
                    Xem tất cả
                </Link>
            </div>
            <Slider list={listCPU} />

            <div className="mb-6 mt-12 flex items-center justify-between">
                <h1 className="border-l-4 border-primary pl-3 pt-[2px] text-xl font-semibold text-textColor1">
                    VGA - CARD MÀN HÌNH
                </h1>
                <Link to={'/list-product/vga'} className="border px-2 py-1">
                    Xem tất cả
                </Link>
            </div>
            <Slider list={listGPU} />
        </div>
    );
}

export default HomePage;
