import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { FreeMode, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

import { FaVk } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { TbMoodKid } from "react-icons/tb";
import { FaSkull } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";

import AttributeQuest from "../Quests/AttributeQuest";
import Breadcrumbs from "../Breadcrumbs";
import ButtonLink from "../UI/ButtonLink";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import Video from "../UI/Video";
import QuestsSwiper from "../Quests/QuestsSwiper/QuestsSwiper";
import ReactMarkdown from "react-markdown";
// Хуки и утилиты
import useFetch from "../../hooks/useFetch";
import { sanitizeHTML } from "../../hooks/sanitize";
import { getQuestIdBySlug } from "../../functions/questService";

export default function QuestsPage() {
    const { questId } = useParams(); // это slug, например 'koma'
    const [realId, setRealId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchId = async () => {
            const { id, error } = await getQuestIdBySlug(questId);
            if (error === "not-found") {
                navigate("/404"); // Редирект на /404
            } else {
                setRealId(id);
            }
        };

        fetchId();
        setLoading(false);
    }, [questId, navigate]);

    // Используем realId для загрузки данных через useFetch
    const {
        data: currentQuest,
        isLoading,
        error,
    } = useFetch(realId ? `quests/${realId}` : null);

    if (loading || isLoading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка загрузки квеста</div>;
    }

    if (!currentQuest) {
        return <div>Квест не найден</div>;
    }

    return (
        <section className="quest page">
            {currentQuest.video && (
                <Modal open={open} onClose={() => setOpen(false)}>
                    <Video
                        video={`${import.meta.env.VITE_UPLOADS_URL}${currentQuest.video}`}
                    />
                </Modal>
            )}
            <div className="container">
                <Breadcrumbs />
                <div className="quest__body body-quest">
                    {currentQuest.img.length > 0 && (
                        <div className="body-quest__gallery">
                            {/* Основной слайдер */}
                            <Swiper
                                spaceBetween={10}
                                thumbs={{ swiper: thumbsSwiper }}
                                modules={[FreeMode, Thumbs]}
                                className="body-quest__swiper"
                            >
                                {currentQuest.img.map((img, index) => (
                                    <SwiperSlide
                                        className="body-quest__slide"
                                        key={index}
                                    >
                                        <div className="body-quest__img">
                                            <picture>
                                                <source
                                                    type="image/avif"
                                                    srcSet={`${
                                                        import.meta.env.VITE_UPLOADS_URL
                                                    }${img.split(".")[0]}-540.avif`}
                                                    media={"(min-width:320px)"}
                                                />
                                                <source
                                                    type="image/webp"
                                                    srcSet={`${
                                                        import.meta.env.VITE_UPLOADS_URL
                                                    }${img.split(".")[0]}-540.webp`}
                                                    media={"(min-width:320px)"}
                                                />
                                                <img
                                                    src={`${
                                                        import.meta.env.VITE_UPLOADS_URL
                                                    }${img}`}
                                                    alt={`Изображение ${index + 1}`}
                                                    loading="lazy"
                                                />
                                            </picture>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* Превью */}
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={10}
                                slidesPerView={4}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Thumbs]}
                                className="body-quest__thumbs"
                            >
                                {currentQuest.img.map((img, index) => (
                                    <SwiperSlide
                                        className="body-quest__slide"
                                        key={index}
                                    >
                                        <div className="body-quest__img">
                                            <picture>
                                                <source
                                                    type="image/avif"
                                                    srcSet={`${
                                                        import.meta.env.VITE_UPLOADS_URL
                                                    }${img.split(".")[0]}-540.avif`}
                                                    media={"(min-width:320px)"}
                                                />
                                                <source
                                                    type="image/webp"
                                                    srcSet={`${
                                                        import.meta.env.VITE_UPLOADS_URL
                                                    }${img.split(".")[0]}-540.webp`}
                                                    media={"(min-width:320px)"}
                                                />
                                                <img
                                                    src={`${
                                                        import.meta.env.VITE_UPLOADS_URL
                                                    }${img}`}
                                                    alt={`Изображение ${index + 1}`}
                                                    loading="lazy"
                                                />
                                            </picture>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    )}

                    <div className="body-quest__content">
                        <span className="body-quest__name">{currentQuest.title}</span>
                        <div className="body-quest__description">
                            {
                                <ReactMarkdown>
                                    {sanitizeHTML(currentQuest.description)}
                                </ReactMarkdown>
                            }
                        </div>
                        <div className="body-quest__buttons">
                            {currentQuest.link && (
                                <ButtonLink target="_blank" link={currentQuest.link}>
                                    Забронировать <FaVk size={25} />
                                </ButtonLink>
                            )}

                            {currentQuest.video && (
                                <Button onClick={() => setOpen(true)}>
                                    Трейлер квеста
                                </Button>
                            )}
                        </div>
                        <div className="quest__attributes attributes-quest">
                            {currentQuest.people && (
                                <AttributeQuest text={currentQuest.people}>
                                    <FaPeopleGroup />
                                </AttributeQuest>
                            )}
                            {currentQuest.age && (
                                <AttributeQuest text={currentQuest.age}>
                                    <TbMoodKid />
                                </AttributeQuest>
                            )}
                            {currentQuest.difficulty && (
                                <AttributeQuest text={currentQuest.difficulty}>
                                    <FaSkull />
                                </AttributeQuest>
                            )}
                            {currentQuest.time && (
                                <AttributeQuest text={currentQuest.time}>
                                    <IoTimeOutline />
                                </AttributeQuest>
                            )}
                            {currentQuest.address && (
                                <AttributeQuest text={currentQuest.address}>
                                    <FaLocationDot />
                                </AttributeQuest>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Рекомендуемые квесты */}
            <QuestsSwiper category={"all"} block={true} />
        </section>
    );
}
