import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./components/pages/NotFoundPage.jsx";
import QuestsPage from "./components/pages/QuestsPage.jsx";
import Layout from "./components/Layouts/Layout.jsx";
import "./assets/scss/style.scss";
import Home from "./components/pages/Home.jsx";
import MainLayout from "./components/Layouts/MainLayout.jsx";
import Quests from "./components/pages/Quests.jsx";

import QuestCategory from "./components/pages/questCategory.jsx";
import Information from "./components/pages/Information.jsx";
import Contacts from "./components/pages/Contacts.jsx";
import Group from "./components/pages/Group.jsx";
import Birthday from "./components/pages/Birthday.jsx";
import Sertificate from "./components/pages/Sertificate.jsx";
import AdminPanel from "./components/Admin/AdminPanel.jsx";
const router = createBrowserRouter([
    { path: "admin/*", element: <AdminPanel /> },
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
        ],
    },
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: "quests",
                element: <Quests />,
            },
            {
                path: "quests/:questCategory",
                element: <QuestCategory />,
            },
            {
                path: "quests/:questCategory/:questId",
                element: <QuestsPage />,
            },
            {
                path: "information",
                element: <Information />,
            },
            {
                path: "contacts",
                element: <Contacts />,
            },
            {
                path: "group",
                element: <Group />,
            },
            {
                path: "birthday",
                element: <Birthday />,
            },
            {
                path: "sertificate",
                element: <Sertificate />,
            },
            // Ловушка для несуществующих маршрутов
            {
                path: "*",
                element: <NotFoundPage />,
            },
        ],
    },
]);
export default function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}
