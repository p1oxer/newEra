import express from "express";
import cors from "cors";
import db from "./db.js";
const app = express();

import reviewsRouter from "./routes/reviews.js";
import faqRouter from "./routes/faq.js";

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
        exposedHeaders: ["Content-Range"],
    })
);
app.use(express.json());

// Подключаем маршруты
app.use('/api/reviews', reviewsRouter);
app.use('/api/faq', faqRouter);

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
