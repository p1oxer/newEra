import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay } from "swiper/modules";
import BlockTitle from "../UI/BlockTitle";
import Breadcrumbs from "../Breadcrumbs";
import useFetch from "../../hooks/useFetch";
import ReactMarkdown from "react-markdown";
import { sanitizeHTML } from "../../hooks/sanitize";
export default function Sertificate() {
    const { data: certificates, isLoading, error } = useFetch("certificates");
    if (isLoading) {
        return <p>Загрузка...</p>;
    }

    if (error) {
        console.error("Ошибка загрузки", error);
        return <p>Ошибка при загрузке</p>;
    }

    const certificatesList = certificates?.length > 0 ? certificates : [];
    return (
        <section className="sertificate page">
            <div className="container">
                <Breadcrumbs />
                <BlockTitle title={"Подарочные сертификаты"} />
                <div className="sertificate__body body-sertificate">
                    {certificatesList[0]?.image_paths?.length > 0 && (
                        <Swiper
                            modules={[Autoplay]}
                            loop={{ enabled: true }}
                            autoplay={{ enabled: true, delay: 3000 }}
                            className="body-sertificate__swiper"
                        >
                            {certificatesList[0].image_paths.map((path, index) => {
                                return (
                                    <SwiperSlide
                                        key={index}
                                        className="body-sertificate__slide"
                                    >
                                        <div className="body-sertificate__slide-body">
                                            <picture>
                                                <source
                                                    srcSet={`${path.split(".")[0]}-560.avif`}
                                                    type="image/avif"
                                                    media="(min-width: 320px)"
                                                />
                                                <source
                                                    srcSet={`${path.split(".")[0]}-560.webp`}
                                                    type="image/webp"
                                                    media="(min-width: 320px)"
                                                />
                                                <img
                                                    src={path}
                                                    alt={`Сертификат ${index}`}
                                                    loading="lazy"
                                                />
                                            </picture>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    )}

                    <div className="body-sertificate__content">
                        <ReactMarkdown>
                            {sanitizeHTML(certificatesList[0]?.text)}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </section>
    );
}
