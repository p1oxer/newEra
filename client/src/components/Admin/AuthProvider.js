import { supabase } from "../../../supabaseClient";

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
        return session ? Promise.resolve() : Promise.reject();
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
        return Promise.resolve({
            id: user.id,
            fullName: user.email,
            email: user.email,
        });
    },
    getPermissions: () => Promise.resolve(["admin"]),
};
