import * as React from "react";
import { Edit, SimpleForm, TextInput, Toolbar, SaveButton } from "react-admin";
import SimpleMarkdownInput from "../UI/SimpleMarkdownInput";

const CustomToolbar = (props) => (
    <Toolbar {...props}>
        <SaveButton />
    </Toolbar>
);

const AboutEdit = (props) => (
    <Edit {...props}>
        <SimpleForm toolbar={<CustomToolbar />}>
            <TextInput disabled source="id" />
            {/* <TextInput multiline source="text" label="Текст" /> */}
            <SimpleMarkdownInput source="text" label="Текст" />
        </SimpleForm>
    </Edit>
);
export default AboutEdit;
