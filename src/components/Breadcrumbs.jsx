import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
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
                <div className="crumb" key={crumb}>
                    <Link to={currentLink}>{breadcrumbName}</Link>
                </div>
            );
        });

    return (
        <div className="breadcrumbs">
            {crumbs}
        </div>
    );
}
