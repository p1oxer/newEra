import React, { useEffect } from "react";
import HeaderNav from "./HeaderNav";
import Burger from "./Burger";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Image from "../UI/Image";

export default function Header() {
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
    useEffect(() => {
        if (document.getElementById("quests")) {
            navigation.unshift({
                text: "Квесты",
                scrollTo: "quests",
                link: "",
            });
        } else {
            return;
        }
    }, []);
    const { data: contacts, isLoading, error } = useFetch("contacts");

    if (error) {
        console.error("Ошибка загрузки", error);
        return <p>Ошибка при загрузке</p>;
    }

    const contactsList = contacts?.length > 0 ? contacts : [];

    const phones = contactsList.filter((c) => c.info_type === "phone");
    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="header__body body-header">
                        <div className="header__top">
                            <Link to={"/"} className="body-header__logo">
                                <Image
                                    sizes={["500"]}
                                    alt={"Логотип"}
                                    src={`${
                                        import.meta.env.VITE_UPLOADS_URL
                                    }/img/logo.png`}
                                    width={200}
                                    height={71}
                                />
                            </Link>
                            {phones.length > 0 && (
                                <a
                                    href={`tel:${phones[0].value.replace(/[^+\d]/g, "")}`}
                                    className="body-header__phone link"
                                >
                                    {phones[0].value}
                                </a>
                            )}
                        </div>

                        <HeaderNav
                            list={navigation}
                            direction={"horizontal"}
                            modificator={"header__nav"}
                        />

                        <Burger />
                    </div>
                </div>
            </header>
        </>
    );
}
