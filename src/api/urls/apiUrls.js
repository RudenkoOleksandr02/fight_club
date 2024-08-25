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
    GetPopularProducts: 'HomePage/Popular'
}
export const NavigationUrls = {
    GetCategoryTree(categoryId) {
        return `Category/GetCategoryTree?categoryId=${categoryId}`
    },
    GetPopularProductsByCategory(categoryId) {
        return `HomePage/PopularByCategory/${categoryId}`
    },
    GetCategory: 'Category'
}
export const ProductsUrls = {
    GetAlsoBought(productId) {
        return `Product/AlsoBought/${productId}`
    },
    GetProductById(productId) {
        return `Product/${productId}`
    }
}
export const CatalogUrls = {
    GetFilterPanelById(categoryId) {
        return `FilterPanel/${categoryId}`
    },
    GetProductsByFilter: 'Product/GetProductsByFilter'
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
export const AdminUrls = {
    GetAdminAuth: 'Account/GetAdminAuth',
    GetProductsByAdminFilter: 'AdminProduct/GetProductsByAdminFilter',
    ToggleIsNew(productId) {
        return `AdminProduct/ToggleIsNew/${productId}`
    },
    ToggleIsHit(productId) {
        return `AdminProduct/ToggleIsHit/${productId}`
    },
    ToggleIsShow(productId) {
      return `AdminProduct/ToggleIsShown/${productId}`
    },
    GetOrders: 'Orders',
    GetOrderById(orderId) {
      return `Orders/${orderId}`
    },
    UpdateStatusOrderById(orderId) {
        return `Orders/${orderId}/status`
    },
    ImportFromExcel: 'Product/ImportFromExcel',
    GetProductById(productId) {
        return `Product/${productId}`
    },
    PutProductById(productId) {
        return `Product/${productId}`
    },
    GetPromocodesById(promoId) {
        return `Promocodes/${promoId}`
    },
    PostImagesByProductId(productId) {
        return `Product/${productId}/images`
    },
    GetCategory: 'Category',
    GetCharacteristicSearch(values) {
        return `Characteristic/search?name=${values}`
    },
    GetCharacteristicValues(values) {
        return `Characteristic/${values}/values`
    },
    GetCharacteristicById(characteristicId) {
        return `Characteristic/${characteristicId}`
    },
    SearchCategories(searchTerm) {
        return `Category/Search?searchTerm=${searchTerm}`
    },
    GetAdminFilterPanel: 'AdminFilterPanel'
}
export const UserUrls = {
    GetFavorite: 'Favorite',
    AddFavorite(productId) {
        return `Favorite/Add/${productId}`
    },
    DeleteFavorite(productId) {
        return `Favorite/Remove/${productId}`
    },
    GetUser: 'User',
    UpdateUser: 'User'
}
export const bannerApi = {
    getBannerData(data) {

    }
}
