import React from "react";
import BlockTitle from "../UI/BlockTitle";
import Breadcrumbs from "../Breadcrumbs";
import { FaVk } from "react-icons/fa";
import useFetch from "../../hooks/useFetch";

export default function Contacts() {
    const { data: contacts, isLoading, error } = useFetch("contacts");
    if (isLoading) {
        return <p>Загрузка...</p>;
    }

    if (error) {
        console.error("Ошибка загрузки", error);
        return <p>Ошибка при загрузке</p>;
    }

    const contactsList = contacts?.length > 0 ? contacts : [];

    const addresses = contactsList.filter((c) => c.info_type === "address");
    const phones = contactsList.filter((c) => c.info_type === "phone");
    const workingHours = contactsList.filter((c) => c.info_type === "working_hours");

    return (
        <section className="contacts page">
            <div className="container">
                <Breadcrumbs />
                <BlockTitle title={"Контакты"} />
                <div className="contacts__body body-contacts">
                    <div className="contacts__content content-contacts">
                        <ul className="content-contacts__list">
                            {addresses.length > 0 && (
                                <li className="content-contacts__item">
                                    <p className="content-contacts__name">Адрес</p>
                                    {addresses.map((addr) => {
                                        return (
                                            <p
                                                key={addr.id}
                                                className="content-contacts__link"
                                            >
                                                {addr.value}
                                            </p>
                                        );
                                    })}
                                </li>
                            )}
                            {phones.length > 0 && (
                                <li className="content-contacts__item">
                                    <p className="content-contacts__name">Телефон</p>
                                    {phones.map((phone) => (
                                        <a
                                            key={phone.id}
                                            href={`tel:${phone.value.replace(
                                                /[^+\d]/g,
                                                ""
                                            )}`}
                                            className="content-contacts__link hover"
                                        >
                                            {phone.value}
                                        </a>
                                    ))}
                                </li>
                            )}
                            {workingHours.length > 0 && (
                                <li className="content-contacts__item">
                                    {workingHours.map((item) => (
                                        <React.Fragment key={item.id}>
                                            <p className="content-contacts__name">
                                                Режим работы
                                            </p>
                                            <p className="content-contacts__link">
                                                {item.value}
                                            </p>
                                        </React.Fragment>
                                    ))}
                                </li>
                            )}

                            <li className="content-contacts__item">
                                <p className="content-contacts__name">Социальные сети </p>
                                <p className="content-contacts__link hover">
                                    <a href="https://vk.com/newera35">
                                        <FaVk size={50} />
                                    </a>
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className="contacts__reviews">
                        <div className="contacts__review">
                            <div className="yandex-reviews__text">Герцена 105Б</div>

                            <div
                                className="yandex-reviews"
                                style={{
                                    width: 560,
                                    height: 800,
                                    overflow: "hidden",
                                    position: "relative",
                                }}
                            >
                                <iframe
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        border: "1px solid #e6e6e6",
                                        borderRadius: 8,
                                        boxSizing: "border-box",
                                    }}
                                    src="https://yandex.ru/maps-reviews-widget/99357520468?comments"
                                />
                                <a
                                    href="https://yandex.ru/maps/org/novaya_era/99357520468/"
                                    target="_blank"
                                    style={{
                                        boxSizing: "border-box",
                                        textDecoration: "none",
                                        color: "#b3b3b3",
                                        fontSize: 10,
                                        fontFamily: "YS Text,sans-serif",
                                        padding: "0 16px",
                                        position: "absolute",
                                        bottom: 8,
                                        width: "100%",
                                        textAlign: "center",
                                        left: 0,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        display: "block",
                                        maxHeight: 14,
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    Новая Эра на карте Вологды — Яндекс&nbsp;Карты
                                </a>
                            </div>
                        </div>
                        <div className="contacts__review">
                            <div className="yandex-reviews__text">Зосимовская 7</div>
                            <div
                                className="yandex-reviews"
                                style={{
                                    width: 560,
                                    height: 800,
                                    overflow: "hidden",
                                    position: "relative",
                                }}
                            >
                                <iframe
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        border: "1px solid #e6e6e6",
                                        borderRadius: 8,
                                        boxSizing: "border-box",
                                    }}
                                    src="https://yandex.ru/maps-reviews-widget/40591877687?comments"
                                />
                                <a
                                    href="https://yandex.ru/maps/org/novaya_era/40591877687/"
                                    target="_blank"
                                    style={{
                                        boxSizing: "border-box",
                                        textDecoration: "none",
                                        color: "#b3b3b3",
                                        fontSize: 10,
                                        fontFamily: "YS Text,sans-serif",
                                        padding: "0 16px",
                                        position: "absolute",
                                        bottom: 8,
                                        width: "100%",
                                        textAlign: "center",
                                        left: 0,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        display: "block",
                                        maxHeight: 14,
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    Новая Эра на карте Вологды — Яндекс&nbsp;Карты
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="map">
                        <iframe
                            src="https://yandex.ru/map-widget/v1/?um=constructor%3A9432c79b0f2bd8f9a9c0b46022ffaa2bc518df236b007c98c391100903196b60&amp;source=constructor"
                            width="100%"
                            height="496"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}
