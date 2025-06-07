import { Box } from "@mui/material"; // или import { makeStyles } from '@mui/styles';
import { CreateButton } from "react-admin";

const ListActions = () => (
    <Box display="flex" justifyContent="flex-end" m={1}>
        <CreateButton />
    </Box>
);

export default ListActions;
