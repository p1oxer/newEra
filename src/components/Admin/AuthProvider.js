// src/authProvider.js
const authProvider = {
    login: ({ username }) => {
        localStorage.setItem("username", username);
        return Promise.resolve();
    },
    logout: () => {
        localStorage.removeItem("username");
        return Promise.resolve();
    },
    checkAuth: () =>
        localStorage.getItem("username") ? Promise.resolve() : Promise.reject(),
    checkError: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
};

export default authProvider;
