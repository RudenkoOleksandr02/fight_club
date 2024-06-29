import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://...',
    headers: {
        'API-KEY': 'd1d08d2b-19c6-436a-abe9-59b5357407f1'
    }
});

export const bannerAPI = {
    getBannerData(data) {
        return instance.post(data)
            .then(response => response.data)
    }
};

export const productsAPI = {
    getProductsData(data) {
        return instance.post(data)
            .then(response => response.data)
    }
};