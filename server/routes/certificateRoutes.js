import express from "express";
import db from "../db.js";
import fs from "fs/promises";
import path from "path";
import multer from "multer";
import { generateImageVersions } from "../scripts/generateImages.js";
const router = express.Router();

// Путь относительно клиентской папки public
const CLIENT_PUBLIC_DIR = path.join(process.cwd(), "..", "client", "public");
const IMG_DIR = "img/cert";
const FULL_IMG_DIR = path.join(CLIENT_PUBLIC_DIR, IMG_DIR);

// Настройка Multer для сохранения в клиентскую папку
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        await fs.mkdir(FULL_IMG_DIR, { recursive: true });
        cb(null, FULL_IMG_DIR);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 9)}${ext}`;
        cb(null, filename);
    },
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

router.get("/", async (req, res) => {
    const { _sort = "id", _order = "ASC", _start = 0, _end = 5 } = req.query;

    try {
        const startInt = parseInt(_start);
        const endInt = parseInt(_end);
        const limit = endInt - startInt;
        const offset = startInt;

        // Получаем данные
        const [rows] = await db.query(
            `SELECT * FROM certificates ORDER BY ?? ${_order.toUpperCase()} LIMIT ? OFFSET ?`,
            [_sort, limit, offset]
        );

        // Общее количество записей
        const [[{ total }]] = await db.query(
            "SELECT COUNT(*) AS total FROM certificates"
        );

        // Устанавливаем Content-Range
        res.header("Content-Range", `certificates ${startInt}-${endInt}/${total}`);

        // Отправляем данные
        return res.json(rows);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});

router.post("/upload-image", upload.single("image"), async (req, res) => {
    const { certificateId, currentPaths } = req.body; // Получаем текущие пути

    if (!certificateId) {
        return res.status(400).json({ error: "Missing certificateId" });
    }

    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        await generateImageVersions(req.file.path, [560]);
        const relativePath = `/img/cert/${req.file.filename}`;

        let pathsArray = currentPaths ? JSON.parse(currentPaths) : [];

        if (!Array.isArray(pathsArray)) {
            pathsArray = [];
        }

        pathsArray.push(relativePath);

        // Обновляем запись в БД
        await db.query("UPDATE certificates SET image_paths = ? WHERE id = ?", [
            JSON.stringify(pathsArray),
            certificateId,
        ]);

        res.json({
            success: true,
            image: { path: relativePath },
        });
    } catch (err) {
        console.error("Upload error:", err);
        res.status(500).json({ error: "Failed to process image" });
    }
});

router.put("/:id", async (req, res) => {
    const { text, image_paths } = req.body;

    try {
        // Преобразуем image_paths в массив, если это строка
        const pathsArray =
            typeof image_paths === "string"
                ? JSON.parse(image_paths).filter((p) => typeof p === "string")
                : (image_paths || []).filter((p) => typeof p === "string");

        await db.query("UPDATE certificates SET text = ?, image_paths = ? WHERE id = ?", [
            text,
            JSON.stringify(pathsArray),
            req.params.id,
        ]);
        res.json({
            id: req.params.id,
            text,
            image_paths: pathsArray,
        });
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({
            error: "Failed to update certificate",
            details: err.message,
        });
    }
});

// Получить одну запись
router.get("/:id", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM certificates WHERE id = ?", [
            req.params.id,
        ]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Запись не найдена" });
        }

        const certificate = rows[0];
        if (typeof certificate.image_paths === "string") {
            certificate.image_paths = JSON.parse(certificate.image_paths);
        }

        res.json(certificate);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

// Функция для получения всех версий файла
function getDerivedFilenames(filePath) {
    const dir = path.dirname(filePath);
    const name = path.basename(filePath, path.extname(filePath));
    const ext = path.extname(filePath);

    return [
        // Основной файл
        filePath,
        path.join(dir, `${name}-560${ext}`),
        path.join(dir, `${name}-560.avif`),
        path.join(dir, `${name}-560.webp`)
    ];
}

router.post("/delete-image/:id", async (req, res) => {
    const { path: imagePath } = req.body;

    try {
        const [[certificate]] = await db.query(
            "SELECT image_paths FROM certificates WHERE id = ?",
            [req.params.id]
        );

        let pathsArray = [];
        if (certificate?.image_paths) {
            try {
                pathsArray = JSON.parse(certificate.image_paths);
                if (!Array.isArray(pathsArray)) pathsArray = [];
            } catch {
                pathsArray = [];
            }
        }

        // Удаляем путь из массива
        pathsArray = pathsArray.filter((p) => p !== imagePath);

        // Сохраняем обновленный список путей
        await db.query("UPDATE certificates SET image_paths = ? WHERE id = ?", [
            JSON.stringify(pathsArray),
            req.params.id,
        ]);

        // Удаление файла и его версий
        const fullImagePath = path.join(FULL_IMG_DIR, imagePath.split("/").pop());

        const filesToDelete = getDerivedFilenames(fullImagePath);

        for (const file of filesToDelete) {
            try {
                await fs.access(file); // Проверяем существование
                await fs.unlink(file); // Удаляем
            } catch (err) {
                console.warn(`Файл не найден для удаления: ${file}`);
            }
        }

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ошибка удаления изображения" });
    }
});
export default router;
