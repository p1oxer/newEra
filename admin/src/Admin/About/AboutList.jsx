import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    EditButton,
} from "react-admin";
import ListActions from "../UI/ActionsList";
const AboutList = (props) => (
    <List {...props} actions={<ListActions />} >
        <Datagrid>
            <TextField source="text" label="Текст" />
            <EditButton />
        </Datagrid>
    </List>
);
export default AboutList;
