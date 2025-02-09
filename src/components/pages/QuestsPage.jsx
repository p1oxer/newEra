import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

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
import Button from "../UI/Button";
import questsData from "../../files/questsData.json";
import QuestsSwiper from "../Quests/QuestsSwiper/QuestsSwiper";

export default function QuestsPage() {
    const { questId } = useParams();
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const currentQuest = questsData[questId];

    if (!currentQuest) {
        return <Navigate replace to="/404" />; // Или редирект на страницу 404
    }

    const descriptionParagraphs = currentQuest.description
        .split(";") 
        .map((paragraph, index) => (
            <p key={index} className="body-quest__paragraph">
                {paragraph.trim()}
            </p>
        ));

    return (
        <section className="quest page">
            <div className="container">
                <Breadcrumbs />
                <div className="quest__body body-quest">
                    <div className="body-quest__gallery">
                        <Swiper
                            spaceBetween={10}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Thumbs]}
                            className={"body-quest__swiper"}
                        >
                            {currentQuest.img.map((img) => (
                                <SwiperSlide className="body-quest__slide" key={img}>
                                    <div className="body-quest__img">
                                        <img
                                            src={`/img/QuestsSwiper/${questId}/${img}.jpg`}
                                            alt=""
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            spaceBetween={10}
                            slidesPerView={4}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Thumbs]}
                            className={"body-quest__thumbs"}
                        >
                            {currentQuest.img.map((img) => (
                                <SwiperSlide className="body-quest__slide" key={img}>
                                    <div className="body-quest__img">
                                        <img
                                            src={`/img/QuestsSwiper/${questId}/${img}.jpg`}
                                            alt=""
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="body-quest__content">
                        <span className="body-quest__name">{currentQuest.title}</span>
                        <div className="body-quest__description">
                            {descriptionParagraphs}
                        </div>
                        <Button target={"_blank"} link={currentQuest.link}>
                            Забронировать <FaVk size={25} />
                        </Button>
                        <div className="quest__attributes attributes-quest">
                            <AttributeQuest text={currentQuest.people}>
                                <FaPeopleGroup />
                            </AttributeQuest>
                            <AttributeQuest text={currentQuest.age}>
                                <TbMoodKid />
                            </AttributeQuest>
                            <AttributeQuest text={currentQuest.difficulty}>
                                <FaSkull />
                            </AttributeQuest>
                            <AttributeQuest text={currentQuest.time}>
                                <IoTimeOutline />
                            </AttributeQuest>
                            <AttributeQuest text={currentQuest.address}>
                                <FaLocationDot />
                            </AttributeQuest>
                        </div>
                    </div>
                </div>
                <QuestsSwiper category={"all"} block={true} />
            </div>
        </section>
    );
}
