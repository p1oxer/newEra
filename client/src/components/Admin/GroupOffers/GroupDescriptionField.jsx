import React, { useState, useEffect } from "react";
import { Button } from "react-admin";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import {useNotify} from "react-admin";
const API_URL = "http://localhost:5000/api/group-description";

export const GroupDescriptionField = () => {
    const notify = useNotify();

    const [text, setText] = useState("");
    const [groupDescription, setGroupDescription] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_URL);
                setGroupDescription(response.data);
                setText(response.data.description || "");
            } catch (err) {
                console.error("Ошибка загрузки описания", err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Сохранение изменений
    const handleSave = async () => {
        try {
            await axios.put(`${API_URL}/${groupDescription.id}`, {
                description: text,
            });
            notify("Описание успешно обновлено", {
                type: "info",
                undoable: false,
            });
        } catch (err) {
            console.error("Ошибка сохранения", err);
            notify(`Не удалось сохранить описание: ${err.message}`, { type: "warning" });
        }
    };

    if (isLoading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка при загрузке описания</p>;

    return (
        <div
            style={{
                margin: "2rem 1rem",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
            }}
        >
            <h3>Текст</h3>

            <MDEditor value={text} onChange={setText} height={300} />
            <Button label="Сохранить" onClick={handleSave} />
        </div>
    );
};
