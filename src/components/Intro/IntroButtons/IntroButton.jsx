import React from "react";

export default function IntroButton({ text, image, children }) {
    return (
        <a href="#" className="intro__button button-intro">
            <div className="button-intro__text">{text}</div>
            <div className="button-intro__image">
                {/* <img src={`/img/IntroButtons/${image}.png`} alt=""></img> */}
                {children}
            </div>
        </a>
    );
}
