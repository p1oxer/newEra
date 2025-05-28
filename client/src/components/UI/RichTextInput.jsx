// src/components/RichTextInput.jsx
import React from "react";
import ReactQuill from "react-quill-new"; // Импортируем новый форк
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { useInput } from "react-admin";

const RichTextInput = ({ source, label }) => {
    const { field } = useInput({ source });

    return (
        <div style={{ marginBottom: "1rem" }}>
            <label>
                <strong>{label || source}</strong>
            </label>
            <ReactQuill
                style={{ marginTop: "1rem" }}
                value={field.value || ""}
                onChange={field.onChange}
            />
        </div>
    );
};

export default RichTextInput;
