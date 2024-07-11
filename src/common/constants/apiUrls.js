import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:8001/api/',
    headers: {
        'Content-Type': 'application/json'
    }
});
export const CatalogUrls = {
    GetCategoryTree: 'Category/GetCategoryTree'
}
