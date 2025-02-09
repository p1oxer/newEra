import React from "react";
import { Link } from "react-router-dom";
import Button from "../../UI/Button";

export default function IntroButton({
    text,
    image,
    children,
    link,
    scrollTo,
    linkOuter,
}) {
    return (
        <>
            {link && (
                <Link to={link} className="intro__button button-intro">
                    <div className="button-intro__text">{text}</div>
                    <div className="button-intro__image">
                        {/* <img src={`/img/IntroButtons/${image}.png`} alt=""></img> */}
                        {children}
                    </div>
                </Link>
            )}
            {scrollTo && (
                <a href={`#${scrollTo}`} className="intro__button button-intro">
                    <div className="button-intro__text">{text}</div>
                    <div className="button-intro__image">
                        {/* <img src={`/img/IntroButtons/${image}.png`} alt=""></img> */}
                        {children}
                    </div>
                </a>
            )}
            {linkOuter && (
                <a
                    target="_blank"
                    className="intro__button button-intro button-intro__link"
                    href={linkOuter}
                >
                    <div className="button-intro__text">{text}</div>
                    <div className="button-intro__image">
                        {/* <img src={`/img/IntroButtons/${image}.png`} alt=""></img> */}
                        {children}
                    </div>
                </a>
            )}
        </>
    );
}
