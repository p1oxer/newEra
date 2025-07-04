import React from "react";
import BlockTitle from "./UI/BlockTitle";
import useFetch from "../hooks/useFetch";
import ReactMarkdown from "react-markdown";
import { sanitizeHTML } from "../hooks/sanitize";
import Image from "./UI/Image";
export default function About() {
    const { data: textData, isLoading, error } = useFetch("about");
    const text = textData?.length > 0 ? textData : [];

    if (isLoading) {
        return null;
    }

    return (
        <section className="about block">
            <div className="container">
                <div className="about__body body-about">
                    <div className="sticky">
                        <div className="body-about__img">
                            <img
                                src={`${import.meta.env.VITE_UPLOADS_URL}/img/dino.png`}
                                alt="Динозавр"
                                loading="lazy"
                                width={400}
                                height={371}
                            />
                        </div>
                    </div>
                    <div className="body-about__content">
                        <BlockTitle title={"О Новой Эре"} />
                        {text.map((item) => {
                            return (
                                <div key={item.id}>
                                    <ReactMarkdown>
                                        {sanitizeHTML(item.text)}
                                    </ReactMarkdown>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
