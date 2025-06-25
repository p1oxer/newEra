import React, { useEffect, useRef, useState } from "react";
import Button from "../../UI/ButtonLink";
import { Link } from "react-router-dom";
import { translit } from "../../../functions/translit";
import Image from "../../UI/Image";

export default function QuestsSwiperCard({
    img,
    name,
    description,
    difficulty,
    category,
}) {
    return (
        <div className="swiper-quests__card card-quests">
            <div className="card-quests__body">
                <Link
                    to={`../quests/${category}/${translit(name)}`}
                    className="card-quests__img"
                >
                    <picture>
                        <source
                            type="image/avif"
                            srcSet={`${import.meta.env.VITE_UPLOADS_URL}${img?.split(".")[0]}-540.avif`}
                            media={"(min-width:320px)"}
                        />
                        <source
                            type="image/webp"
                            srcSet={`${import.meta.env.VITE_UPLOADS_URL}${img?.split(".")[0]}-540.webp`}
                            media={"(min-width:320px)"}
                        />
                        <img src={`${import.meta.env.VITE_UPLOADS_URL}${img}`} alt={`Изображение ${name}`} loading="lazy" width={427.5} height={427.5} />
                    </picture>
                </Link>
                <div className="card-quests__top">
                    <p className="card-quests__name">{name}</p>
                    <p
                        className={
                            difficulty == "LITE"
                                ? "card-quests__difficulty lite"
                                : "card-quests__difficulty hard"
                        }
                    >
                        {difficulty == "LITE" && "LITE"}
                        {difficulty == "MEDIUM | HARD" && (
                            <>
                                <span className="medium">MEDIUM</span> <small>|</small>{" "}
                                <span className="hard">HARD</span>
                            </>
                        )}
                    </p>
                </div>
                <span className="card-quests__description">{description}</span>
                <Button
                    link={`../quests/${category}/${translit(name)}`}
                    text={"Подробнее"}
                />
            </div>
        </div>
    );
}
