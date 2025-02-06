import React from "react";

export default function AttributeQuest({ children, text }) {
    return (
        <div className="attributes-quest__item">
            <div className="attributes-quest__img">{children}</div>
            <p className="attributes-quest__text">{text}</p>
        </div>
    );
}
