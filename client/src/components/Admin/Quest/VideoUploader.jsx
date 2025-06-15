import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useRecordContext, useNotify } from "react-admin";
import { Button, Typography, Box } from "@mui/material";

export const VideoUploader = ({ source }) => {
    const record = useRecordContext();
    const notify = useNotify();
    const { setValue } = useFormContext();
    const [uploading, setUploading] = useState(false);
    const [currentVideo, setCurrentVideo] = useState("");

    // Инициализация текущего видео
    useEffect(() => {
        if (record && record[source]) {
            setCurrentVideo(record[source]);
        }
    }, [record, source]);

    // Загрузка нового видео
    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("video", file);
        formData.append("questId", record.id);

        try {
            const response = await fetch(
                "http://localhost:5000/api/quests/upload-video",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) throw new Error("Ошибка загрузки видео");
            const result = await response.json();

            if (result.success) {
                const newPath = result.video;
                setCurrentVideo(newPath);
                setValue(source, newPath, { shouldDirty: true });
                notify("Видео успешно загружено", { type: "success" });
            }
        } catch (error) {
            notify("Не удалось загрузить видео", { type: "error" });
        } finally {
            setUploading(false);
            e.target.value = ""; // Сброс input
        }
    };

    // Удаление видео
    const handleDelete = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/quests/delete-video/${record.id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ path: currentVideo }),
                }
            );

            if (!response.ok) throw new Error("Ошибка удаления видео");

            const result = await response.json();
            if (result.success) {
                setCurrentVideo("");
                setValue(source, "", { shouldDirty: true });
                notify("Видео удалено", { type: "success" });
            }
        } catch (error) {
            notify("Не удалось удалить видео", { type: "error" });
        }
    };

    return (
        <Box sx={{ marginTop: 2 }}>
            {/* Input для загрузки */}
            <input
                type="file"
                id="video-upload"
                accept="video/*"
                onChange={handleUpload}
                style={{ display: "none" }}
                disabled={uploading}
            />

            {/* Кнопка загрузки/замены */}
            <label htmlFor="video-upload">
                <Button
                    component="span"
                    variant="contained"
                    color="primary"
                    disabled={uploading}
                >
                    {uploading
                        ? "Загрузка..."
                        : currentVideo
                        ? "Заменить видео"
                        : "Загрузить видео"}
                </Button>
            </label>

            {/* Кнопка удаления */}
            {currentVideo && (
                <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDelete}
                    sx={{ marginLeft: 2 }}
                >
                    Удалить видео
                </Button>
            )}

            {/* Превью видео */}
            {currentVideo && (
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="subtitle1">Текущее видео:</Typography>
                    <video
                        src={currentVideo}
                        controls
                        style={{
                            width: "100%",
                            maxWidth: "600px",
                            marginTop: "10px",
                            maxHeight: "200px",
                        }}
                    >
                        Ваш браузер не поддерживает тег video.
                    </video>
                </Box>
            )}

            {/* Скрытое поле для отправки значения в форме */}
            <input type="hidden" value={currentVideo} readOnly />
        </Box>
    );
};
