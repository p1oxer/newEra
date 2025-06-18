import React from "react";
import { Create, SimpleForm, TextInput } from "react-admin";
 const ReviewCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput multiline source="text" label="Текст отзыва" />
        </SimpleForm>
    </Create>
);
export default ReviewCreate;
