import React from "react";
import Nav from "../Nav";
import { FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaVk, FaInstagram, FaYoutube, FaTelegramPlane, FaTiktok } from "react-icons/fa";
import useFetch from "../../hooks/useFetch";
import Image from "../UI/Image";
export default function Footer() {
    const { data: contacts, isLoading, error } = useFetch("contacts");
    const { data: socials } = useFetch("socials");

    if (isLoading) {
        return <p>Загрузка...</p>;
    }

    if (error) {
        console.error("Ошибка загрузки", error);
        return <p>Ошибка при загрузке</p>;
    }

    const socialsList = socials?.length > 0 ? socials : [];
    const contactsList = contacts?.length > 0 ? contacts : [];

    const addresses = contactsList.filter((c) => c.info_type === "address");
    const phones = contactsList.filter((c) => c.info_type === "phone");

    const navigation = [
        { text: "Главная", link: "/" },
        { text: "Хоррор", link: "quests/horror" },
        { text: "Приключения", link: "quests/adventures" },
        { text: "День рождения", link: "birthday" },
        { text: "Школьный класс/Выпускной", link: "group" },
        { text: "Корпоратив", link: "group" },
        { text: "Подарочный сертификат", link: "sertificate" },
        { text: "Контакты", link: "contacts" },
        { text: "Информация", link: "information" },
    ];

    const socialIcons = {
        vk: <FaVk />,
        instagram: <FaInstagram />,
        youtube: <FaYoutube />,
        telegram: <FaTelegramPlane />,
        tiktok: <FaTiktok />,
    };
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__logo">
                    <Image sizes={["500"]} alt={"Логотип"} src={"/img/logo.png"} />
                </div>
                <div className="footer__body body-footer">
                    <Nav
                        modificator={"body-footer__nav"}
                        direction={"vertical"}
                        list={navigation}
                    />
                    <ul className="body-footer__list">
                        {phones.length > 0 &&
                            phones.map((phone) => (
                                <li key={phone.id}>
                                    <FaPhone />
                                    <a
                                        className="link"
                                        href={`tel:${phone.value.replace(/[^+\d]/g, "")}`}
                                    >
                                        {phone.value}
                                    </a>
                                </li>
                            ))}
                        {addresses.length > 0 &&
                            addresses.map((address) => (
                                <li key={address.id}>
                                    <FaLocationDot />
                                    {address.value}
                                </li>
                            ))}
                        {socialsList.length > 0 && (
                            <li className="body-footer__socials socials">
                                {socialsList.map((item) => (
                                    <a key={item.id} target="_blank" href={item.url}>
                                        {socialIcons[item.network_type] || "??"}
                                    </a>
                                ))}
                            </li>
                        )}
                    </ul>
                </div>
                <p className="footer__copyright">
                    © {new Date().getFullYear()} Новая Эра
                </p>
            </div>
        </footer>
    );
}
