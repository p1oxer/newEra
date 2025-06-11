// components/Image.jsx или .tsx
import React from "react";

export default function Image({ src, alt, sizes = ["500", "900", "1200"] }) {
    const baseName = src.replace(/\.[^/.]+$/, ""); // Убираем расширение
    const ext = src.split(".").pop(); // Получаем расширение

    const getResizedPath = (size, format) => {
        return `/api/image/${baseName}-${size}.${format}`;
    };

    const getMediaQuery = (size) => {
        if (size === "500") return "(max-width: 500px)";
        if (size === "900") return "(min-width: 501px) and (max-width: 900px)";
        if (size === "1200") return "(min-width: 901px) and (max-width: 1200px)";
        return "(min-width: 1201px)";
    };

    return (
        <picture>
            {sizes.map((size) => (
                <React.Fragment key={size}>
                    <source
                        type="image/webp"
                        srcSet={getResizedPath(size, "webp")}
                        media={getMediaQuery(size)}
                    />
                    <source
                        type="image/avif"
                        srcSet={getResizedPath(size, "avif")}
                        media={getMediaQuery(size)}
                    />
                    <source
                        type={`image/${ext}`}
                        srcSet={getResizedPath(size, ext)}
                        media={getMediaQuery(size)}
                    />
                </React.Fragment>
            ))}

            {/* Оригинал */}
            <img src={`/api/image/${src}`} alt={alt} loading="lazy" />
        </picture>
    );
}
