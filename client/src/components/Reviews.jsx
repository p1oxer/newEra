import React, { useEffect, useState } from "react";
import axios from "axios";
import { SwiperSlide } from "swiper/react";
import CustomSwiper from "./UI/CustomSwiper";
import Button from "./UI/ButtonLink";
export default function Reviews() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios
            .get("https://new-era-api.loca.lt/api/reviews")
            .then((response) => {
                const texts = response.data.map((review) => review.text);
                setReviews(texts);
            })
            .catch((error) => {
                console.error("Ошибка загрузки отзывов:", error);
            });
    }, []);
    console.log(reviews);
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
        <div className="reviews">
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
            <Button
                link={
                    "https://yandex.ru/maps/org/novaya_era/99357520468/?ll=39.906866%2C59.205287&z=17"
                }
                target={"_blank"}
            >
                Больше отзывов на яндекс картах
            </Button>
        </div>
    );
}
