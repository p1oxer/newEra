import Breadcrumbs from "../Breadcrumbs";
import QuestsSwiper from "../Quests/QuestsSwiper/QuestsSwiper";

export default function Quests() {
    return (
        <section className="quests">
            <div className="container">
                <Breadcrumbs />
            </div>
            <QuestsSwiper />
        </section>
    );
}
