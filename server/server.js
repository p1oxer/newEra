import express from "express";
import cors from "cors";
import db from "./db.js";
const app = express();

import reviewsRouter from "./routes/reviews.js";

app.use(cors());
app.use(express.json());

// Подключаем маршруты
app.use('/api/reviews', reviewsRouter);

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
