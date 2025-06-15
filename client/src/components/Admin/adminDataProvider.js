import dataProvider from "./dataProvider";

const adminDataProvider = {
    ...dataProvider,

    getList: (resource, params) => dataProvider.getList(`admin/${resource}`, params),

    getOne: (resource, params) => dataProvider.getOne(`admin/${resource}`, params),

    create: (resource, params) => dataProvider.create(`admin/${resource}`, params),

    update: (resource, params) => dataProvider.update(`admin/${resource}`, params),

    delete: (resource, params) => dataProvider.delete(`admin/${resource}`, params),
};

export default adminDataProvider;
