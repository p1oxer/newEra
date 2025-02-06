import React from "react";
import IntroButton from "./IntroButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

export default function IntroButtons() {
    const buttons = [
        { text: "С актёрами", image: "actors" },
        { text: "Без актёров", image: "no_actors" },
        { text: "Подарочные сертификаты", image: "sertificate" },
        { text: "Сложности квестов", image: "difficulties" },
    ];
    return (
        <>
            <Swiper
                className="intro-buttons"
                freeMode={true}
                breakpoints={{
                    320: {
                        slidesPerView: "auto",
                        spaceBetween: 15,
                    },
                    900: { slidesPerView: 4, spaceBetween: 30 },
                }}
            >
                {buttons.map((button, index) => {
                    return (
                        <SwiperSlide className="intro-buttons__slide" key={index}>
                            <IntroButton text={button.text} image={button.image} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </>
    );
}
