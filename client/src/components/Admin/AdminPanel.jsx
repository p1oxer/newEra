import React from "react";
import { Admin, Resource, ListGuesser } from "react-admin";
import PostList from "./posts/PostList";
import PostEdit from "./posts/PostEdit";
import PostCreate from "./posts/PostCreate";
import ReviewList from "./reviews/ReviewList";
import ReviewEdit from "./reviews/ReviewEdit";
import ReviewCreate from "./reviews/ReviewCreate";
import dataProvider from "./dataProvider";
import authProvider from "./AuthProvider";
import LoginPage from "./LoginPage"; // Импортируем кастомную страницу логина
import russianMessages from "ra-language-russian";
import polyglotI18nProvider from "ra-i18n-polyglot";

const i18nProvider = polyglotI18nProvider(() => russianMessages, "ru");
const AdminPanel = () => (
    <Admin
        i18nProvider={i18nProvider}
        basename="/admin"
        dataProvider={dataProvider}
        authProvider={authProvider}
        loginPage={LoginPage}
    >
        <Resource
            name="reviews"
            list={ReviewList}
            edit={ReviewEdit}
            create={ReviewCreate}
            options={{ label: "Отзывы" }}
        />
    </Admin>
);

export default AdminPanel;
