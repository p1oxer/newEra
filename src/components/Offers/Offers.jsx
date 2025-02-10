import React from "react";
import OfferItem from "./OfferItem";

export default function Offers({ offers }) {
    return (
        <div className="offers">
            {offers.map((offer) => {
                return <OfferItem offer={offer} />;
            })}
        </div>
    );
}
