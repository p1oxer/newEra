import express from "express";
import db from "../db.js";

const router = express.Router();

// Получить все предложения
router.get("/", async (req, res) => {
    const { _sort = "id", _order = "ASC", _start = 0, _end = 5 } = req.query;

    try {
        const startInt = parseInt(_start);
        const endInt = parseInt(_end);
        const limit = endInt - startInt;
        const offset = startInt;

        let sql = `SELECT * FROM birthday_offers ORDER BY ?? ${_order.toUpperCase()} LIMIT ? OFFSET ?`;
        const replacements = [_sort, limit, offset];

        const [rows] = await db.query(sql, replacements);

        // Общее количество записей
        const [[{ total }]] = await db.query(
            "SELECT COUNT(*) AS total FROM birthday_offers"
        );

        res.header("Content-Range", `birthday_offers ${startInt}-${endInt}/${total}`);
        return res.json(rows);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Ошибка сервера" });
    }
});

// Получить одну запись
router.get("/:id", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM birthday_offers WHERE id = ?", [
            req.params.id,
        ]);
        if (rows.length === 0) return res.status(404).json({ error: "Не найдено" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Создать новую запись
router.post("/", async (req, res) => {
    const { name, price, best, attributes, link, sort_order = 0 } = req.body;

    try {
        const [result] = await db.query(
            "INSERT INTO birthday_offers (name, price, best, attributes, link, sort_order) VALUES (?, ?, ?, ?, ?, ?)",
            [name, price, best, JSON.stringify(attributes), link, sort_order]
        );

        res.status(201).json({
            id: result.insertId,
            name,
            price,
            best,
            attributes,
            link,
            sort_order,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Обновить запись
router.put("/:id", async (req, res) => {
    const { name, price, best, attributes, link, sort_order } = req.body;

    try {
        const [result] = await db.query(
            "UPDATE birthday_offers SET name = ?, price = ?, best = ?, attributes = ?, link = ?, sort_order = ? WHERE id = ?",
            [
                name,
                price,
                best,
                JSON.stringify(attributes),
                link,
                sort_order,
                req.params.id,
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Не найдено" });
        }

        res.json({ id: req.params.id, name, price, best, attributes, link, sort_order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Удалить запись
router.delete("/:id", async (req, res) => {
    try {
        const [result] = await db.query("DELETE FROM birthday_offers WHERE id = ?", [
            req.params.id,
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Не найдено" });
        }

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
