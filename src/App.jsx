import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./components/pages/NotFoundPage.jsx";
import QuestsPage from "./components/pages/QuestsPage.jsx";
import Layout from "./Layout.jsx";
import "./assets/scss/style.scss";
import Home from "./components/pages/Home.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "quests/:questID",
                element: <QuestsPage />,
            },
        ],
    },
]);
export default function App() {
    return <RouterProvider router={router} />;
}
