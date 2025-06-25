import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Burger() {
    const [isOpened, setIsOpened] = useState(false);

    function handleClick() {
        setIsOpened(!isOpened);
        document.body.classList.toggle("menu-open");
    }

    function handleLinkClick() {
        setIsOpened(false);
        document.body.classList.remove("menu-open");
    }

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
        <div className={isOpened ? "header__menu menu" : "header__menu menu"}>
            <button onClick={handleClick} type="button" className="menu__icon icon-menu">
                <span></span>
            </button>
            <nav className="menu__body">
                <ul className="menu__list">
                    {navigation.map((item, index) => {
                        return (
                            <li key={index} className="menu__item">
                                <Link to={item.link} onClick={handleLinkClick}>
                                    {item.text}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}
