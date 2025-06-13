// src/components/ImagePreview.js
import React from "react";
import { useRecordContext } from "react-admin";

const ImagePreview = ({ source }) => {
    const record = useRecordContext();
    const images = record[source] || [];

    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {images.map((src, index) => (
                <img
                    key={index}
                    src={src}
                    alt={`#${index}`}
                    style={{ width: "150px", height: "auto", objectFit: "contain" }}
                />
            ))}
        </div>
    );
};

export default ImagePreview;
