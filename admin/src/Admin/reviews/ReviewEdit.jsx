import * as React from "react";
import { Edit, SimpleForm, TextInput } from "react-admin";

const ReviewEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput multiline source="text" label="Текст отзыва" />
        </SimpleForm>
    </Edit>
);
export default ReviewEdit;
