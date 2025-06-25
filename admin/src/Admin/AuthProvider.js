import { supabase } from "../../supabaseClient";

// Функция для проверки времени жизни токена
const checkTokenExpiration = (session) => {
    if (!session) return false;

    // Получаем время истечения токена
    const expiresAt = session.expires_at;
    const currentTime = Math.floor(Date.now() / 1000);

    // Если токен истек (оставляем запас в 5 минут)
    if (expiresAt && currentTime > expiresAt - 300) {
        console.log("Токен истек, выполняем выход");
        supabase.auth.signOut();
        return false;
    }

    return true;
};

export default {
    login: async ({ email, password }) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw new Error(error.message);
        return Promise.resolve();
    },
    logout: async () => {
        await supabase.auth.signOut();
        return Promise.resolve();
    },
    checkAuth: async () => {
        const {
            data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
            return Promise.reject();
        }

        // Проверяем время жизни токена
        if (!checkTokenExpiration(session)) {
            return Promise.reject();
        }

        return Promise.resolve();
    },
    checkError: (error) => {
        return error.status === 401 || error.status === 403
            ? Promise.reject()
            : Promise.resolve();
    },
    getIdentity: async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            throw new Error("Пользователь не найден");
        }

        return Promise.resolve({
            id: user.id,
            fullName: user.email,
            email: user.email,
        });
    },
    getPermissions: () => Promise.resolve(["admin"]),
};
