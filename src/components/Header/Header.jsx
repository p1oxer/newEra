import React from "react";
import HeaderNav from "../Nav";

export default function Header() {
    const navigation = [
        { text: "Главная", link: "/" },
        { text: "Страница", link: "#" },
        { text: "Страница", link: "#" },
    ];
    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="header__body body-header">
                        <div className="body-header__logo"></div>
                        <HeaderNav list={navigation} direction={"horizontal"} />
                        <a href="tel:+79095984080" className="body-header__phone link">
                            +7 (909) 598-40-80
                        </a>
                    </div>
                </div>
            </header>
        </>
    );
}
