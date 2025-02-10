import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import BlockTitle from "../UI/BlockTitle";
export default function Sertificate() {
    return (
        <section className="sertificate page">
            <div className="container">
                <BlockTitle title={"Подарочные сертификаты"} />
                <div className="sertificate__body body-sertificate">
                    <Swiper className="body-sertificate__swiper">
                        <SwiperSlide className="body-sertificate__slide">
                            <div className="body-sertificate__slide-body">
                                <img src="/img/Sertificates/01.jpg" alt="" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="body-sertificate__slide">
                            <div className="body-sertificate__slide-body">
                                <img src="/img/Sertificates/02.jpg" alt="" />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                    <div className="body-sertificate__content">
                        <p>
                            <span>1.</span> Сертификат дает право на прохождение одного
                            квеста на выбор : “Дитя апокалипсиса” (14+) , “Блогеры:
                            загадки старого дома” (8+), "Сон" (9+) и "Кома" (14+).
                        </p>
                        <p>
                            <span>2.</span> Участники до 13 лет проходят квест в
                            сопровождении родителей или дополнительного аниматора
                            (аниматор оплачивается отдельно)
                        </p>
                        <p>
                            <span>3.</span> Если количество участников больше, чем указано
                            в сертификате, доплата 800 рублей/участник
                        </p>
                        <p>
                            <span>4.</span> Необходимо предварительно забронировать время
                            игры в группе <a target="_blank" href="https://vk.com/newera35">vk.com/newera35</a>{" "}
                            или по телефону
                        </p>
                        <p>
                            <span>5.</span> Сертификат действителен на одну игру
                        </p>
                        <p>
                            <span>6.</span> Срок действия сертификата 6 месяцев
                        </p>
                        <p>
                            <span>7.</span> Скидки, указанные в группе, не
                            распространяются на игры по сертификату
                        </p>
                        <p>
                            <span>8.</span> Адрес квеста "Блогеры: загадки старого дома" и
                            "Дитя Апокалипсиса" : ул. Зосимовская, д. 7, 3 этаж, офис 301
                            Адрес квеста "Сон" и "Кома" : ул. Герцена, д. 105 б
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
