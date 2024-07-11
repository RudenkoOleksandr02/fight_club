import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8001/api/',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const bannerAPI = {
    getBannerData(data) {
        return instance.post(data)
            .then(response => response.data)
    }
};
export const productsAPI = {
    getProductsData(filter) {
        return instance.post('Product/GetProductsByFilter', JSON.stringify(filter))
            .then(response => response.data)
    },
    getProductById(productId) {
        return instance.get(`Product/${productId}`)
            .then(response => {
                return response.data
            })
    }
};
