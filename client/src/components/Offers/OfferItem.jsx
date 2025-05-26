import React from "react";
import { Link } from "react-router-dom";
import { IoMdCheckmark } from "react-icons/io";
export default function OfferItem({ offer }) {
    return (
        <div className={offer.best ? "offer__item item-offer item-offer--best" : "offer__item item-offer"}>
            <div className="item-offer__body">
                <div className="item-offer__top">
                    <div className="item-offer__name">{offer.name}</div>
                    <div className="item-offer__pricing">
                        <p>Ежедневно</p>
                        <div className="item-offer__price">{offer.price}</div>
                    </div>
                </div>
                <div className="item-offer__bottom">
                    <ul className="item-offer__list">
                        {offer.attributes.map((attr) => {
                            return (
                                <li className="item-offer__list-item">
                                    <IoMdCheckmark color="#c30168" />
                                    {attr}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <Link target="_blank" to={offer.link} className="item-offer__button">
                    Оставить заявку
                </Link>
            </div>
        </div>
    );
}
