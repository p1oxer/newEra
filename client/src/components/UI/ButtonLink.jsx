import React from "react";
import { Link } from "react-router-dom";

export default function ButtonLink({ text, link, children, target }) {
    return (
        <Link target={target} to={link} className="button" href={"#"}>
            {text && text}
            {children && children}
        </Link>
    );
}
