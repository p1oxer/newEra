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
import questRouter from "./routes/questRoute.js";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

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
app.use("/api/quests", questRouter);

const client = jwksClient({
    jwksUri: `${process.env.SUPABASE_URL}/auth/v1/.well-known/jwks.json`,
});

function getKey(header, callback) {
    client.getSigningKey(header.kid, (err, key) => {
        const signingKey = key?.getPublicKey();
        callback(null, signingKey);
    });
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, getKey, { algorithms: ["RS256"] }, (err, decoded) => {
            if (err) return reject(err);

            const issuer = process.env.SUPABASE_URL; // например: https://xxx.supabase.co/auth/v1
            const expectedIssuer = `${issuer}/auth/v1`;
            const audience = "authenticated"; // см. Supabase документацию

            if (decoded.iss !== expectedIssuer || decoded.aud !== audience) {
                return reject(new Error("Invalid token issuer or audience"));
            }

            resolve(decoded);
        });
    });
}

// Middleware для проверки токена
async function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];
    try {
        const decoded = await verifyToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

function isAdmin(req, res, next) {
    if (req.user.email !== ADMIN_EMAIL) {
        return res.status(403).json({ error: "Access denied" });
    }
    next();
}

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
