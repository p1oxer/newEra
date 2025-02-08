import React from "react";
import Button from "../../UI/Button";
import { Link } from "react-router-dom";
import { translit } from "../../../functions/translit";

export default function QuestsSwiperCard({ img, name, description, difficulty }) {
    return (
        <div className="swiper-quests__card card-quests">
            <div className="card-quests__body">
                <Link to={`../quests/${translit(name)}`} className="card-quests__img">
                    <img src={`/img/QuestsSwiper/${img}.jpg`} alt="" />
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
                <Button link={`../quests/${translit(name)}`} text={"Подробнее"} />
            </div>
        </div>
    );
}
