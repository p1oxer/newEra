import express from "express";
import cors from "cors";
const app = express();

import reviewsRouter from "./routes/reviews.js";
import faqRouter from "./routes/faq.js";
import aboutRouter from "./routes/about.js";
import contactsRouter from "./routes/contacts.js";
import socialsRouter from "./routes/socials.js";
import birthdayRouter from "./routes/birthday.js";
import birthdayDescriptionRouter from "./routes/birthdayDescription.js";
import groupRouter from "./routes/group.js";
import groupDescriptionRouter from "./routes/groupDescription.js";
import imageRouter from "./routes/image.js";
import certificateRouter from "./routes/certificateRoutes.js";

// import generateAllImages from "./scripts/generateImages.js";
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        exposedHeaders: ["Content-Range"],
    })
);
app.use(express.json());

// Подключаем маршруты
app.use("/api/reviews", reviewsRouter);
app.use("/api/faq", faqRouter);
app.use("/api/about", aboutRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/socials", socialsRouter);
app.use("/api/birthday_offers", birthdayRouter);
app.use("/api/birthday-description", birthdayDescriptionRouter);
app.use("/api/group_offers", groupRouter);
app.use("/api/group-description", groupDescriptionRouter);
app.use("/api/image", imageRouter);
app.use("/api/certificates", certificateRouter);

// console.log("Запускаем генерацию изображений...");
// await generateAllImages(); // Ждём завершения

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
