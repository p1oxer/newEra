import React, { useEffect, useState } from "react";
import Breadcrumbs from "../Breadcrumbs";
import BlockTitle from "../UI/BlockTitle";
import Accordion from "../UI/Accordion";
import axios from "axios";

export default function Information() {
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        axios
            .get("https://new-era-api.loca.lt/api/faq")
            .then((response) => setFaqs(response.data))
            .catch((error) => console.error("Ошибка загрузки FAQ:", error));
    }, []);

    console.log(faqs);
    return (
        <section className="information page">
            <div className="container">
                <Breadcrumbs />
                <div className="faq">
                    <BlockTitle title={"Информация"} />
                    {faqs.map((faq) => {
                        return (
                            <Accordion key={faq.id} title={faq.title}>
                                <text dangerouslySetInnerHTML={{ __html: faq.text }}></text>
                            </Accordion>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
