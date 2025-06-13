import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

// Форматы, в которых сохраняем
const FORMATS = ["webp", "avif"];

/**
 * Генерирует нужные версии изображения
 */
export async function generateImageVersions(filePath, sizes = [500, 900]) {
    const dir = path.dirname(filePath);
    const baseName = path.basename(filePath, path.extname(filePath));

    for (const size of sizes) {
        for (const format of FORMATS) {
            const resizedFilePath = path.join(dir, `${baseName}-${size}.${format}`);

            // Пропускаем, если уже существует
            if (await fileExists(resizedFilePath)) continue;

            try {
                let image = sharp(filePath);

                if (size !== "original") {
                    image = image.resize(size);
                }

                switch (format) {
                    case "webp":
                        image = image.webp({ quality: 80 });
                        break;
                    case "avif":
                        image = image.avif({ quality: 80 });
                        break;
                }

                await image.toFile(resizedFilePath);
                console.log(`Создано: ${resizedFilePath}`);
            } catch (err) {
                console.error(`Ошибка при обработке ${filePath}:`, err.message);
            }
        }
    }
}

async function fileExists(pathToFile) {
    try {
        await fs.access(pathToFile);
        return true;
    } catch {
        return false;
    }
}
