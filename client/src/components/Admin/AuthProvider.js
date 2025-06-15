// src/authProvider.js

import { supabase } from "../../../supabaseClient";

const authProvider = {
    // Вход пользователя
    login: async ({ email, password }) => {
        try {
            if (!email || !password) {
                throw new Error("Заполните все поля");
            }

            const { data, error } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password: password.trim(),
            });

            if (error) {
                console.error("Login error:", error);
                throw new Error(error.message || "Login failed");
            }

            if (!data?.session) {
                throw new Error("No session received");
            }

            return Promise.resolve();
        } catch (error) {
            console.error("Login exception:", error);
            throw new Error(error.message || "Login failed");
        }
    },

    // Выход пользователя
    logout: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            throw new Error(error.message);
        }
        return Promise.resolve();
    },

    // Обработка ошибок аутентификации
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            return Promise.reject();
        }
        return Promise.resolve();
    },

    // Проверка аутентификации
    checkAuth: async () => {
        const {
            data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
            return Promise.reject();
        }
        return Promise.resolve();
    },

    // Получение прав пользователя
    getPermissions: async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return Promise.reject();
        }

        // Получаем роль пользователя из таблицы profiles
        const { data: profile, error } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

        if (error) {
            return Promise.reject(error.message);
        }

        return Promise.resolve(profile?.role);
    },

    // Получение информации о пользователе
    getIdentity: async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return Promise.reject();
        }

        // Получаем дополнительные данные пользователя
        const { data: profile } = await supabase
            .from("profiles")
            .select("username, avatar_url")
            .eq("id", user.id)
            .single();

        return Promise.resolve({
            id: user.id,
            fullName: profile?.username || user.email,
            avatar: profile?.avatar_url,
        });
    },

    // Обработка callback после аутентификации
    handleCallback: async () => {
        const query = window.location.search;
        if (query.includes("code=") && query.includes("error=")) {
            return Promise.reject();
        }
        return Promise.resolve();
    },
};
export default authProvider;
