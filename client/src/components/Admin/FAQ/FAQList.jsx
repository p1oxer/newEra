import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    DeleteButton,
    Pagination,
} from "react-admin";
const FAQPagination = () => <Pagination rowsPerPageOptions={[5, 10, 25, 50]} />;
const FAQList = (props) => (
    <List {...props} pagination={<FAQPagination />} perPage={5}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" label="Вопрос" />
            <TextField source="text" label="Ответ" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);
export default FAQList;
