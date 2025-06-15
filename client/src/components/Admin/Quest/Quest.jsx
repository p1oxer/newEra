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
    DeleteButton,
    required,
} from "react-admin";
import SimpleMarkdownInput from "../UI/SimpleMarkdownInput";
import { VideoUploader } from "./VideoUploader";
import { ImageUploader } from "./ImageUploader";

// === Список квестов ===
export const QuestList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="title" label="Название" />
            <EditButton />
            <DeleteButton />
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
            <TextInput validate={required()} source="title" label="Название" fullWidth />
            <SimpleMarkdownInput
                validate={required()}
                source="description"
                label="Описание"
            />
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
    </Edit>
);

export const QuestCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput validate={required()} source="title" label="Название" fullWidth />
            <SimpleMarkdownInput
                validate={required()}
                source="description"
                label="Описание"
            />
            <TextInput source="people" label="Кол-во игроков" />
            <TextInput source="age" label="Возраст" />
            <TextInput source="difficulty" label="Сложность" />
            <TextInput source="time" label="Длительность" />
            <TextInput source="address" label="Адрес" fullWidth />
            <TextInput source="small_description" label="Краткое описание" fullWidth />
            <SelectInput source="category" choices={categoryChoices} label="Категория" />
        </SimpleForm>
    </Create>
);
