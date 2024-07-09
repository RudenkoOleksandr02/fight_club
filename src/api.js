import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8001/api/'
});

export const bannerAPI = {
    getBannerData(data) {
        return instance.post(data)
            .then(response => response.data)
    }
};
export const catalogApi = {
    getCatalogData() {
        return instance.get('Category')
            .then(response => response.data)
    }
}
export const productsAPI = {
    getProductsData(data) {
        return instance.post(data)
            .then(response => response.data)
    }
};