import React from "react";
import IntroSwiper from "./IntroSwiper/IntroSwiper";
import IntroButtons from "./IntroButtons/IntroButtons";

export default function Intro() {
    return (
        <>
            <section className="intro">
                <div className="container">
                    <div className="intro__body body-intro">
                        <div className="body-intro__top">
                            <IntroSwiper />
                        </div>
                        <IntroButtons />
                    </div>
                </div>
            </section>
        </>
    );
}
