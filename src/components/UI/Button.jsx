import React from "react";
import { Link } from "react-router-dom";

export default function Button({ text, link, children }) {
    return (
        <Link target="_blank" to={link} className="button" href={"#"}>
            {text && text}
            {children && children}
        </Link>
    );
}
