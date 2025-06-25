import React, { useEffect, useState } from "react";
import Breadcrumbs from "../Breadcrumbs";
import BlockTitle from "../UI/BlockTitle";
import Accordion from "../UI/Accordion";
import useFetch from "../../hooks/useFetch";
import { sanitizeHTML } from "../../hooks/sanitize";
import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import useSEO from "../../hooks/useSEO";

export default function Information() {
    useSEO("information");

    const { data: faqs, isLoading, error } = useFetch("faq");


    if (error) {
        console.error("Ошибка загрузки", error);
        return <p>Ошибка при загрузке</p>;
    }

    const faqList = faqs?.length > 0 ? faqs : [];
    return (
        <section className="information page">
            <div className="container">
                <Breadcrumbs />
                <BlockTitle title="Информация" level={1} />
                <div className="faq">
                    {faqList.map((faq) => {
                        return (
                            <Accordion key={faq.id} title={faq.title}>
                                <ReactMarkdown
                                    urlTransform={(url) =>
                                        url.startsWith("tel:")
                                            ? url
                                            : defaultUrlTransform(url)
                                    }
                                >
                                    {sanitizeHTML(faq.text)}
                                </ReactMarkdown>
                            </Accordion>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
