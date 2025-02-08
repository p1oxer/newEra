import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import BlockTitle from "./BlockTitle";
import SwiperButton from "./SwiperButton";
import "swiper/css/pagination";
export default function CustomSwiper({
    block,
    modificator,
    blockTitle,
    settings,
    children,
}) {
    const swiperRef = useRef();
    const swiperButtonPrev = useRef(null);
    const swiperButtonNext = useRef(null);

    function handleButtonDisabling(swiper) {
        if (swiper.isBeginning) {
            swiperButtonPrev.current?.classList.add("swiper-btn-disabled");
        } else {
            swiperButtonPrev.current?.classList.remove("swiper-btn-disabled");
        }
        if (swiper.isEnd) {
            // swiperButtonNext.current?.classList.add("swiper-btn-disabled");
        } else {
            swiperButtonNext.current?.classList.remove("swiper-btn-disabled");
        }
    }
    return (
        <section
            className={
                block
                    ? `swiper block ${modificator}__swiper`
                    : `swiper ${modificator}__swiper`
            }
        >
            <div className="container">
                <div className={`block-top ${modificator}__swiper-top`}>
                    <BlockTitle title={blockTitle} />
                    <div className="swiper-buttons">
                        <SwiperButton
                            direction={"prev"}
                            modificator={modificator}
                            onClick={() => swiperRef.current.slidePrev()}
                            ref={swiperButtonPrev}
                        />
                        <SwiperButton
                            direction={"next"}
                            modificator={modificator}
                            onClick={() => swiperRef.current.slideNext()}
                            ref={swiperButtonNext}
                        />
                    </div>
                </div>
                <Swiper
                    modules={[Navigation, Pagination]}
                    {...settings}
                    onReachBeginning={() => {
                        swiperButtonPrev.current?.classList.add("swiper-btn-disabled");
                    }}
                    onReachEnd={() => {
                        swiperButtonNext.current?.classList.add("swiper-btn-disabled");
                    }}
                    onSlideChange={(swiper) => handleButtonDisabling(swiper)}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                        handleButtonDisabling(swiper);
                    }}
                    className={`${modificator}__sliper`}
                    pagination={{ clickable: true,clickableClass:`${modificator}__swiper-pagination` }}
                    
                >
                    {children}
                </Swiper>
            </div>
        </section>
    );
}
