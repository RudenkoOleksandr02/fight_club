import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:8001/api/',
    headers: {
        'Content-Type': 'application/json'
    }
});
export const CategoryUrls = {
    GetCategoryTree: 'Category/GetCategoryTree',
    GetCategoryById(categoryId) {
        return `Category/${categoryId}`
    }
}
export const ProductsUrls = {
    GetProductsByFilter: 'Product/GetProductsByFilter',
    GetProductById(productId) {
        return `Product/${productId}`
    }
}
export const FilterPanelUrls = {
    GetFilterPanelByCategoryName(categoryName) {
        return `FilterPanel/${categoryName}`
    }
}
export const bannerApi = {
    getBannerData(data) {
    }

    }