import Offers from "../Offers/Offers";
import Breadcrumbs from "../Breadcrumbs";
import useFetch from "../../hooks/useFetch";
import ReactMarkdown from "react-markdown";
import { sanitizeHTML } from "../../hooks/sanitize";
import useSEO from "../../hooks/useSEO";

export default function Group() {
    useSEO("group");

    const { data: groupOffers, isLoading, error } = useFetch("group_offers");
    const { data: groupDescription } = useFetch("group-description");


    if (error) {
        console.error("Ошибка загрузки", error);
        return <p>Ошибка при загрузке</p>;
    }

    const groupOffersList = groupOffers?.length > 0 ? groupOffers : [];
    return (
        <section className="group page">
            <div className="container">
                <Breadcrumbs />
                <h1>Большая компания? Выпускной? Корпоратив? </h1>
                <h2>
                    Отметьте Ваш праздник в <span>Новой Эре</span>
                </h2>
                <Offers offers={groupOffersList} />
                <div className="group__text">
                    <ReactMarkdown>
                        {sanitizeHTML(groupDescription?.description)}
                    </ReactMarkdown>
                </div>
            </div>
        </section>
    );
}
