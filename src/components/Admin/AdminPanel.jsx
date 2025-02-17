import React from "react";
import { Admin, Resource, ListGuesser } from "react-admin";
import PostList from "./posts/PostList";
import PostEdit from "./posts/PostEdit";
import PostCreate from "./posts/PostCreate";
import fakeDataProvider from "./FakeDataProvider";
import authProvider from "./AuthProvider";
import LoginPage from "./LoginPage"; // Импортируем кастомную страницу логина
import russianMessages from "ra-language-russian";
import polyglotI18nProvider from "ra-i18n-polyglot";
import { Link } from "react-router-dom";

const i18nProvider = polyglotI18nProvider(() => russianMessages, "ru");
const AdminPanel = () => (
    <Admin
        i18nProvider={i18nProvider}
        basename="/admin"
        dataProvider={fakeDataProvider}
        authProvider={authProvider}
        loginPage={LoginPage}
    >
        <Resource name="quests" list={PostList} edit={PostEdit} create={PostCreate} />
    </Admin>
);

export default AdminPanel;
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

// // Статичные данные для примера
// const users = [
//     { id: 1, name: "Квест 1", email: "Описание квеста 1" },
//     { id: 1, name: "Квест 2", email: "Описание квеста 2" },
//     { id: 1, name: "Квест 3", email: "Описание квеста 3" },
// ];

// // Компонент Dashboard
// const Dashboard = () => (
//     <div>
//         <h2>Панель управления</h2>
//         <p>Добро пожаловать в административную панель!</p>
//     </div>
// );

// // Компонент Users
// const Users = () => (
//     <div>
//         <h2>Квесты</h2>
//         <table className="table">
//             <thead>
//                 <tr>
//                     <th>Имя квеста</th>
//                     <th>Описание квеста</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {users.map((user) => (
//                     <tr key={user.id}>
//                         <td>{user.name}</td>
//                         <td>{user.email}</td>
//                         <td>
//                             <button>Редактировать</button>
//                         </td>
//                         <td>
//                             <button>Удалить</button>
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     </div>
// );

// const AdminPanel = () => {
//     return (
//         <div>
//             {/* Верхняя панель */}
//             <header className="app-bar">
//                 <h1>Административная панель</h1>
//                 <NavLink to="/">На главную</NavLink>
//             </header>

//             {/* Боковая панель */}
//             <nav className="drawer">
//                 <NavLink to="/admin/users" activeClassName="active">
//                     Квесты
//                 </NavLink>
//             </nav>
//             <Users />
//         </div>
//     );
// };

// export default AdminPanel;
