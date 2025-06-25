import React, { Suspense } from "react";
import Intro from "../Intro/Intro";
import QuestsSwiper from "../Quests/QuestsSwiper/QuestsSwiper";
import BlockTitle from "../UI/BlockTitle";
import Reviews from "../Reviews";
import About from "../About";
import useSEO from "../../hooks/useSEO";

const MapBlock = React.lazy(() => import("../MapBlock"));

export default function Home() {
    useSEO("home");

    return (
        <>
            <Intro />
            <div className="container">
                <BlockTitle
                    title="Новая Эра - Квесты в Вологде"
                    level={1}
                    className="visually-hidden"
                />
            </div>
            <QuestsSwiper block={true} category={"all"} blockTitle={"Наши квесты"} />
            <Reviews />
            <About />
            <Suspense fallback={null}>
                <MapBlock />
            </Suspense>
        </>
    );
}
