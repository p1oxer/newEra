// scripts/generateImages.js
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

// Получаем __dirname через import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Путь к изображениям (учитываем структуру проекта)
const IMAGES_DIR = path.resolve(__dirname, "../../client/public/img/Sertificates");

// Размеры, которые нужно создать
const SIZES = [560];

// Форматы, в которых сохраняем
const FORMATS = ["webp", "avif"];

/**
 * Рекурсивно обходит папку и находит все изображения
 */
async function* walkDir(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            yield* walkDir(fullPath);
        } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
            yield fullPath;
        }
    }
}

/**
 * Генерирует все версии изображения
 */
async function generateImageVersions(filePath) {
    const dir = path.dirname(filePath);
    const baseName = path.basename(filePath, path.extname(filePath));

    console.log(`Обрабатываю: ${filePath}`);

    for (const size of SIZES) {
        for (const format of FORMATS) {
            const resizedFilePath = path.join(dir, `${baseName}-${size}.${format}`);
            if (await fileExists(resizedFilePath)) continue;

            try {
                let image = sharp(filePath).resize(size);
                switch (format) {
                    case "webp":
                        image = image.webp({ quality: 80 });
                        break;
                    case "avif":
                        image = image.avif({ quality: 80 });
                        break;
                    default:
                        continue;
                }

                await image.toFile(resizedFilePath);
                console.log(`Создано: ${resizedFilePath}`);
            } catch (err) {
                console.error(`Ошибка при обработке ${filePath}:`, err.message);
            }
        }
    }
}

/**
 * Проверяет, существует ли файл
 */
async function fileExists(pathToFile) {
    try {
        await fs.access(pathToFile);
        return true;
    } catch {
        return false;
    }
}

/**
 * Основная функция
 */
async function generateAllImages() {
    console.log("Начинаем генерацию изображений...");

    try {
        for await (const imagePath of walkDir(IMAGES_DIR)) {
            await generateImageVersions(imagePath);
        }

        console.log("Генерация завершена!");
    } catch (error) {
        console.error("Ошибка при генерации изображений:", error.message);
    }
}

// Запускаем генерацию
generateAllImages();

// Экспортируем для использования в server.js
export default generateAllImages;
