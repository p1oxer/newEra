// src/AdminPanel.js
import React from "react";
import { createMemoryHistory } from "history"; 
import { AdminUI,Admin, Resource } from "react-admin";
import fakeDataProvider from "./FakeDataProvider.js";
import polyglotI18nProvider from "ra-i18n-polyglot";
import russianMessages from "ra-language-russian";
import ThemeWrapper from "../ThemeWrapper"; // Тёмная тема
import PreferencesProvider from "./PreferencesProvider"; // Контекст настроек
import QueryClientWrapper from "./QueryClientWrapper"; // Управление запросами
import PostList from "./posts/PostList";
import PostEdit from "./posts/PostEdit";
import PostCreate from "./posts/PostCreate";
import authProvider from './AuthProvider';
import LoginPage from "./LoginPage"
// Локализация на русский язык
const i18nProvider = polyglotI18nProvider(() => russianMessages, "ru");
const history = createMemoryHistory();
const AdminPanel = () => {
    
    return (
        <QueryClientWrapper>
            <ThemeWrapper>
                <PreferencesProvider>
                    <Admin
                    history={history}
                        dataProvider={fakeDataProvider}
                        i18nProvider={i18nProvider}
                        basename="/admin"
                        loginPage={LoginPage}
                    >
                        <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} />
                    </Admin>
                </PreferencesProvider>
            </ThemeWrapper>
        </QueryClientWrapper>
    );
};

export default AdminPanel;