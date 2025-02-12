import React, { useState } from "react";
import QuestsSwiper from "../Quests/QuestsSwiper/QuestsSwiper";
import { Navigate, useParams } from "react-router-dom";
import urlMappings from "../../files/url-mapping.json";
import Breadcrumbs from "../Breadcrumbs";
export default function QuestCategory() {
    const [nameMap, setNameMap] = useState(urlMappings);
    const { questCategory } = useParams();
    const category = nameMap[questCategory];
    if (!category) {
        return <Navigate replace to="/404" />; // Или редирект на страницу 404
    }
    return (
        <>
            <div className="quest__category">
                <div className="container">
                    <Breadcrumbs />
                </div>
                <QuestsSwiper
                    category={questCategory}
                    blockTitle={`Квесты ${category}`}
                />
            </div>
        </>
    );
}
