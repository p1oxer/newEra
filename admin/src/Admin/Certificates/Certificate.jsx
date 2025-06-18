import {
    List,
    Datagrid,
    TextField,
    EditButton,
    Edit,
    SimpleForm,
    useRecordContext,
    useNotify,
    Button,
    FormDataConsumer,
    Toolbar,
    SaveButton,
    CreateButton,
} from "react-admin";
import { useState, useEffect } from "react";

// === Список записей ===
export const CertificateList = (props) => (
    <List {...props} actions={<ListActions></ListActions>}>
        <Datagrid>
            <TextField source="text" label="Текст" />
            <EditButton />
        </Datagrid>
    </List>
);

import { ReactSortable } from "react-sortablejs";
import { supabase } from "../../../supabaseClient";

export const ImageUploader = ({ source }) => {
    const record = useRecordContext();
    const notify = useNotify();
    const [uploading, setUploading] = useState(false);
    const [images, setImages] = useState([]);

    const { setValue } = useFormContext();

    // Инициализация изображений при редактировании
    useEffect(() => {
        if (record && record[source]) {
            try {
                let parsed = Array.isArray(record[source])
                    ? record[source]
                    : JSON.parse(record[source]);

                if (Array.isArray(parsed)) {
                    parsed = parsed.map((item) =>
                        typeof item === "object" && item !== null ? item.path : item
                    );
                }

                setImages(parsed);
            } catch (e) {
                setImages([]);
            }
        }
    }, [record, source]);

    // Загрузка нового изображения
    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);

        try {
            // Получаем токен
            const {
                data: { session },
            } = await supabase.auth.getSession();

            const token = session?.access_token;
            if (!token) throw new Error("No token");

            const formData = new FormData();
            formData.append("image", file);
            formData.append("certificateId", record.id);
            formData.append("currentPaths", JSON.stringify(images));

            const response = await fetch(
                `${import.meta.env.VITE_API_HOST}/admin/certificates/upload-image`,
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) throw new Error("Upload failed");
            const result = await response.json();

            if (result.success) {
                const newPath = result.image.path;
                const updated = [...images, newPath];
                setImages(updated);
                setValue(source, updated, { shouldDirty: true });
                notify("Изображение успешно загружено", { type: "success" });
            }
        } catch (error) {
            console.error(error);
            notify("Ошибка загрузки изображения", { type: "error" });
        } finally {
            setUploading(false);
            e.target.value = ""; // Сброс input
        }
    };

    // Удаление изображения
    const removeImage = async (index, imgPath) => {
        const updated = images.filter((_, i) => i !== index);
        setImages(updated);

        try {
            // Получаем токен
            const {
                data: { session },
            } = await supabase.auth.getSession();

            const token = session?.access_token;
            if (!token) throw new Error("No token");

            const response = await fetch(
                `${import.meta.env.VITE_API_HOST}/admin/certificates/delete-image/${
                    record.id
                }`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ path: imgPath }),
                }
            );

            if (!response.ok) throw new Error("Delete failed");

            notify("Изображение удалено", { type: "success" });
        } catch (err) {
            notify("Ошибка удаления изображения", { type: "error" });
        }

        setValue(source, updated, { shouldDirty: true });
    };

    // Сортировка изображений
    const onSort = (sortedList) => {
        setImages(sortedList);
        setValue(source, sortedList, { shouldDirty: true });
    };

    return (
        <div style={{ margin: "20px 0" }}>
            {/* Кнопка загрузки */}
            <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleUpload}
                style={{ display: "none" }}
                disabled={uploading}
            />
            <label htmlFor="image-upload">
                <Button component="span" color="primary" disabled={uploading}>
                    {uploading ? "Загрузка..." : "Добавить изображение"}
                </Button>
            </label>

            {/* Превью изображений с возможностью сортировки */}
            <ReactSortable
                list={images}
                setList={onSort}
                animation={200}
                handle=".handle"
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    marginTop: "20px",
                }}
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        data-index={index}
                        style={{
                            position: "relative",
                            width: "150px",
                            cursor: "grab",
                            userSelect: "none",
                        }}
                        className="handle"
                    >
                        <picture>
                            <source
                                srcSet={`${import.meta.env.VITE_UPLOADS_URL}${
                                    image.split(".")[0]
                                }-560.avif`}
                                type="image/avif"
                                media="(min-width: 320px)"
                            />
                            <source
                                srcSet={`${import.meta.env.VITE_UPLOADS_URL}${
                                    image.split(".")[0]
                                }-560.webp`}
                                type="image/webp"
                                media="(min-width: 320px)"
                            />
                            <img
                                src={`${import.meta.env.VITE_UPLOADS_URL}${image}`}
                                alt={`preview-${index}`}
                                loading="lazy"
                                style={{
                                    width: "100%",
                                    height: "150px",
                                    objectFit: "cover",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                }}
                            />
                        </picture>
                        <button
                            onClick={() => removeImage(index, image)}
                            style={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                width: "30px",
                                backgroundColor: "rgba(0,0,0,0.5)",
                                color: "white",
                                fontSize: "20px",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </ReactSortable>

            {/* Скрытое поле для сохранения путей в форме */}
            <FormDataConsumer>
                {() => <input type="hidden" value={JSON.stringify(images)} readOnly />}
            </FormDataConsumer>
        </div>
    );
};

import SimpleMarkdownInput from "../UI/SimpleMarkdownInput";
import { useFormContext } from "react-hook-form";
import ListActions from "../UI/ActionsList";


const CustomToolbar = (props) => (
    <Toolbar {...props}>
        <SaveButton />
    </Toolbar>
);
// === Форма редактирования записи ===
export const CertificateEdit = (props) => (
    <Edit {...props} mutationMode="optimistic">
        <SimpleForm toolbar={<CustomToolbar />}>
            <SimpleMarkdownInput source="text" />
            <ImageUploader source="image_paths" />
        </SimpleForm>
    </Edit>
);
