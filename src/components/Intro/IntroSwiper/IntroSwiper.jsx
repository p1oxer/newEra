import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";
import image from "./img/01.png";
import SwiperButton from "../../UI/SwiperButton";
export default () => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            className="intro-swiper"
            spaceBetween={50}
            slidesPerView={1}
            navigation={{}}
            pagination={{ clickable: true }}
            autoplay={{
                delay: 5000,
            }}
        >
            <SwiperSlide>
                <div className="intro-swiper__img">
                    <img src={image} alt=""></img>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="intro-swiper__img">
                    <img src={image} alt=""></img>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="intro-swiper__img">
                    <img src={image} alt=""></img>
                </div>
            </SwiperSlide>
            <SwiperButton
                isAbsolute={true}
                direction={"prev"}
                modificator={"intro-swiper"}
            />
            <SwiperButton
                isAbsolute={true}
                direction={"next"}
                modificator={"intro-swiper"}
            />
        </Swiper>
    );
};
