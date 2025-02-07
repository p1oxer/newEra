import React, { useState, useEffect } from "react";

export default function QuestsDescription({ questKey, jsonData }) {
    // Принимаем ключ квеста и данные JSON как пропсы
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (jsonData && jsonData[questKey]) {
            // Разбиваем текст на абзацы (выберите подходящий способ разбиения)
            const paragraphs = jsonData[questKey].description
                .split("\n\n") // Или .split('\n') или другой разделитель
                .map((paragraph, index) => (
                    <p key={index} style={{ textIndent: "2em", marginBottom: "1.5em" }}>
                        {paragraph.trim()}
                    </p>
                ));
            setDescription(paragraphs);
        } else {
            setDescription(<p>Описание не найдено.</p>); // Обработка случая, если данных нет
        }
    }, [questKey, jsonData]); // Зависимости useEffect

    return <div className="body-quest__description">{description}</div>;
}
