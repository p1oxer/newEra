import React from "react";
import Button from "../UI/Button";
import { FaVk } from "react-icons/fa";

export default function QuestsPage() {
    // todo: breadcrumbs, attributes
    return (
        <section className="quest block">
            <div className="container">
                <div className="quest__body body-quest">
                    <div className="body-quest__img">
                        <img src="../../../public/img/QuestsSwiper/koma.jpg" alt=""></img>  
                    </div>
                    <div className="body-quest__content">
                        <span className="body-quest__name">Кома</span>
                        <p className="body-quest__description">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            Perferendis, voluptatum nobis, ex doloribus adipisci dicta
                            rerum illo aspernatur earum, eligendi similique. Fugiat fugit
                            sit labore ea quam soluta nihil illum architecto. A modi amet
                            unde, sapiente impedit excepturi aliquam cupiditate sunt
                            provident esse nisi saepe sequi architecto odio eaque ratione
                            placeat hic quisquam? Eveniet ullam quaerat vitae, dicta
                            veniam dolore deserunt necessitatibus adipisci veritatis
                            laboriosam officia magnam sint harum, dolorum, voluptas
                            impedit quisquam autem. Omnis, veritatis totam? Nihil,
                            reprehenderit omnis officia id ea eum impedit cumque officiis
                            saepe, laboriosam minus, vel quae deleniti distinctio ipsa.
                            Exercitationem nobis dolorum soluta deserunt.
                        </p>
                        <Button
                            link={
                                "https://vk.com/market/product/khorror-kvest-quotkomaquot-213324777-9536720"
                            }
                        >
                            Забронировать <FaVk size={25} />
                        </Button>
                    </div>
                </div>
                <div className="quest__attributes attributes-quest">
                    <div className="attributes-quest__item">
                        <div className="attributes-quest__img"></div>
                        <p className="attributes-quest__text"></p>
                    </div>
                </div>
            </div>
        </section>
    );
}
