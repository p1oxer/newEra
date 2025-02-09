import React, { useState } from "react";
import QuestsSwiper from "../Quests/QuestsSwiper/QuestsSwiper";
import { useParams } from "react-router-dom";
import urlMappings from "../../files/url-mapping.json";
export default function QuestCategory() {
    const [nameMap, setNameMap] = useState(urlMappings);
    const {questCategory} = useParams();
    const category = nameMap[questCategory];
    return (
        <>
            <div className="quest__category">
                <QuestsSwiper category={questCategory} blockTitle={`Квесты ${category}`}/>
            </div>
        </>
    );
}
