import * as React from "react";
import { Edit, SimpleForm, TextInput } from "react-admin";
import SimpleMarkdownInput from "../UI/SimpleMarkdownInput";

const FAQEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput multiline source="title" label="Вопрос" />
            <SimpleMarkdownInput source="text" label="Ответ" />
        </SimpleForm>
    </Edit>
);
export default FAQEdit;
