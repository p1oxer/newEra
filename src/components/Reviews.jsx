import React from "react";
import { reviews } from "../files/reviews";
import { SwiperSlide } from "swiper/react";
import CustomSwiper from "./UI/CustomSwiper";
export default function Reviews() {
    const swiperReviewsSettings = {
        slidesPerView: 4,
        pagination: true,
        breakpoints: {
            1400: {
                spaceBetween: 50,
            },
            991: {
                spaceBetween: 25,
            },
            767: {
                spaceBetween: 25,
                slidesPerView: 3,
            },
            484: {
                spaceBetween: 25,
                slidesPerView: 2,
            },
            320: {
                spaceBetween: 25,
                slidesPerView: 1,
            },
        },
    };
    return (
        <CustomSwiper
            block={true}
            modificator={"reviews"}
            blockTitle={"Отзывы"}
            settings={swiperReviewsSettings}
        >
            {reviews.map((review, index) => {
                return (
                    <SwiperSlide key={index} className="swiper-reviews__slide">
                        <p className="swiper-reviews__item">{review}</p>
                    </SwiperSlide>
                );
            })}
        </CustomSwiper>
    );
}
