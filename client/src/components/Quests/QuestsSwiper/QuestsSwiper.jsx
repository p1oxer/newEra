import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import QuestsSwiperCard from "./QuestsSwiperCard";
import BlockTitle from "../../UI/BlockTitle";
import SwiperButton from "../../UI/SwiperButton";

// Хук
import useFetch from "../../../hooks/useFetch";

export default function QuestsSwiper({ block, category, blockTitle }) {
    // Ссылка на Swiper
    const swiperRef = useRef();
    const swiperButtonPrev = useRef(null);
    const swiperButtonNext = useRef(null);
    const [isButtonVisible, setIsButtonVisible] = useState(false);

    // Получаем данные с API
    const { data: quests = [], isLoading, error } = useFetch(`quests`);

    // Фильтрация квестов по категории
    const filteredQuests = React.useMemo(() => {
        if (!quests) return [];
        return category === "all" || !category
            ? quests
            : quests.filter((quest) => quest?.category === category);
    }, [quests, category]);

    // Логика для кнопок навигации
    const handleButtonDisabling = (swiper) => {
        if (swiper.isBeginning) {
            swiperButtonPrev.current?.classList.add("swiper-btn-disabled");
        } else {
            swiperButtonPrev.current?.classList.remove("swiper-btn-disabled");
        }

        if (swiper.isEnd) {
            swiperButtonNext.current?.classList.add("swiper-btn-disabled");
        } else {
            swiperButtonNext.current?.classList.remove("swiper-btn-disabled");
        }
    };

    // Проверяем наличие слайдов после изменения filteredQuests
    useEffect(() => {
        const swiper = swiperRef.current;
        if (swiper) {
            const checkButtonVisibility = () => {
                const canScroll = swiper.slides.length > 0 && !swiper.isLocked;
                setIsButtonVisible(canScroll);
                handleButtonDisabling(swiper);
            };

            // Вызываем проверку после рендера слайдов
            const timer = setTimeout(checkButtonVisibility, 500); // небольшая задержка, чтобы дать Swiper время отрендерить слайды

            // Назначаем resize listener
            window.addEventListener("resize", checkButtonVisibility);

            return () => {
                clearTimeout(timer);
                window.removeEventListener("resize", checkButtonVisibility);
            };
        }
    }, [filteredQuests]);

    if (isLoading) {
        return <div>Загрузка квестов...</div>;
    }

    if (error) {
        return <div>Ошибка загрузки квестов</div>;
    }

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
                                onClick={() => swiperRef.current?.slidePrev()}
                                ref={swiperButtonPrev}
                            />
                            <SwiperButton
                                direction={"next"}
                                modificator={"quests-swiper"}
                                onClick={() => swiperRef.current?.slideNext()}
                                ref={swiperButtonNext}
                            />
                        </div>
                    )}
                </div>

                <Swiper
                    onReachBeginning={() =>
                        swiperButtonPrev.current?.classList.add("swiper-btn-disabled")
                    }
                    onReachEnd={() =>
                        swiperButtonNext.current?.classList.add("swiper-btn-disabled")
                    }
                    onSlideChange={(swiper) => handleButtonDisabling(swiper)}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                        handleButtonDisabling(swiper);
                    }}
                    modules={[Navigation]}
                    navigation={{
                        prevEl: ".quests-swiper__button-prev",
                        nextEl: ".quests-swiper__button-next",
                    }}
                    className="swiper-quests"
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        565: { slidesPerView: 2, spaceBetween: 20 },
                        900: { slidesPerView: 3, spaceBetween: 20 },
                        1400: { slidesPerView: 4, spaceBetween: 30 },
                    }}
                >
                    {filteredQuests.map((item) => (
                        <SwiperSlide key={item.id} className="swiper-quests__slide">
                            <QuestsSwiperCard
                                category={item.category}
                                img={Array.isArray(item.img) ? item.img[0] : ""}
                                name={item.title}
                                description={item.small_description || item.description}
                                difficulty={item.difficulty}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
