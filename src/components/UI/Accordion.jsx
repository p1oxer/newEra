import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";
export default function Accordion({ title, children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [height, setHeight] = useState(0);

    const contentRef = useRef(null); // Ссылка на контент для измерения высоты

    useEffect(() => {
        if (isOpen) {
            setHeight(contentRef.current.scrollHeight); // Устанавливаем высоту при открытии
        } else {
            setHeight(0); // Высота 0 при закрытии
        }
    }, [isOpen]);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={isOpen ? "accordion opened" : "accordion"}>
            <div className="accordion__header" onClick={toggleAccordion}>
                <p>{title}</p>
                <span>
                    <IoIosArrowUp size={30}/>
                </span>
            </div>

            <div
                className="accordion__content"
                ref={contentRef}
                style={{ maxHeight: `${height}px` }}
            >
                <div className="accordion__content-inner">{children}</div>
            </div>
        </div>
    );
}
