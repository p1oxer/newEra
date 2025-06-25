import React from "react";

export default function MapBlock() {
    return (
        <div className="map block">
            <div className="container">
                <h2 className="visually-hidden">Где нас найти?</h2>
                <iframe
                    src="https://yandex.ru/map-widget/v1/?um=constructor%3A9432c79b0f2bd8f9a9c0b46022ffaa2bc518df236b007c98c391100903196b60&amp;source=constructor"
                    width="100%"
                    height="496"
                    style={{ minHeight: 320, minWidth: 290, border: 0 }}
                    loading="lazy"
                    title="Карта квест-комнаты Новая Эра"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}
