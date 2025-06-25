import urlMapping from "../files/url-mapping.json";

const BASE_URL = "https://new-era-quest.ru"; // Замените на ваш домен

// Статические страницы
const staticPages = [
    { url: "/", priority: "1.0", changefreq: "monthly" },
    { url: "/quests", priority: "0.9", changefreq: "monthly" },
    { url: "/information", priority: "0.7", changefreq: "monthly" },
    { url: "/contacts", priority: "0.8", changefreq: "monthly" },
    { url: "/group", priority: "0.8", changefreq: "monthly" },
    { url: "/birthday", priority: "0.8", changefreq: "monthly" },
    { url: "/sertificate", priority: "0.7", changefreq: "monthly" },
];

// Генерируем URL для категорий квестов
const generateCategoryUrls = () => {
    return Object.keys(urlMapping).map((slug) => ({
        url: `/quests/${slug}`,
        priority: "0.8",
        changefreq: "weekly",
    }));
};

// Генерируем XML sitemap
export const generateSitemap = () => {
    const allPages = [...staticPages, ...generateCategoryUrls()];

    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
    const urlsetStart = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    const urlsetEnd = "</urlset>";

    const urls = allPages
        .map((page) => {
            return `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
        })
        .join("\n");

    return `${xmlHeader}
${urlsetStart}
${urls}
${urlsetEnd}`;
};

// Функция для сохранения sitemap в файл (для использования в build процессе)
export const saveSitemap = () => {
    const sitemap = generateSitemap();
    // В реальном проекте здесь можно использовать fs для записи файла
    return sitemap;
};

export default generateSitemap;
