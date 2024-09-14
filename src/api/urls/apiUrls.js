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
    // PRODUCTS
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
    ImportFromExcel: 'Product/ImportFromExcel',
    GetProductById(productId) {
        return `Product/${productId}`
    },
    PutProductById(productId) {
        console.log(productId)
        return `Product/${productId}`
    },
    AddProduct: 'Product',
    PostImagesByProductId(productId) {
        return `Product/${productId}/images`
    },
    RemoveImagesByProductId(productId) {
        return `Product/RemoveImage/${productId}`
    },
    GetCategory: 'Category',
    SearchCategories(searchTerm) {
        return `Category/Search?searchTerm=${searchTerm}`
    },
    GetAdminFilterPanel: 'AdminFilterPanel',

    // PROMOCODE
    GetPromocodesById(promoId) {
        return `Promocodes/${promoId}`
    },

    // ORDERS
    GetOrders: 'Orders',
    GetOrderById(orderId) {
        return `Orders/${orderId}`
    },
    UpdateStatusOrderById(orderId) {
        return `Orders/${orderId}/status`
    },
    GetAdminOrderFilterPanel: 'AdminOrderFilter/GetAdminOrderFilterPanel',
    GetOrdersByAdminFilter: 'AdminOrderFilter/GetOrdersByAdminFilter',

    // BLOGS
    GetBlogs: 'Blogs',
    GetBlogById(blogId) {
        return `Blogs/${blogId}`
    },
    UpdateBlogById(blogId) {
        return `Blogs/${blogId}`
    },
    AddBlog: 'Blogs',

    // BANNER
    GetBanners: 'Banners',
    GetBannerById(bannerId) {
        return `Banners/${bannerId}`;
    },
    UpdateBannerById(bannerId) {
        return `Banners/${bannerId}`
    },
    AddBanner: 'Banners',

    // CHARACTERISTICS
    GetCharacteristics: 'Characteristic',
    GetCharacteristicById(characteristicId) {
        return `Characteristic/${characteristicId}`;
    },
    UpdateCharacteristicById(characteristicId) {
        return `Characteristic/${characteristicId}`
    },
    AddCharacteristic: 'Characteristic',
    GetCharacteristicTitlesBySearchTerm(searchTerm) {
        return `Characteristic/search?name=${searchTerm}`
    },
    GetCharacteristicDescsByTitle(characteristicTitle) {
        return `Characteristic/${characteristicTitle}/values`
    },

    // BRANDS
    GetBrands: 'Brands',
    GetBrandById(brandId) {
        return `Brands/${brandId}`
    },
    AddBrand: 'Brands',
    UpdateBrandById(brandId) {
        return `Brands/${brandId}`
    }

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
export const BlogUrls = {
    GetBlogs: 'Blogs',
    GetBlogById(blogId) {
        return `Blogs/${blogId}`
    }
}
export const BannerUrls = {
    GetBanners: 'Banners',
    GetBannerById(bannerId) {
        return `Banners/${bannerId}`
    },
    GetProductsByBannerFilter: 'Banners/GetProductsByBannerFilter',
    GetFilterPanelBannerById(bannerId) {
        return `FilterPanel/Banner/${bannerId}`
    }
}

