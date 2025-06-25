import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import seoConfig from "../config/seoConfig";

const useSEO = (pageType, dynamicData = {}) => {
    const location = useLocation();

    useEffect(() => {
        const config = seoConfig[pageType];
        if (!config) return;

        // Получаем данные для SEO
        let seoData = {};

        if (typeof config.title === "function") {
            seoData.title = config.title(dynamicData.title || dynamicData.name);
        } else {
            seoData.title = config.title;
        }

        if (typeof config.description === "function") {
            seoData.description = config.description(
                dynamicData.title || dynamicData.name,
                dynamicData.description
            );
        } else {
            seoData.description = config.description;
        }

        if (typeof config.keywords === "function") {
            seoData.keywords = config.keywords(dynamicData.title || dynamicData.name);
        } else {
            seoData.keywords = config.keywords;
        }

        if (typeof config.canonical === "function") {
            seoData.canonical = config.canonical(dynamicData.slug || dynamicData.id);
        } else {
            seoData.canonical = config.canonical;
        }

        if (typeof config.ogImage === "function") {
            seoData.ogImage = config.ogImage(dynamicData.image);
        } else {
            seoData.ogImage = config.ogImage;
        }

        seoData.ogType = config.ogType;
        seoData.robots = config.robots;
        seoData.noindex = config.noindex;

        // Обновляем title
        if (seoData.title) {
            document.title = seoData.title;
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
        if (seoData.description) {
            updateMetaTag("description", seoData.description);
        }

        // Keywords
        if (seoData.keywords) {
            updateMetaTag("keywords", seoData.keywords);
        }

        // Robots
        if (seoData.noindex) {
            updateMetaTag("robots", "noindex, nofollow");
        } else if (seoData.robots) {
            updateMetaTag("robots", seoData.robots);
        }

        // Canonical URL
        if (seoData.canonical) {
            let canonicalLink = document.querySelector('link[rel="canonical"]');
            if (!canonicalLink) {
                canonicalLink = document.createElement("link");
                canonicalLink.rel = "canonical";
                document.head.appendChild(canonicalLink);
            }
            canonicalLink.href = seoData.canonical;
        }

        // Open Graph теги
        if (seoData.title) {
            updatePropertyTag("og:title", seoData.title);
        }
        if (seoData.description) {
            updatePropertyTag("og:description", seoData.description);
        }
        if (seoData.canonical) {
            updatePropertyTag("og:url", seoData.canonical);
        }
        if (seoData.ogImage) {
            updatePropertyTag("og:image", seoData.ogImage);
        }
        if (seoData.ogType) {
            updatePropertyTag("og:type", seoData.ogType);
        }

        // Twitter Card теги
        if (seoData.title) {
            updatePropertyTag("twitter:title", seoData.title);
        }
        if (seoData.description) {
            updatePropertyTag("twitter:description", seoData.description);
        }
        if (seoData.ogImage) {
            updatePropertyTag("twitter:image", seoData.ogImage);
        }
    }, [pageType, location.pathname, dynamicData]);

    return null;
};

export default useSEO;
