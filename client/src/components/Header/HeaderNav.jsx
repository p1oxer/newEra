import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { translit } from "../../functions/translit";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/free-mode";
import { FreeMode, Navigation } from "swiper/modules";
import { IoIosArrowForward } from "react-icons/io";
import { handleNavClick } from "../../functions/helpers";
export default function HeaderNav({ direction, list, modificator }) {
    const swiperRef = useRef();
    modificator = modificator || "";
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    
    useEffect(() => {
        const swiper = swiperRef.current;
        if (swiper) {
            const checkButtonVisibility = () => {
                const canScroll = swiper.slides.length > 0 && swiper.isLocked === false;
                setIsButtonVisible(canScroll);
            };

            checkButtonVisibility(); // Проверяем изначально
            swiper.on("resize", checkButtonVisibility); // Проверяем при изменении размера экрана
        }
    }, []);
    return (
        <nav className={`nav ${modificator}`} onClick={handleNavClick}>
            <Swiper
                slidesPerView={"auto"}
                modules={[FreeMode, Navigation]}
                freeMode={{ enabled: true }}
                className="header__swiper"
                navigation={{ nextEl: "header__swiper-button" }}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                breakpoints={{
                    1200: {
                        spaceBetween: 30,
                    },
                    767: {
                        spaceBetween: 20,
                    },
                }}
            >
                {list.map((item, index) => {
                    return (
                        <SwiperSlide key={index} className="header__swiper--slide">
                            {item.link != "" && (
                                <Link to={item.link} className="nav-link link">
                                    {item.text}
                                </Link>
                            )}
                            {item.scrollTo && (
                                <a href="#quests" className="nav-link link">
                                    {item.text}
                                </a>
                            )}
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            {isButtonVisible && (
                <button
                    onClick={() => swiperRef.current.slideNext()}
                    type="button"
                    className="header__swiper-button"
                >
                    <IoIosArrowForward size={25} />
                </button>
            )}
        </nav>
    );
}
