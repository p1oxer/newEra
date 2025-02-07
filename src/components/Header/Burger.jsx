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
                        <Link to={"/"}>Страшные</Link>
                    </li>
                    <li className="menu__item">
                        <Link to={"/"}>Не страшные</Link>
                    </li>
                    <li className="menu__item">
                        <Link to={"/"}>Детям</Link>
                    </li>
                    <li className="menu__item">
                        <Link to={"/"}>Детский праздник</Link>
                    </li>
                    <li className="menu__item">
                        <Link to={"/"}>Подарочные сертификаты</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
