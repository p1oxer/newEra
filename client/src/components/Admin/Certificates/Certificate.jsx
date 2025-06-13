import {
    List,
    Datagrid,
    TextField,
    EditButton,
    Edit,
    SimpleForm,
    TextInput,
    ImageField,
    ArrayInput,
    SimpleFormIterator,
    useRecordContext,
    useNotify,
    useRefresh,
    Button,
    FormDataConsumer,
} from "react-admin";
import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";

// === Список записей ===
export const CertificateList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="text" label="Текст" />
            <EditButton />
        </Datagrid>
    </List>
);

// === Компонент для загрузки и отображения изображений ===
const ImageUploader = ({ source }) => {
    const record = useRecordContext();
    const notify = useNotify();
    const refresh = useRefresh();
    const [uploading, setUploading] = useState(false);
    const [images, setImages] = useState([]);

    const { setValue } = useFormContext();
    // Инициализация изображений
    useEffect(() => {
        if (record && record[source]) {
            try {
                const parsed = Array.isArray(record[source])
                    ? record[source]
                    : JSON.parse(record[source]);
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
        const formData = new FormData();
        formData.append("image", file);
        formData.append("certificateId", record.id);
        formData.append("currentPaths", JSON.stringify(images)); // Отправляем текущие пути

        try {
            const response = await fetch(
                "http://localhost:5000/api/certificates/upload-image",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) throw new Error("Upload failed");

            const result = await response.json();

            if (result.success) {
                const newPath = result.image.path;
                const updated = [...images, newPath];
                setImages(updated);
                notify("Изображение успешно загружено", { type: "success" });
                refresh(); // Обновляем UI
            }
        } catch (error) {
            notify("Ошибка загрузки изображения", { type: "error" });
        } finally {
            setUploading(false);
            e.target.value = ""; // Сброс input
        }
    };

    const removeImage = async (index, imgPath) => {
        const updated = images.filter((_, i) => i !== index);
        setImages(updated);

        // Удаление с сервера
        await fetch(`http://localhost:5000/api/certificates/delete-image/${record.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ path: imgPath }),
        });

        notify("Изображение удалено", { type: "success" });

        // Обновляем поле в форме react-admin
        setValue(
            source,
            updated.map((path) => ({ path })),
            { shouldDirty: true }
        );
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

            {/* Превью изображений */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    margin: "10px 0",
                }}
            >
                {images.map((img, index) => (
                    <div key={index} style={{ position: "relative" }}>
                        <ImageField
                            record={{ src: img }}
                            source="src"
                            sx={{ width: 100, height: 100 }}
                        />
                        <button
                            onClick={() => removeImage(index, img)}
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
                            }}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            {/* Скрытое поле для сохранения путей в форме */}
            <ArrayInput
                source={source}
                value={images.map((path) => ({ path }))} // Преобразуем в массив объектов
                onChange={(newArray) => {
                    setImages(newArray.map((item) => item.path));
                }}
                style={{ display: "none" }}
            >
                <SimpleFormIterator>
                    <TextInput source="path" disabled fullWidth />
                </SimpleFormIterator>
            </ArrayInput>
            <FormDataConsumer>
                {({ dispatch, formData }) => (
                    <input
                        type="hidden"
                        value={formData[source] || ""}
                        onChange={() => {}}
                        onFocus={() => {}}
                    />
                )}
            </FormDataConsumer>
        </div>
    );
};
import SimpleMarkdownInput from "../UI/SimpleMarkdownInput";

// === Форма редактирования записи ===
export const CertificateEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <SimpleMarkdownInput source="text"/>
            <ImageUploader source="image_paths" />
        </SimpleForm>
    </Edit>
);
