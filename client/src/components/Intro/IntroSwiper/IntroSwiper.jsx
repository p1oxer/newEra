import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css";
import SwiperButton from "../../UI/SwiperButton";

export default () => {
    return (
        <Swiper className="intro-swiper" spaceBetween={50} slidesPerView={1}>
            <SwiperSlide>
                <div className="intro-swiper__img">
                     <picture>
                        <source
                            srcSet="/img/Intro/mob-640.avif"
                            type="image/avif"
                            media="(max-width: 640px)"
                        />
                        <source
                            srcSet="/img/Intro/mob-640.webp"
                            type="image/webp"
                            media="(max-width: 640px)"
                        />
                        <source srcSet="/img/Intro/mob.jpg" media="(max-width: 640px)" />
                        <source
                            srcSet="/img/Intro/01-1280.webp"
                            type="image/webp"
                            media="(max-width: 1280px)"
                        />
                        <source
                            srcSet="/img/Intro/01-1280.avif"
                            type="image/avif"
                            media="(max-width: 1280px)"
                        />
                        <source srcSet="/img/Intro/01-1280.jpg" media="(max-width: 1280px)" />
                        <source
                            srcSet="/img/Intro/01-1920.webp"
                            type="image/webp"
                            media="(min-width: 1281px)"
                        />
                        <source
                            srcSet="/img/Intro/01-1920.avif"
                            type="image/avif"
                            media="(min-width: 1281px)"
                        />
                        <img
                            src="/img/Intro/01.png"
                            alt="Интро"
                            loading="lazy"
                        />
                    </picture> 
                </div>
            </SwiperSlide>
        </Swiper>
    );
};
