import React from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useSwiper } from "swiper/react";

export default function SwiperButton({
    direction,
    modificator,
    isAbsolute,
    onClick,
    ref,
}) {
    const swiper = useSwiper();

    return direction == "prev" ? (
        <button
            onClick={swiper ? () => swiper.slidePrev() : onClick}
            title="swiper-btn"
            type="button"
            ref={ref}
            className={
                isAbsolute
                    ? `swiper-btn ${modificator}__button-prev swiper-btn-prev swiper-btn-absolute swiper-btn-disabled`
                    : `swiper-btn ${modificator}__button-prev swiper-btn-prev swiper-btn-disabled`
            }
        >
            <FaArrowLeftLong color="#fff" size={20} />
        </button>
    ) : (
        <button
            ref={ref}
            onClick={swiper ? () => swiper.slideNext() : onClick}
            title="swiper-btn"
            type="button"
            className={
                isAbsolute
                    ? `swiper-btn ${modificator}__button-next swiper-btn-next swiper-btn-absolute`
                    : `swiper-btn ${modificator}__button-next swiper-btn-next`
            }
        >
            <FaArrowRightLong color="#fff" size={20} />
        </button>
    );
}
