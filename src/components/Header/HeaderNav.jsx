import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { translit } from "../../functions/translit";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/free-mode";
import { FreeMode, Navigation } from "swiper/modules";
import { IoIosArrowForward } from "react-icons/io";
export default function Nav({ direction, list, modificator }) {
    modificator = modificator || "";
    const swiperRef = useRef();
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
        <nav className={`nav ${modificator}`}>
            <Swiper
                slidesPerView={"auto"}
                modules={[FreeMode, Navigation]}
                freeMode={{ enabled: true }}
                className="header__swiper"
                navigation={{ nextEl: "header__swiper-button" }}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                breakpoints={{
                    1200: {
                        spaceBetween: 50,
                    },
                    767: {
                        spaceBetween: 20,
                    },
                }}
            >
                {list.map((item, index) => {
                    return (
                        <SwiperSlide key={index} className="header__swiper--slide">
                            <Link to={translit(item.link)} className="nav-link link">
                                {item.text}
                            </Link>
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
