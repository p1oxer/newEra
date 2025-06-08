// src/components/AttributesInput.jsx
import React, { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { InputHelperText } from "react-admin";

const AttributesInput = ({ source, label }) => {
    const { control } = useFormContext();
    const {
        field: { onChange, value },
        fieldState: { invalid, error },
    } = useController({
        name: source,
        control,
        defaultValue: [],
    });

    // Парсим JSON-строку, если пришла из базы
    const [attributes, setAttributes] = useState(() => {
        if (Array.isArray(value)) return value;
        try {
            return JSON.parse(value) || [];
        } catch {
            return [];
        }
    });

    const handleChange = (e, index) => {
        const newAttrs = [...attributes];
        newAttrs[index] = e.target.value;
        setAttributes(newAttrs);
        onChange(JSON.stringify(newAttrs)); // Отправляем в форму
    };

    const handleAdd = () => {
        const newAttrs = [...attributes, ""];
        setAttributes(newAttrs);
        onChange(JSON.stringify(newAttrs));
    };

    const handleRemove = (index) => {
        const newAttrs = attributes.filter((_, i) => i !== index);
        setAttributes(newAttrs);
        onChange(JSON.stringify(newAttrs));
    };

    return (
        <div
            style={{
                marginBottom: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
            }}
        >
            <label>
                <strong>{label}</strong>
            </label>
            {attributes.map((attr, index) => (
                <div
                    key={index}
                    style={{ display: "flex", gap: "8px", marginBottom: "8px" }}
                >
                    <input
                        type="text"
                        value={attr || ""}
                        onChange={(e) => handleChange(e, index)}
                        style={{
                            width: "300px",
                            padding: "10px",
                            fontWeight: "300",
                            fontSize: "18px",
                        }}
                        placeholder={`Атрибут ${index + 1}`}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => handleRemove(index)}
                        style={{
                            color: "red",
                            fontWeight: "300",
                            fontSize: "18px",
                        }}
                    >
                        Удалить
                    </button>
                </div>
            ))}
            <button type="button" onClick={handleAdd}>
                + Добавить атрибут
            </button>
            <InputHelperText error={error?.message} />
        </div>
    );
};

export default AttributesInput;
