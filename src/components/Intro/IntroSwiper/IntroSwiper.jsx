import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css";
import image from "./img/01.png";
import SwiperButton from "../../UI/SwiperButton";
export default () => {
    return (
        <Swiper
            className="intro-swiper"
            spaceBetween={50}
            slidesPerView={1}
        >
            <SwiperSlide>
                <div className="intro-swiper__img">
                    <img src={image} alt=""></img>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};
