import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import QuestsSwiperCard from "./QuestsSwiperCard";
import BlockTitle from "../../UI/BlockTitle";
import SwiperButton from "../../UI/SwiperButton";
import questsData from "../../../files/questsData.json";
export default function QuestsSwiper({ block, category, blockTitle }) {
    // Обработка видимости кнопок
    const swiperRef = useRef();
    const swiperButtonPrev = useRef(null);
    const swiperButtonNext = useRef(null);

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

    // Обработка и фильтрация квестов
    const parsedQuestsData =
        typeof questsData === "string" ? JSON.parse(questsData) : questsData;
    const questArray = Object.values(parsedQuestsData);
    const filteredQuests = questArray.filter((item) => {
        if (category === "all" || !category) {
            return true; 
        } else {
            return item.category === category; 
        }
    });

    return (
        <section
            id="quests"
            className={block ? "quests__swiper block" : "quests__swiper"}
        >
            <div className="container">
                <div className="quests__swiper-top">
                    <BlockTitle title={blockTitle ?? "Наши квесты"} />
                    {isButtonVisible && (
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
                    )}
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
                    {filteredQuests.map((item) => {
                        return (
                            <SwiperSlide
                                key={item.img[0]}
                                className="swiper-quests__slide"
                            >
                                <QuestsSwiperCard
                                    category={item.category}
                                    img={item.img[0]}
                                    name={item.title}
                                    description={item.smallDescription}
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
