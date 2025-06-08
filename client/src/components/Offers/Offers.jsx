import React from "react";
import OfferItem from "./OfferItem";

export default function Offers({ offers }) {
    return (
        <div className={offers.length > 2 ? "offers offers-grid" : "offers"}>
            {offers.map((offer) => {
                return <OfferItem key={offer.id} offer={offer} />;
            })}
        </div>
    );
}
