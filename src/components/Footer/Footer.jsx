import React from "react";
import Nav from "../Nav";
import { FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaVk } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
export default function Footer() {
    const navigation = [
        { text: "Главная", link: "/" },
        { text: "Хоррор", link: "quests/horror" },
        { text: "Приключения", link: "quests/adventures" },
        { text: "День рождения", link: "birthday" },
        { text: "Школьный класс/Выпускной", link: "graduation" },
        { text: "Корпоратив", link: "graduation" },
        { text: "Подарочный сертификат", link: "sertificate" },
        { text: "Контакты", link: "contacts" },
        { text: "Информация", link: "information" },
    ];
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__logo"><img src="/img/logo.png" alt="" /></div>
                <div className="footer__body body-footer">
                    
                    <Nav
                        modificator={"body-footer__nav"}
                        direction={"vertical"}
                        list={navigation}
                    />
                    <ul className="body-footer__list">
                        <li>
                            <FaPhone />
                            <a className="link" href="tel:+79095984080">
                                +7 (909) 598-40-80
                            </a>
                        </li>
                        <li>
                            <FaLocationDot />
                            г. Вологда, ул. Зосимовская 7 | Герцена 105Б
                        </li>
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
