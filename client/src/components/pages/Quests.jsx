import Breadcrumbs from "../Breadcrumbs";
import QuestsSwiper from "../Quests/QuestsSwiper/QuestsSwiper";
import useSEO from "../../hooks/useSEO";
import BlockTitle from "../UI/BlockTitle";

export default function Quests() {
    useSEO("quests");

    return (
        <section className="quests">
            <div className="container">
                <Breadcrumbs />
                <BlockTitle title="Все квесты" level={1} />
            </div>
            <QuestsSwiper blockTitle={null} />
        </section>
    );
}
