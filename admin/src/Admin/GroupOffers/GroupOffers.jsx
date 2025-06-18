import {
    Create,
    SimpleForm,
    TextInput,
    BooleanInput,
    NumberInput,
    Edit,
    Datagrid,
    TextField,
    EditButton,
    DeleteButton,
    CreateButton,
    List,
    Pagination,
    required,
    FunctionField,
    ArrayInput,
    SimpleFormIterator,
} from "react-admin";
import ListActions from "../UI/ActionsList";
import SimpleMarkdownInput from "../UI/SimpleMarkdownInput";
import { GroupDescriptionField } from "./GroupDescriptionField";

const GroupPagination = () => <Pagination rowsPerPageOptions={[5, 10, 25, 50]} />;

export const GroupList = (props) => (
    <List
        {...props}
        pagination={<GroupPagination />}
        perPage={5}
        actions={
            <ListActions>
                <CreateButton />
            </ListActions>
        }
        title="Предложения школьный класс/выпускной/корпоратив"
    >
        <Datagrid>
            <TextField source="name" label="Название" />
            <TextField source="price" label="Цена" />
            <FunctionField
                label="Атрибуты"
                render={(record) => {
                    let attrs = [];

                    // Если это строка — пытаемся распарсить
                    if (typeof record.attributes === "string") {
                        try {
                            attrs = JSON.parse(record.attributes);
                        } catch {
                            attrs = [];
                        }
                    }
                    // Если это уже массив — используем напрямую
                    else if (Array.isArray(record.attributes)) {
                        attrs = record.attributes;
                    }

                    return (
                        <ul style={{ margin: 0, paddingLeft: "16px" }}>
                            {attrs.slice(0, 3).map((attr, index) => (
                                <li key={index}>{attr}</li>
                            ))}
                            {attrs.length > 3 && <li>И другие ({attrs.length - 3})</li>}
                        </ul>
                    );
                }}
            />
            <EditButton />
            <DeleteButton />
        </Datagrid>
        <GroupDescriptionField />
    </List>
);

export const GroupCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" label="Название пакета" validate={required()} />
            <TextInput source="price" label="Цена" validate={required()} />
            <BooleanInput source="best" label="Популярный" />
            <ArrayInput
                style={{ maxWidth: "600px" }}
                source="attributes"
                label="Атрибуты"
            >
                <SimpleFormIterator>
                    <TextInput source="" label="Атрибут" fullWidth />
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput source="link" label="Ссылка" validate={required()} />
        </SimpleForm>
    </Create>
);
export const GroupEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" label="Название пакета" validate={required()} />
            <TextInput source="price" label="Цена" validate={required()} />
            <BooleanInput source="best" label="Популярный" />
            <ArrayInput
                style={{ maxWidth: "600px" }}
                source="attributes"
                label="Атрибуты"
            >
                <SimpleFormIterator>
                    <TextInput source="" label="Атрибут" fullWidth />
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput source="link" label="Ссылка" validate={required()} />
        </SimpleForm>
    </Edit>
);

export const GroupDescriptionEdit = (props) => (
    <Edit {...props} title="Редактировать текст">
        <SimpleForm>
            <SimpleMarkdownInput source="description" label="Текст" />
        </SimpleForm>
    </Edit>
);
