import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css";
import image from "./img/01.png";
import image1280 from "./img/01-1280.jpg";
import image640 from "./img/01-640.jpg";
import SwiperButton from "../../UI/SwiperButton";
export default () => {
    return (
        <Swiper className="intro-swiper" spaceBetween={50} slidesPerView={1}>
            <SwiperSlide>
                <div className="intro-swiper__img">
                    <picture>
                        <source srcSet={image640} media="(max-width: 640px)" />
                        <source srcSet={image1280} media="(max-width: 1280px)" />
                        <source srcSet={image} media="(min-width: 1281px)" />
                        <img src={image} alt="Описание изображения" />
                    </picture>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};
