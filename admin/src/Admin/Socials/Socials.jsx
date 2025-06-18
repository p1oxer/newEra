import * as React from "react";
import {
    Create,
    SimpleForm,
    TextInput,
    SelectInput,
    required,
    List,
    CreateButton,
    Datagrid,
    TextField,
    EditButton,
    DeleteButton,
    Pagination,
    Edit,
} from "react-admin";

import ListActions from "../UI/ActionsList";

const SocialsPagination = () => <Pagination rowsPerPageOptions={[5, 10, 25, 50]} />;

// Список доступных типов соцсетей
const networkTypes = [
    { id: "vk", name: "VK" },
    { id: "instagram", name: "Instagram" },
    { id: "youtube", name: "YouTube" },
    { id: "tiktok", name: "TikTok" },
    { id: "telegram", name: "Telegram" },
];

export const SocialsCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <SelectInput
                source="network_type"
                choices={networkTypes}
                validate={required()}
                label="Тип соцсети"
            />
            <TextInput source="url" fullWidth validate={required()} label="Ссылка" />
        </SimpleForm>
    </Create>
);

export const SocialsEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <SelectInput
                source="network_type"
                choices={networkTypes}
                validate={required()}
                label="Тип соцсети"
            />
            <TextInput source="url" fullWidth validate={required()} label="Ссылка" />
        </SimpleForm>
    </Edit>
);

export const SocialsList = (props) => (
    <List
        {...props}
        pagination={<SocialsPagination />}
        perPage={5}
        actions={
            <ListActions>
                <CreateButton />
            </ListActions>
        }
        title="Социальные сети"
    >
        <Datagrid>
            <TextField source="network_type" label="Тип" />
            <TextField source="url" label="Ссылка" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);
