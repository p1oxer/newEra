import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { capitalizeFirstLetterAndReplaceDash } from "../functions/translit";

export default function Breadcrumbs() {
    const [nameMap, setNameMap] = useState({});
    const location = useLocation();

    useEffect(() => {
        // Загружаем JSON с сервера
        fetch(`${import.meta.env.VITE_FILES_URL || ""}/url-mapping.json`)
            .then((res) => res.json())
            .then((data) => {
                setNameMap(data);
            })
            .catch((err) => {
                console.error("Ошибка загрузки url-mapping.json", err);
                setNameMap({});
            });
    }, []);
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
