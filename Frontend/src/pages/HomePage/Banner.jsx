import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

function Banner({ list = [] }) {
    return (
        <div className="relative z-0">
            <Swiper spaceBetween={20} slidesPerView={2}>
                {list &&
                    list.map((item, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src="https://nguyencongpc.vn/media/banner/27_Mar8548551a382f4409018e150f5b4945fe.webp"
                                alt=""
                                className="rounded-lg"
                            />
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
}

export default Banner;
