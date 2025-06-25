import React from "react";
import { ScrollRestoration } from "react-router-dom";
import ButtonLink from "../UI/ButtonLink";
import useSEO from "../../hooks/useSEO";
import BlockTitle from "../UI/BlockTitle";

export default function NotFoundPage() {
    useSEO("notFound");

    return (
        <>
            <div className="wrapper">
                <ScrollRestoration />
                <main>
                    <div className="container">
                        <BlockTitle title="Страница не найдена" level={1} className="visually-hidden" />
                        <div className="notfound__body page">
                            <div className="">
                                <p className="error-404">
                                    Упс... Кажется такой страницы не существует
                                </p>
                                <ButtonLink link={"/"}>На главную</ButtonLink>
                            </div>
                            <div className="notfound__img">
                                <img src="/img/dino.png" alt="" />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
