import React from "react";
import { ScrollRestoration } from "react-router-dom";
import ButtonLink from "../UI/ButtonLink";
export default function NotFoundPage() {
    return (
        <>
            <div className="wrapper">
                <ScrollRestoration />
                <main>
                    <div className="container">
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
