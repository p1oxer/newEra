import React from "react";
import BlockTitle from "../UI/BlockTitle";
import Breadcrumbs from "../Breadcrumbs";

export default function Contacts() {
    return (
        <section className="contacts page">
            <div className="container">
                <Breadcrumbs />
                <BlockTitle title={"Контакты"} />
                <div className="contacts__body body-contacts">Contacts</div>
            </div>
        </section>
    );
}
