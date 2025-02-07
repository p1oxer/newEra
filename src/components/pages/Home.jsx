import React from "react";
import Intro from "../Intro/Intro";
import QuestsSwiper from "../Quests/QuestsSwiper/QuestsSwiper";

export default function Home() {
    return (
        <>
            <Intro />
            <QuestsSwiper block={true} />
        </>
    );
}
