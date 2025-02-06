import React from "react";
import Button from "../UI/Button";
import { FaVk } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { TbMoodKid } from "react-icons/tb";
import { FaSkull } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import AttributeQuest from "../Quests/AttributeQuest";

export default function QuestsPage() {
    // todo: breadcrumbs, thumbs
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
                            placeat hic quisquam?
                        </p>
                        <Button
                            target={"_blank"}
                            link={
                                "https://vk.com/market/product/khorror-kvest-quotkomaquot-213324777-9536720"
                            }
                        >
                            Забронировать <FaVk size={25} />
                        </Button>
                        <div className="quest__attributes attributes-quest">
                            <AttributeQuest text={"2-15"}>
                                <FaPeopleGroup/>
                            </AttributeQuest>
                            <AttributeQuest text={"14+ 18+"}>
                                <TbMoodKid />
                            </AttributeQuest>
                            <AttributeQuest text={"MEDIUM | HARD"}>
                                <FaSkull />
                            </AttributeQuest>
                            <AttributeQuest text={"60-90 минут"}>
                                <IoTimeOutline />
                            </AttributeQuest>
                            <AttributeQuest text={"Герцена, 105Б"}>
                                <FaLocationDot />
                            </AttributeQuest>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
