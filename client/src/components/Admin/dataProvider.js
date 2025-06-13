// src/dataProvider.js
import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

const apiUrl = "http://localhost:5000/api";

export default {
    // Получить список
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

        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        // fetchUtils.fetchJson возвращает объект: { json, headers, status }
        const { json, headers } = await fetchUtils.fetchJson(url);

        // Получаем total из заголовка Content-Range или другого источника
        const contentRange = headers.get("Content-Range");
        let total = 0;

        if (contentRange) {
            // парсим Content-Range: reviews 0-5/12
            const match = /\/(\d+)$/.exec(contentRange);
            if (match && match[1]) {
                total = parseInt(match[1], 10);
            }
        }

        return {
            data: json.map((item) => ({ id: item.id, ...item })),
            total: total || 0,
        };
    },

    // Получить одну запись
    getOne: async (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        const { json } = await fetchUtils.fetchJson(url);
        return { data: { id: json.id, ...json } };
    },

    // Создать запись
    create: async (resource, params) => {
        const url = `${apiUrl}/${resource}`;
        const { json } = await fetchUtils.fetchJson(url, {
            method: "POST",
            body: JSON.stringify(params.data),
            headers: new Headers({ "Content-Type": "application/json" }),
        });

        const id = json.id || json.insertId || params.data.id;

        return { data: { id, ...params.data } };
    },

    // Обновить запись
    update: async (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;

        let { new_images, ...data } = params.data;

        // Если есть новые изображения — загружаем их на сервер
        if (new_images && Array.isArray(new_images)) {
            const uploadedPaths = [];

            for (const file of new_images) {
                if (file.rawFile instanceof File) {
                    const formData = new FormData();
                    formData.append("image", file.rawFile);

                    try {
                        const response = await fetch(
                            `${apiUrl}/certificates/upload-image`,
                            {
                                method: "POST",
                                body: formData,
                            }
                        );

                        const result = await response.json();
                        uploadedPaths.push(result.path); // Например: /img/cert/...
                    } catch (err) {
                        console.error("Ошибка загрузки файла:", err);
                    }
                }
            }

            // Добавляем загруженные пути к существующим
            data.image_paths = [...(data.image_paths || []), ...uploadedPaths];
        }

        // Отправляем данные на сервер
        await fetchUtils.fetchJson(url, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: new Headers({ "Content-Type": "application/json" }),
        });

        return { data: { id: params.id, ...data } };
    },

    // Удалить одну запись
    delete: async (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        await fetchUtils.fetchJson(url, {
            method: "DELETE",
        });

        return { data: {} };
    },

    // ✅ Новый метод: удалить несколько записей
    deleteMany: async (resource, params) => {
        const url = `${apiUrl}/${resource}/delete-many`;

        // Если ты хочешь отправить DELETE-запрос на каждый id отдельно:
        const promises = params.ids.map((id) =>
            fetchUtils.fetchJson(`${apiUrl}/${resource}/${id}`, {
                method: "DELETE",
            })
        );

        await Promise.all(promises);

        return { data: params.ids }; // react-admin ожидает этот формат
    },

    // Не обязательные, но нужные для совместимости
    getMany: async () => ({ data: [] }),
    getManyReference: async () => ({ data: [], total: 0 }),
    updateMany: async () => ({ data: [] }),
};
