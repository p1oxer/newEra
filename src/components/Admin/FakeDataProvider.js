// src/fakeDataProvider.js
import { faker } from "@faker-js/faker";

// Функция для генерации списка элементов
const generateData = (resource, count) => {
    return Array.from({ length: count }, (_, id) => ({
        id: id + 1,
        ...(resource === "posts" && {
            title: faker.lorem.sentence(),
            body: faker.lorem.paragraph(),
        }),
        ...(resource === "users" && {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            phone: faker.phone.number(),
        }),
    }));
};

// База данных с заглушками
const fakeDB = {
    posts: generateData("posts", 20),
    users: generateData("users", 10),
};

const fakeDataProvider = {
    getList: (resource, params) => {
        return Promise.resolve({
            data: fakeDB[resource],
            total: fakeDB[resource].length,
        });
    },
    getOne: (resource, params) => {
        const record = fakeDB[resource].find((item) => item.id === params.id);
        return Promise.resolve({ data: record });
    },
    create: (resource, params) => {
        const newRecord = { id: fakeDB[resource].length + 1, ...params.data };
        fakeDB[resource].push(newRecord);
        return Promise.resolve({ data: newRecord });
    },
    update: (resource, params) => {
        const index = fakeDB[resource].findIndex((item) => item.id === params.id);
        if (index !== -1) {
            fakeDB[resource][index] = { ...params.data, id: params.id };
        }
        return Promise.resolve({ data: fakeDB[resource][index] });
    },
    delete: (resource, params) => {
        fakeDB[resource] = fakeDB[resource].filter((item) => item.id !== params.id);
        return Promise.resolve({ data: params.previousData });
    },
};

export default fakeDataProvider;
