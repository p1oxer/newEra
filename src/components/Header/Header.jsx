import React, { useEffect } from "react";
import HeaderNav from "./HeaderNav";
import Burger from "./Burger";
import { Link } from "react-router-dom";

export default function Header() {
    const navigation = [
        { text: "Главная", link: "/" },

        { text: "Хоррор", link: "horror" },
        { text: "Приключения", link: "adventures" },
        { text: "День рождения", link: "birthday" },
        { text: "Школьный класс/Выпускной", link: "graduation" },
        { text: "Корпоратив", link: "graduation" },
        { text: "Подарочный сертификат", link: "sertificate" },
        { text: "Контакты", link: "contacts" },
        { text: "Информация", link: "information" },
    ];
    // useEffect(() => {
    //     if (document.getElementById("quests")) {
    //         navigation.unshift({
    //             text: "Квесты",
    //             scrollTo: "quests",
    //             link: "",
    //         });
    //     } else {
    //         return;
    //     }
    // }, []);

    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="header__body body-header">
                        <Link to={"/"} className="body-header__logo">
                            <img src="/img/logo.png" alt="" />
                        </Link>
                        <HeaderNav
                            list={navigation}
                            direction={"horizontal"}
                            modificator={"header__nav"}
                        />
                        <a href="tel:+79095984080" className="body-header__phone link">
                            +7 (909) 598-40-80
                        </a>
                        <Burger />
                    </div>
                </div>
            </header>
        </>
    );
}
