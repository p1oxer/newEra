import { Create, SimpleForm, TextInput } from "react-admin";
import RichTextInput from "../../UI/RichTextInput";

export default function FAQCreate() {
    return (
        <Create>
            <SimpleForm>
                <TextInput multiline source="title" label="Вопрос" />
                <TextInput multiline source="text" label="Ответ" />
            </SimpleForm>
        </Create>
    );
}
