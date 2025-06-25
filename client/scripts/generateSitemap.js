import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import generateSitemap from "../src/utils/sitemapGenerator.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Путь к папке public
const publicPath = path.join(__dirname, "../public");
const sitemapPath = path.join(publicPath, "sitemap.xml");

try {
    // Генерируем sitemap
    const sitemap = generateSitemap();

    // Записываем в файл
    fs.writeFileSync(sitemapPath, sitemap, "utf8");

    console.log("✅ Sitemap.xml успешно сгенерирован!");
    console.log(`📁 Файл сохранен: ${sitemapPath}`);
} catch (error) {
    console.error("❌ Ошибка при генерации sitemap:", error);
    process.exit(1);
}
