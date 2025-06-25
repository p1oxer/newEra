import React from "react";

export default function BlockTitle({ title, level = 2, className = "" }) {
    const Tag = `h${level}`;

    return <Tag className={`block-title ${className}`}>{title}</Tag>;
}
