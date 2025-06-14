import {
    List,
    Datagrid,
    TextField,
    EditButton,
    ArrayInput,
    SimpleFormIterator,
    TextInput,
    Toolbar,
    SaveButton,
    Edit,
    SelectInput,
    SimpleForm,
    Create,
} from "react-admin";
import SimpleMarkdownInput from "../UI/SimpleMarkdownInput";
import { VideoUploader } from "./VideoUploader";


import { ReactSortable } from "react-sortablejs";
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
    useRecordContext,
    ImageField,
    useNotify,
    useRefresh,
    Button,
    FormDataConsumer,
} from "react-admin";

export const ImageUploader = ({ source }) => {
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
        formData.append("questId", record.id);
        formData.append("currentPaths", JSON.stringify(images));

        try {
            const response = await fetch(
                "http://localhost:5000/api/quests/upload-image",
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
                setValue(
                    source,
                    updated.map((path) => ({ path })),
                    { shouldDirty: true }
                );
            }
        } catch (error) {
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

        // Удаление с сервера
        await fetch(`http://localhost:5000/api/quests/delete-image/${record.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ path: imgPath }),
        });

        notify("Изображение удалено", { type: "success" });
        setValue(
            source,
            updated.map((path) => ({ path })),
            { shouldDirty: true }
        );
    };

    // Изменение порядка изображений
    const onSort = (sortedList) => {
        setImages(sortedList);
        setValue(source, sortedList, {
            shouldDirty: true,
        });
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
                        <img
                            src={image}
                            alt={`preview-${index}`}
                            style={{
                                width: "100%",
                                height: "150px",
                                objectFit: "cover",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                            }}
                        />
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
                {() => (
                    <input
                        type="hidden"
                        value={JSON.stringify(images.map((path) => ({ path })))}
                        readOnly
                    />
                )}
            </FormDataConsumer>
        </div>
    );
};



// === Список квестов ===
export const QuestList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="title" label="Название" />
            <EditButton />{" "}
        </Datagrid>
    </List>
);

const CustomToolbar = (props) => (
    <Toolbar {...props}>
        <SaveButton />
    </Toolbar>
);

const categoryChoices = [
    { id: "horror", name: "Ужасы" },
    { id: "adventures", name: "Приключения" },
];

export const QuestEdit = (props) => (
    <Edit {...props} mutationMode="optimistic">
        <SimpleForm toolbar={<CustomToolbar />}>
            <TextInput source="title" label="Название" fullWidth />
            <SimpleMarkdownInput source="description" label="Описание" />
            <TextInput source="people" label="Кол-во игроков" />
            <TextInput source="age" label="Возраст" />
            <TextInput source="difficulty" label="Сложность" />
            <TextInput source="time" label="Длительность" />
            <TextInput source="address" label="Адрес" fullWidth />
            <TextInput source="small_description" label="Краткое описание" fullWidth />

            <SelectInput
                source="category"
                choices={categoryChoices}
                label="Категория"
            />

            <ImageUploader source="img" />
            <VideoUploader source="video" />
        </SimpleForm>
    </Edit>
);

export const QuestCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" label="Название" fullWidth />
            <SimpleMarkdownInput source="description" label="Описание" />
            <TextInput source="people" label="Кол-во игроков" />
            <TextInput source="age" label="Возраст" />
            <TextInput source="difficulty" label="Сложность" />
            <TextInput source="time" label="Длительность" />
            <TextInput source="address" label="Адрес" fullWidth />
            <TextInput source="small_description" label="Краткое описание" fullWidth />
            <SelectInput source="category" choices={categoryChoices} label="Категория" />
            <ImageUploader source="img" />
            <VideoUploader source="video" />
        </SimpleForm>
    </Create>
);
