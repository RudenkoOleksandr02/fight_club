import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:8001/api/',
    headers: {
        'Content-Type': 'application/json'
    }
});
export const HomePageUrls = {
    GetNewProducts: 'HomePage/New',
    GetDiscountsProducts: 'HomePage/Discounts',
    GetPopularProducts: 'HomePage/Popular'
}
export const CategoryUrls = {
    GetCategoryTree(categoryId) {
        return `Category/GetCategoryTree?categoryId=${categoryId}`
    },
    GetCategoryById(categoryId) {
        return `Category/${categoryId}`
    }
}
export const ProductsUrls = {
    GetProductsByFilter: 'Product/GetProductsByFilter',
    GetAlsoBought(productId) {
        return `Product/AlsoBought/${productId}`
    },
    GetProductById(productId) {
        return `Product/${productId}`
    }
}
export const FilterPanelUrls = {
    GetFilterPanelById(categoryId) {
        return `FilterPanel/${categoryId}`
    }
}
export const bannerApi = {
    getBannerData(data) {

    }
}