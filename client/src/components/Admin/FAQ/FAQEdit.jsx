import * as React from "react";
import { Edit, SimpleForm, TextInput } from "react-admin";

const FAQEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput multiline source="title" label="Вопрос" />
            <TextInput multiline source="text" label="Ответ" />
        </SimpleForm>
    </Edit>
);
export default FAQEdit;
