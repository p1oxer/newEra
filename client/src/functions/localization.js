import fs from "fs/promises";
import path from "path";

const LOCALES_DIR = path.join(process.cwd(), "..", "client", "src", "files");
const RU_LOCALE_PATH = path.join(LOCALES_DIR, "url-mapping.json");

// Обновление локализационного файла
export async function updateLocaleWithQuest(slug, title) {
    try {
        // Читаем текущий файл
        const data = await fs.readFile(RU_LOCALE_PATH, "utf8");
        const locale = JSON.parse(data);

        // Добавляем/обновляем запись
        if (!locale[slug]) {
            locale[slug] = title;
            await fs.writeFile(RU_LOCALE_PATH, JSON.stringify(locale, null, 2), "utf8");
            console.log(`Добавлен перевод: "${slug}": "${title}"`);
        }
    } catch (err) {
        console.error("Ошибка обновления файла локализации:", err);
    }
}
