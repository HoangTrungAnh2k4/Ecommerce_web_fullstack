import { Swiper, SwiperSlide } from 'swiper/react';
import ItemCard from './Item.card';

import pc from '../../../public/pc2.jpg';

import 'swiper/css';

function Slider({ list }) {
    return (
        <Swiper spaceBetween={20} slidesPerView={5}>
            {list &&
                list.map((item, index) => (
                    <SwiperSlide key={index}>
                        <ItemCard
                            item={{
                                id: item.id,
                                image: pc,
                                best_seller: item.best_seller,
                                name: item.name,
                                price: item.price,
                                discount: item.discount,
                                sold_quantity: item.sold_quantity,
                            }}
                        />
                    </SwiperSlide>
                ))}
        </Swiper>
    );
}

export default Slider;
