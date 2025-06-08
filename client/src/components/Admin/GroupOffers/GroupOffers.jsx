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
} from "react-admin";
import AttributesInput from "./AttributesInput";
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
            <TextField source="id" label="ID" />
            <TextField source="name" label="Название" />
            <TextField source="price" label="Цена" />
            <FunctionField
                label="Атрибуты"
                render={(record) => {
                    try {
                        const attrs = JSON.parse(record.attributes || "[]");
                        return (
                            <ul
                                style={{
                                    margin: 0,
                                    // padding: "0 16px",
                                }}
                            >
                                {attrs.slice(0, 3).map((attr, index) => (
                                    <li key={index}>{attr}</li>
                                ))}
                                {attrs.length > 3 && (
                                    <li>И другие ({attrs.length - 3})</li>
                                )}
                            </ul>
                        );
                    } catch (e) {
                        return <span>Атрибутов нет</span>;
                    }
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
            <AttributesInput source="attributes" label="Атрибуты" />
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
            <AttributesInput source="attributes" label="Атрибуты" />
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
