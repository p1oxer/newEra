import React from "react";
import Intro from "../Intro/Intro";
import QuestsSwiper from "../Quests/QuestsSwiper/QuestsSwiper";
import BlockTitle from "../UI/BlockTitle";

export default function Home() {
    return (
        <>
            <Intro />
            <QuestsSwiper block={true} />
            <div className="map block">
                <div className="container">
                    <BlockTitle title={"Где нас найти?"} />
                    <iframe
                        src="https://yandex.ru/map-widget/v1/?um=constructor%3A9432c79b0f2bd8f9a9c0b46022ffaa2bc518df236b007c98c391100903196b60&amp;source=constructor"
                        width="100%"
                        height="496"
                    ></iframe>
                </div>
            </div>
        </>
    );
}
