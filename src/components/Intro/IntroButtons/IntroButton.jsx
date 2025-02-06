import React from "react";

export default function IntroButton({ text, image }) {
    return (
        <a href="#" className="intro__button button-intro">
            <div className="button-intro__text">{text}</div>
            <div className="button-intro__image">
                <img src={`/img/IntroButtons/${image}.png`} alt=""></img>
            </div>
        </a>
    );
}
