import React from "react";
import Nav from "../Nav";
import { FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaVk } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import useFetch from "../../hooks/useFetch";
export default function Footer() {
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
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__logo">
                    <img src="/img/logo.png" alt="" />
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
                        <li className="body-footer__socials socials">
                            <a target="_blank" href="https://vk.com/newera35">
                                <FaVk />
                            </a>
                            <a
                                target="_blank"
                                href="https://www.tiktok.com/@neweravologda?_t=8qkcbz4Nk0d&_r=1"
                            >
                                <FaTiktok />
                            </a>
                            <a
                                target="_blank"
                                href="https://www.instagram.com/new_era_vologda/"
                            >
                                <FaInstagram />
                            </a>
                        </li>
                    </ul>
                </div>
                <p className="footer__copyright">
                    © {new Date().getFullYear()} Новая Эра
                </p>
            </div>
        </footer>
    );
}
