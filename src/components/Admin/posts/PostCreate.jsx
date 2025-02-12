import React from "react";
import { Create, SimpleForm, TextInput } from "react-admin";

const PostCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Create>
);

export default PostCreate;
