import React from "react";
import { IoClose } from "react-icons/io5";
export default function Modal({ open, onClose, children }) {
    return (
        <div onClick={onClose} className={open ? "modal visible" : "modal invisible"}>
            <div className="modal__body" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="modal__close">
                    <IoClose size={35} />
                </button>
                {React.cloneElement(children, { resetVideo: !open })}
            </div>
        </div>
    );
}
