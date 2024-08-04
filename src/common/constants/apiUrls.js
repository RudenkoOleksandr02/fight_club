import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://blossomapi-production.up.railway.app/api/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});
export const HomePageUrls = {
    GetNewProducts: 'HomePage/New',
    GetDiscountsProducts: 'HomePage/Discounts',
    GetPopularProducts: 'HomePage/Popular',
    GetPopularProductsByCategory(categoryId) {
        return `HomePage/PopularByCategory/${categoryId}`
    }
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
export const SearchUrls = {
    GetSearchByQuery(query) {
        return `Search/products?query=${query}`
    }
}
export const AuthorizationUrls = {
    Register: 'Account/Register',
    Login: 'Account/Login',
    Logout: 'Account/Logout',
    GetAuth: 'Account/GetAuth',
}
export const ShoppingCartOrderUrls = {
    CreateOrderForGuest: 'ShoppingCartOrder/CreateOrderForGuest',
    CreateOrderForUser: 'ShoppingCartOrder/CreateOrderForUser'
}
export const ShoppingCartUrls = {
    GetUserShoppingCart: 'ShoppingCart/GetUserShoppingCart',
    AddProduct: 'ShoppingCart/AddProduct',
    ChangeProductAmount: 'ShoppingCart/ChangeProductAmount',
    RemoveProduct: 'ShoppingCart/RemoveProduct'
}
export const PromocodesUrls = {
    GetPromocodesCheck(code) {
        return `Promocodes/check/${code}`
    }
}
export const bannerApi = {
    getBannerData(data) {

    }
}
