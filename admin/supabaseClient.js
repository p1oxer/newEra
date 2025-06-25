import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        // Автоматический выход через 1 день (86400 секунд)
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        // Настройка времени жизни токена (в секундах)
        // 86400 = 1 день, 3600 = 1 час, 604800 = 1 неделя
        storageKey: "supabase.auth.token",
        storage: {
            getItem: (key) => {
                const item = localStorage.getItem(key);
                if (item) {
                    const parsed = JSON.parse(item);
                    // Проверяем, не истек ли токен
                    if (parsed.expires_at && Date.now() > parsed.expires_at * 1000) {
                        localStorage.removeItem(key);
                        return null;
                    }
                }
                return item;
            },
            setItem: (key, value) => localStorage.setItem(key, value),
            removeItem: (key) => localStorage.removeItem(key),
        },
    },
});

// Слушатель изменения состояния аутентификации
supabase.auth.onAuthStateChange((event, session) => {
    if (event === "TOKEN_REFRESHED") {
        console.log("Токен обновлен");
    } else if (event === "SIGNED_OUT") {
        console.log("Пользователь вышел из системы");
        // Перенаправляем на страницу входа
        window.location.href = "/#/login";
    }
});
