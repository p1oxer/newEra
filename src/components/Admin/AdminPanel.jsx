import React from "react";
import { Admin, Resource, ListGuesser } from "react-admin";
import PostList from "./posts/PostList";
import PostEdit from "./posts/PostEdit";
import PostCreate from "./posts/PostCreate";
import fakeDataProvider from "./FakeDataProvider";
import authProvider from "./AuthProvider";
import LoginPage from "./LoginPage"; // Импортируем кастомную страницу логина
const AdminPanel = () => (
    <Admin
        basename="/admin"
        dataProvider={fakeDataProvider}
        authProvider={authProvider}
        loginPage={LoginPage}
    >
        <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} />
    </Admin>
);

export default AdminPanel;
