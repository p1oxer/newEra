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
const router = createBrowserRouter([
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
                path: "404",
                element: <NotFoundPage />,
            },
            {
                path: "information",
                element: <Information />,
            },
            {
                path: "contacts",
                element: <Contacts />,
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
