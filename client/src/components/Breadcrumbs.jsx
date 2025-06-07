import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import urlMappings from "../files/url-mapping.json";
import { capitalizeFirstLetterAndReplaceDash } from "../functions/translit";
export default function Breadcrumbs() {
    const [nameMap, setNameMap] = useState(urlMappings);
    const location = useLocation();
    let currentLink = "";
    const crumbs = location.pathname
        .split("/")
        .filter((crumb) => crumb !== "")
        .map((crumb) => {
            currentLink += `/${crumb}`;
            const breadcrumbName =
                nameMap[crumb] || capitalizeFirstLetterAndReplaceDash(crumb);
            return (
                <React.Fragment key={crumb}>
                    <div className="crumb">
                        <Link to={currentLink}>{breadcrumbName}</Link>
                    </div>
                </React.Fragment>
            );
        });

    return (
        <div className="breadcrumbs">
            <div className="crumb">
                <Link to={"/"}>Главная</Link>
            </div>
            {crumbs}
        </div>
    );
}
