import React from "react";

export default function Button({ children, classname, onClick }) {
    return (
        <button onClick={onClick} className={`button ${classname ?? ""}`} type="button">
            {children}
        </button>
    );
}
