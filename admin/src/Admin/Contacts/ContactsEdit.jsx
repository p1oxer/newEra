// src/resources/contacts/ContactEdit.jsx
import * as React from "react";
import { Edit, SimpleForm, TextInput, SelectInput, required } from "react-admin";

// Список доступных типов контактов
const infoTypes = [
    { id: "address", name: "Адрес" },
    { id: "phone", name: "Телефон" },
    { id: "working_hours", name: "Часы работы" },
];

export const ContactsEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <SelectInput
                source="info_type"
                choices={infoTypes}
                validate={required()}
                label="Тип информации"
            />
            <TextInput
                source="value"
                multiline
                fullWidth
                validate={required()}
                label="Значение"
            />
        </SimpleForm>
    </Edit>
);
