// src/context/LoadingContext.js
import { createContext, useState } from "react";

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [loadingCount, setLoadingCount] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const showLoader = () => {
        if (fadeOut) setFadeOut(false);
        setIsVisible(true);
        setLoadingCount((prev) => prev + 1);
    };

    const hideLoader = () => {
        setLoadingCount((prev) => {
            const newCount = prev - 1;
            if (newCount <= 0) {
                setFadeOut(true);
                setTimeout(() => {
                    setIsVisible(false);
                }, 300); // совпадает с длительностью transition
            }
            return Math.max(newCount, 0);
        });
    };

    return (
        <LoadingContext.Provider value={{ showLoader, hideLoader }}>
            <>
                {isVisible && (
                    <div className={`global-loader ${fadeOut ? "fade-out" : ""}`}>
                        {/* Пример спиннера */}
                        <div className="loader"></div>
                    </div>
                )}
                {children}
            </>
        </LoadingContext.Provider>
    );
};
