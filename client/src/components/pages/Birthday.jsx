import React from "react";
import { birthdayOffers } from "../../files/OffersData";
import Offers from "../Offers/Offers";
import Breadcrumbs from "../Breadcrumbs";
import useFetch from "../../hooks/useFetch";

export default function Birthday() {
    const { data: birthdayOffers, isLoading, error } = useFetch("birthday_offers");
    
        if (isLoading) {
            return <p>Загрузка...</p>;
        }
    
        if (error) {
            console.error("Ошибка загрузки", error);
            return <p>Ошибка при загрузке</p>;
        }
    
        const birthdayOffersList = birthdayOffers?.length > 0 ? birthdayOffers : [];
    return (
        <section className="group page">
            <div className="container">
                <Breadcrumbs />
                <h1>
                    День Рождения в <span>Новой Эре</span>
                </h1>

                <Offers offers={birthdayOffersList} />
                <div className="group__text">
                    <p>
                        Участники до 12 лет включительно проходят квест в сопровождении
                        одного взрослого(старше 18 лет) или дополнительного
                        сопровождающего.
                    </p>
                    <p>
                        <span>Квест на выбор:</span> 1. «Дитя апокалипсиса» 14+ 2.
                        «Блогеры: загадки старого дома» 8+ 3. «Кома» 14+ 4 «Сон» 9+
                    </p>
                    <p>
                        <span>Шоу программа на выбор:*</span>
                    </p>
                    <p>- Шоу мыльные пузыри</p>
                    <p>- Шоу профессора Чудакова (химия-физика)</p>
                    <p>- Фокусник</p>
                    <p>
                        <span>В КОМНАТУ ОТДЫХА входит:</span>
                    </p>
                    <p>- Удобное пространство для застолья на 15 сидячих мест</p>
                    <p>- Сега</p>
                    <p>- Игра мафия*</p>

                    <p>- Горячая и холодная питьевая вода</p>
                    <p>- Чай</p>
                    <p>- Салфетки</p>
                    <p>- Столовые приборы, одноразовая посуда</p>
                    <p>- Микроволновка</p>
                    <p>
                        <span>Действует ежедневно.</span>
                    </p>
                    <p>
                        Есть возможность принести свои угощения, фрукты или заказать пиццу
                        для празднования в комнате отдыха.
                    </p>
                    <p>Любая музыка на ваш выбор.</p>
                    <p>
                        Скидки, указанные в группе, не распространяются на пакет "Для
                        больших компаний"
                    </p>
                </div>
            </div>
        </section>
    );
}
