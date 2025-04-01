import { Swiper, SwiperSlide } from 'swiper/react';
import ItemCard from '../Item.card/Item.card';

import 'swiper/css';

import pc from '../../assets/images/PC/pc1.jpg';

function Slider({ list = [] }) {
    return (
        <Swiper spaceBetween={20} slidesPerView={5}>
            {list &&
                list.map((item, index) => (
                    <SwiperSlide key={index}>
                        <ItemCard
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
                    </SwiperSlide>
                ))}
        </Swiper>
    );
}

export default Slider;
