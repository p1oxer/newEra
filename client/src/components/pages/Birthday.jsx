import React from "react";
import Offers from "../Offers/Offers";
import Breadcrumbs from "../Breadcrumbs";
import useFetch from "../../hooks/useFetch";
import ReactMarkdown from "react-markdown";
import { sanitizeHTML } from "../../hooks/sanitize";

export default function Birthday() {
    const { data: birthdayOffers, isLoading, error } = useFetch("birthday_offers");
    const { data: birthdayDescription } = useFetch("birthday-description");
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
                    <ReactMarkdown>{sanitizeHTML(birthdayDescription?.description)}</ReactMarkdown>
                </div>
            </div>
        </section>
    );
}
