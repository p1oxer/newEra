import { useEffect } from "react";

const SEOHead = ({
    title,
    description,
    keywords,
    canonical,
    ogImage,
    ogType = "website",
    robots = "index, follow",
    noindex = false,
}) => {
    useEffect(() => {
        // Обновляем title
        if (title) {
            document.title = title;
        }

        // Обновляем или создаем meta теги
        const updateMetaTag = (name, content) => {
            let meta = document.querySelector(`meta[name="${name}"]`);
            if (!meta) {
                meta = document.createElement("meta");
                meta.name = name;
                document.head.appendChild(meta);
            }
            meta.content = content;
        };

        const updatePropertyTag = (property, content) => {
            let meta = document.querySelector(`meta[property="${property}"]`);
            if (!meta) {
                meta = document.createElement("meta");
                meta.setAttribute("property", property);
                document.head.appendChild(meta);
            }
            meta.content = content;
        };

        // Meta description
        if (description) {
            updateMetaTag("description", description);
        }

        // Keywords
        if (keywords) {
            updateMetaTag("keywords", keywords);
        }

        // Robots
        if (noindex) {
            updateMetaTag("robots", "noindex, nofollow");
        } else if (robots) {
            updateMetaTag("robots", robots);
        }

        // Canonical URL
        if (canonical) {
            let canonicalLink = document.querySelector('link[rel="canonical"]');
            if (!canonicalLink) {
                canonicalLink = document.createElement("link");
                canonicalLink.rel = "canonical";
                document.head.appendChild(canonicalLink);
            }
            canonicalLink.href = canonical;
        }

        // Open Graph теги
        if (title) {
            updatePropertyTag("og:title", title);
        }
        if (description) {
            updatePropertyTag("og:description", description);
        }
        if (canonical) {
            updatePropertyTag("og:url", canonical);
        }
        if (ogImage) {
            updatePropertyTag("og:image", ogImage);
        }
        updatePropertyTag("og:type", ogType);
        updatePropertyTag("og:site_name", "Новая Эра - Квест-комнаты");

        // Twitter Card теги
        updatePropertyTag("twitter:card", "summary_large_image");
        if (title) {
            updatePropertyTag("twitter:title", title);
        }
        if (description) {
            updatePropertyTag("twitter:description", description);
        }
        if (ogImage) {
            updatePropertyTag("twitter:image", ogImage);
        }
    }, [title, description, keywords, canonical, ogImage, ogType, robots, noindex]);

    return null;
};

export default SEOHead;
