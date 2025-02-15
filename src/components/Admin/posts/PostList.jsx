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

const PostList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="title" />
            <DeleteButton />
        </Datagrid>
    </List>
);

export default PostList;
