import React, { useState } from "react";
import QuestsSwiper from "../Quests/QuestsSwiper/QuestsSwiper";
import { Navigate, useParams } from "react-router-dom";
import urlMappings from "../../files/url-mapping.json";
import Breadcrumbs from "../Breadcrumbs";
import useSEO from "../../hooks/useSEO";
import BlockTitle from "../UI/BlockTitle";

export default function QuestCategory() {
    const [nameMap, setNameMap] = useState(urlMappings);
    const { questCategory } = useParams();
    const category = nameMap[questCategory];

    // Используем SEO для категории квестов
    useSEO("questCategory", {
        title: category,
        slug: questCategory,
    });

    if (!category) {
        return <Navigate replace to="/404" />; // Или редирект на страницу 404
    }
    return (
        <>
            <div className="quest__category">
                <div className="container">
                    <Breadcrumbs />
                    <BlockTitle title={`Квесты ${category}`} level={1} />
                </div>
                <QuestsSwiper category={questCategory} blockTitle={null} />
            </div>
        </>
    );
}
