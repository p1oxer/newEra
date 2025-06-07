import express from "express";
import cors from "cors";
import db from "./db.js";
const app = express();

import reviewsRouter from "./routes/reviews.js";
import faqRouter from "./routes/faq.js";
import aboutRouter from "./routes/about.js";

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
app.use("/api/about", aboutRouter);

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT,  () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
