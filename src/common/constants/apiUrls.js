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