import express from "express";
import db from "../db.js";

const router = express.Router();

// 🔍 Получить все отзывы
router.get("/", async (_req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM reviews");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// app.get("/reviews", (req, res) => {
//     const query = "SELECT * FROM reviews;";
//     db.query(query, (err, data) => {
//         if (err) return res.json(err);
//         return res.json(data);
//     });
// });

export default router;
