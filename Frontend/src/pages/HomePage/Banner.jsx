import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import banner from '../../assets/images/slider/vga.webp';

function Banner({ list = [] }) {
    return (
        <div className="relative z-0">
            <Swiper spaceBetween={20} slidesPerView={2}>
                {list &&
                    list.map((item, index) => (
                        <SwiperSlide key={index}>
                            <img src={banner} alt="" className="" />
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
}

export default Banner;
