import { Create, SimpleForm, TextInput } from "react-admin";
import SimpleMarkdownInput from "../UI/SimpleMarkdownInput";

export default function FAQCreate() {
    return (
        <Create>
            <SimpleForm>
                <TextInput multiline source="title" label="Вопрос" />
                <SimpleMarkdownInput source="text" label="Ответ" />
            </SimpleForm>
        </Create>
    );
}
