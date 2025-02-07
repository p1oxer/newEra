import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import QuestsSwiperCard from "./QuestsSwiperCard";
import BlockTitle from "../../UI/BlockTitle";
import SwiperButton from "../../UI/SwiperButton";

export default function QuestsSwiper({block}) {
    const swiperRef = useRef();
    const swiperButtonPrev = useRef(null);
    const swiperButtonNext = useRef(null);
    const quests = [
        {
            img: "koma",
            name: "Кома",
            description:
                'Кол-во игроков 2-15 | Возраст 14+, 18+ | Режим "Медиум" - 5 персонажей | Режим " Хард" - 5 персонажей | Продолжительность - 60-90 минут | Квест находится по адресу Герцена, 105Б',
            difficulty: "MEDIUM | HARD",
        },
        {
            img: "son",
            name: "Сон",
            description:
                'Кол-во игроков 2-15 | Возраст 9+ | Режим "Лайт" - с участием 3-ёх персонажей | Продолжительность - 60-90 минут | Квест находится по адресу Герцена, 105Б',
            difficulty: "LITE",
        },
        {
            img: "ditya",
            name: "Дитя апокалипсиса",
            description:
                'Кол-во игроков 2-12 | Возраст 14+, 18+ | Режим "Медиум" - 1 персонаж | Режим " Хард" - 1 персонаж | Продолжительность - 60-90 минут | Квест находится по адресу Зосимовская, 7',
            difficulty: "MEDIUM | HARD",
        },
        {
            img: "bloggers",
            name: "Блогеры: загадки старого дома",
            description:
                'Кол-во игроков 2-12 | Возраст 8+ | Режим "Лайт" - с участием 1-ого персонажа | Продолжительность - 60-90 минут | Квест находится по адресу Зосимовская, 7',
            difficulty: "LITE",
        },
    ];

    function handleButtonDisabling(swiper) {
        if (swiper.isBeginning) {
            swiperButtonPrev.current?.classList.add("swiper-btn-disabled");
        } else {
            swiperButtonPrev.current?.classList.remove("swiper-btn-disabled");
        }
        if (swiper.isEnd) {
            // swiperButtonNext.current?.classList.add("swiper-btn-disabled");
        } else {
            swiperButtonNext.current?.classList.remove("swiper-btn-disabled");
        }
    }
    return (
        <section className={block ? "quests__swiper block" : "quests__swiper"}>
            <div className="container">
                <div className="quests__swiper-top">
                    <BlockTitle title={"Наши квесты"} />
                    <div className="swiper-buttons">
                        <SwiperButton
                            direction={"prev"}
                            modificator={"quests-swiper"}
                            onClick={() => swiperRef.current.slidePrev()}
                            ref={swiperButtonPrev}
                        />
                        <SwiperButton
                            direction={"next"}
                            modificator={"quests-swiper"}
                            onClick={() => swiperRef.current.slideNext()}
                            ref={swiperButtonNext}
                        />
                    </div>
                </div>
                <Swiper
                    onReachBeginning={() => {
                        swiperButtonPrev.current?.classList.add("swiper-btn-disabled");
                    }}
                    onReachEnd={() => {
                        swiperButtonNext.current?.classList.add("swiper-btn-disabled");
                    }}
                    onSlideChange={(swiper) => handleButtonDisabling(swiper)}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                        handleButtonDisabling(swiper);
                    }}
                    modules={[Navigation]}
                    navigation={{
                        prevEl: "quests-swiper__button-prev",
                        nextEl: "quests-swiper__button-next",
                    }}
                    className="swiper-quests"
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                        },
                        565: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        900: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1400: {
                            slidesPerView: 4,
                            spaceBetween: 30,
                        },
                    }}
                >
                    {quests.map((item) => {
                        return (
                            <SwiperSlide key={item.img} className="swiper-quests__slide">
                                <QuestsSwiperCard
                                    img={item.img}
                                    name={item.name}
                                    description={item.description}
                                    difficulty={item.difficulty}
                                />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </section>
    );
}
