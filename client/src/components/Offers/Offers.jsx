import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import OfferItem from "./OfferItem";

export default function Offers({ offers }) {
    const sliderRef = useRef(null);

    // Функция выравнивания высоты
    const equalizeSlideHeights = () => {
        if (!sliderRef.current) return;

        const slides = sliderRef.current.querySelectorAll(".swiper-slide");

        if (!slides.length) return;

        slides.forEach((slide) => {
            slide.style.height = "auto";
        });

        const maxHeight = Math.max(...Array.from(slides).map((s) => s.offsetHeight));

        slides.forEach((slide) => {
            slide.style.height = `${maxHeight}px`;
        });
    };

    // Центрируем слайды, если их меньше, чем slidesPerView
    const stretchSlides = () => {
        const swiper = sliderRef.current?.swiper;
        if (!swiper) return;

        const totalSlides = offers.length;
        const perView = swiper.params.slidesPerView;

        if (totalSlides < perView) {
            const wrapper = swiper.wrapperEl;
            wrapper.style.width = "100%";
            wrapper.style.justifyContent = "center";
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            equalizeSlideHeights();
            stretchSlides();
        }, 100);
        return () => clearTimeout(timeout);
    }, [offers]);

    return (
        <Swiper
            ref={sliderRef}
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={3}
            slidesPerGroup={3}
            watchOverflow={true}
            pagination={{ clickable: true }}
            className="offers"
            onInit={() => {
                equalizeSlideHeights();
                stretchSlides();
            }}
            onSlideChange={() => {
                equalizeSlideHeights();
                stretchSlides();
            }}
            breakpoints={{
                320: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 15,
                },
                700: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 20,
                },
                1200: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 30,
                },
            }}
        >
            {offers.map((offer) => (
                <SwiperSlide key={offer.id}>
                    <OfferItem offer={offer} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
