import React from "react";
import IntroButton from "./IntroButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaQuestion } from "react-icons/fa";
import { FaVk } from "react-icons/fa";
import { FaSkull } from "react-icons/fa6";

export function IntroButtons() {
    return (
        <>
            <Swiper
                className="intro-buttons"
                freeMode={{ enabled: true }}
                breakpoints={{
                    320: {
                        slidesPerView: "auto",
                        spaceBetween: 15,
                    },
                    900: { slidesPerView: 4, spaceBetween: 30 },
                }}
            >
                <SwiperSlide className="intro-buttons__slide">
                    <IntroButton text={"Все квесты"}>
                        <FaQuestion size={60}/>
                    </IntroButton>
                </SwiperSlide>
                <SwiperSlide className="intro-buttons__slide">
                    <IntroButton text={"Хоррор"}>
                        <FaSkull size={60}/>
                    </IntroButton>
                </SwiperSlide>
                <SwiperSlide className="intro-buttons__slide">
                    <IntroButton text={"Приключения"}>
                        <FaMagnifyingGlass size={60}/>
                    </IntroButton>
                </SwiperSlide>
                <SwiperSlide className="intro-buttons__slide">
                    <IntroButton text={"Забронировать квест"}>
                        <FaVk size={60}/>
                    </IntroButton>
                </SwiperSlide>
            </Swiper>
        </>
    );
}
