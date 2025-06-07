import React from "react";
import { SwiperSlide } from "swiper/react";
import CustomSwiper from "./UI/CustomSwiper";
import Button from "./UI/ButtonLink";
import useFetch from "../hooks/useFetch";

export default function Reviews() {
    const { data: reviews, isLoading, error } = useFetch("reviews");

    if (isLoading) {
        return <p>Загрузка отзывов...</p>;
    }

    if (error) {
        console.error("Ошибка загрузки отзывов:", error);
        return <p>Ошибка при загрузке отзывов</p>;
    }

    // ✅ Защита от null и undefined
    const reviewList = reviews?.length > 0 ? reviews : [];

    const swiperReviewsSettings = {
        slidesPerView: 4,
        pagination: true,
        breakpoints: {
            1400: { spaceBetween: 50 },
            991: { spaceBetween: 25 },
            767: { spaceBetween: 25, slidesPerView: 3 },
            484: { spaceBetween: 25, slidesPerView: 2 },
            320: { spaceBetween: 25, slidesPerView: 1 },
        },
    };

    return (
        <div className="reviews">
            <CustomSwiper
                block={true}
                modificator={"reviews"}
                blockTitle={"Отзывы"}
                settings={swiperReviewsSettings}
            >
                {reviewList.map((review, index) => (
                    <SwiperSlide key={index} className="swiper-reviews__slide">
                        <p className="swiper-reviews__item">{review.text}</p>
                    </SwiperSlide>
                ))}
            </CustomSwiper>

            <Button
                link="https://yandex.ru/maps/org/novaya_era/99357520468/?ll=39.906866%2C59.205287&z=17"
                target="_blank"
            >
                Больше отзывов на Яндекс.Картах
            </Button>
        </div>
    );
}
