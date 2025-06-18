// src/dataProvider.js

import { fetchUtils } from "react-admin";
import queryString from "query-string";
import { supabase } from "../../supabaseClient";

const apiUrl = "http://localhost:5000/api"; // общий путь

const getAuthToken = async () => {
    const {
        data: { session },
    } = await supabase.auth.getSession();
    return session?.access_token;
};

const httpClient = async (url, options = {}) => {
    const token = await getAuthToken();
    if (!token) throw new Error("No token");

    const headers = new Headers(options.headers || {});
    headers.set("Authorization", `Bearer ${token}`);

    return fetchUtils.fetchJson(url, { ...options, headers });
};

export default {
    getList: async (resource, params) => {
        const { page = 1, perPage = 5 } = params.pagination || {};
        const { field = "id", order = "ASC" } = params.sort || {};

        const start = (page - 1) * perPage;
        const end = page * perPage;

        const query = {
            _sort: field,
            _order: order,
            _start: start,
            _end: end,
        };

        const url = `${apiUrl}/${resource}?${queryString.stringify(query)}`;

        const { json, headers } = await httpClient(url);

        let total = json.length;

        const contentRange = headers.get("Content-Range");
        if (contentRange) {
            const match = /.*\/(\d+)/.exec(contentRange); // парсим /total
            if (match && match[1]) {
                total = parseInt(match[1], 10);
            }
        }

        return {
            data: json.map((item) => ({ id: item.id, ...item })),
            total,
        };
    },

    getOne: async (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        const { json } = await httpClient(url);
        return { data: { id: json.id, ...json } };
    },

    create: async (resource, params) => {
        const url = `${apiUrl}/${resource}`;
        const { json } = await httpClient(url, {
            method: "POST",
            body: JSON.stringify(params.data),
            headers: new Headers({ "Content-Type": "application/json" }),
        });

        const id = json.id || params.data.id;
        return { data: { id, ...params.data } };
    },

    update: async (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        await httpClient(url, {
            method: "PUT",
            body: JSON.stringify(params.data),
            headers: new Headers({ "Content-Type": "application/json" }),
        });

        return { data: { id: params.id, ...params.data } };
    },

    delete: async (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        await httpClient(url, { method: "DELETE" });
        return { data: {} };
    },

    deleteMany: async (resource, params) => {
        const promises = params.ids.map((id) =>
            httpClient(`${apiUrl}/${resource}/${id}`, { method: "DELETE" })
        );
        await Promise.all(promises);
        return { data: params.ids };
    },

    getMany: async () => ({ data: [] }),
    getManyReference: async () => ({ data: [], total: 0 }),
    updateMany: async () => ({ data: [] }),
};
