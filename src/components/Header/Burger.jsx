import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Burger() {
    const [isOpened, setIsOpened] = useState(false);
    function handleClick() {
        setIsOpened(!isOpened);
        document.body.classList.toggle("menu-open");
    }
    return (
        <div className={isOpened ? "header__menu menu" : "header__menu menu"}>
            <button onClick={handleClick} type="button" className="menu__icon icon-menu">
                <span></span>
            </button>
            <nav className="menu__body">
                <ul className="menu__list">
                    <li className="menu__item">
                        <Link to={"/"}>Главная</Link>
                    </li>

                    <li className="menu__item">
                        <Link to={"quests/horror"}>Хоррор</Link>
                    </li>
                    <li className="menu__item">
                        <Link to={"quests/adventures"}>Приключения</Link>
                    </li>
                    <li className="menu__item">
                        <Link to={"birthday"}>День Рождения</Link>
                    </li>
                    <li className="menu__item">
                        <Link to={"group"}>Школьный Класс/Выпускной</Link>
                    </li>
                    <li className="menu__item">
                        <Link to={"group"}>Корпоратив</Link>
                    </li>
                    <li className="menu__item">
                        <Link to={"sertificate"}>Подарочный сертификат</Link>
                    </li>
                    <li className="menu__item">
                        <Link to={"contacts"}>Контакты</Link>
                    </li>
                    <li className="menu__item">
                        <Link to={"information"}>Информация</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
