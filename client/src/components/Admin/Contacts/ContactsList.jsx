// src/resources/contacts/ContactsList.jsx
import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    DeleteButton,
    Pagination,
    CreateButton,
} from "react-admin";
import ListActions from "../UI/ActionsList";

const ContactsPagination = () => <Pagination rowsPerPageOptions={[5, 10, 25, 50]} />;

export const ContactsList = (props) => (
    <List
        {...props}
        pagination={<ContactsPagination />}
        perPage={5}
        actions={
            <ListActions>
                <CreateButton />
            </ListActions>
        }
        title="Контакты"
    >
        <Datagrid>
            <TextField source="id" label="ID" />
            <TextField source="info_type" label="Тип" />
            <TextField source="value" label="Значение" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);
