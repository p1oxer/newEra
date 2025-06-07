import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    DeleteButton,
    Pagination,
} from "react-admin";
import ListActions from "../UI/ActionsList";

const ReviewPagination = () => <Pagination rowsPerPageOptions={[5, 10, 25, 50]} />;

const ReviewList = (props) => (
    <List
        {...props}
        pagination={<ReviewPagination />}
        perPage={5}
        actions={<ListActions />} 
    >
        <Datagrid>
            <TextField source="id" />
            <TextField source="text" label="Текст отзыва" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export default ReviewList;
