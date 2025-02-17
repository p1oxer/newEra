// src/posts/PostList.js
import React from "react";
import { List, Datagrid, TextField, EditButton, DeleteButton } from "react-admin";

const PostList = () => {
    
    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField source="title" />
                <EditButton />
                <DeleteButton />
            </Datagrid>
        </List>
    );
};

export default PostList;