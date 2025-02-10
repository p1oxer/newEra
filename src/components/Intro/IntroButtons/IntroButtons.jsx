import React from "react";
import IntroButton from "./IntroButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaQuestion } from "react-icons/fa";
import { FaVk } from "react-icons/fa";
import { FaSkull } from "react-icons/fa6";
import { handleNavClick } from "../../../functions/helpers";
export function IntroButtons() {
    return (
        <>
            <div onClick={handleNavClick} className="">
                <Swiper
                    className="intro-buttons"
                    breakpoints={{
                        320: {
                            slidesPerView: "auto",
                            spaceBetween: 15,
                        },
                        900: { slidesPerView: 4, spaceBetween: 30 },
                    }}
                >
                    <SwiperSlide className="intro-buttons__slide">
                        <IntroButton scrollTo={"quests"} text={"Все квесты"}>
                            <FaQuestion size={60} />
                        </IntroButton>
                    </SwiperSlide>
                    <SwiperSlide className="intro-buttons__slide">
                        <IntroButton text={"Хоррор"} link={"quests/horror"}>
                            <FaSkull size={60} />
                        </IntroButton>
                    </SwiperSlide>
                    <SwiperSlide className="intro-buttons__slide">
                        <IntroButton text={"Приключения"} link={"quests/adventures"}>
                            <FaMagnifyingGlass size={60} />
                        </IntroButton>
                    </SwiperSlide>
                    <SwiperSlide className="intro-buttons__slide">
                        <IntroButton
                            text={"Забронировать квест"}
                            linkOuter={"https://vk.com/market-213324777"}
                        >
                            <FaVk size={60} />
                        </IntroButton>
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    );
}
