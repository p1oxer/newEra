// scripts/generateImages.js
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

// Путь к папке с изображениями
const IMAGES_DIR = path.resolve("public", "img");

// Размеры, которые нужно создать
const SIZES = [500, 900, 1200];

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

    for await (const imagePath of walkDir(IMAGES_DIR)) {
        await generateImageVersions(imagePath);
    }

    console.log("Генерация завершена!");
}

generateAllImages();
