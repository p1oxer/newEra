import React from "react";
import { Link } from "react-router-dom";
import { translit } from "../functions/translit";
export default function Nav({ direction, list, modificator }) {
    modificator = modificator || "";
    return (
        <nav className={`nav ${modificator}`}>
            <ul
                className={
                    direction == "vertical" ? `nav-list vertical` : `nav-list horizontal`
                }
            >
                {list.map((item, index) => {
                    return (
                        <li key={index} className="nav-item">
                            <Link to={item.link} className="nav-link link">
                                {item.text}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
