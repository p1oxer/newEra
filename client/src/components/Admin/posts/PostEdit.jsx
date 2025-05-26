// src/posts/PostEdit.js
import React from "react";
import { Edit, SimpleForm, TextInput } from "react-admin";

const PostEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Edit>
);

export default PostEdit;