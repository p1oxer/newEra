// src/posts/PostList.js
import React from "react";
import {
    List,
    Datagrid,
    TextField,
    TextInput,
    EditButton,
    DeleteButton,
} from "react-admin";

const postFilters = [<TextInput label="Поиск" source="q" alwaysOn />];

const PostList = () => (
    <List filters={postFilters}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="title" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export default PostList;
