import React from "react";
import Nav from "../../Nav";

export default function IntroMenu() {
    const navigation = [
        { text: "Детям", link: "#" },
        { text: "Страшные", link: "#" },
        { text: "Не страшные", link: "#" },
        { text: "Детский праздник", link: "#" },
        { text: "С актёрами", link: "#" },
    ];
    return (
        <div className="intro__menu menu-intro">
            <p>Что я хочу?</p>
            <Nav list={navigation} direction={"vertical"} modificator={"intro__nav"} />
        </div>
    );
}
