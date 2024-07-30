import {ShoppingCartUrls, instance} from "../common/constants/apiUrls";

export const shoppingCartApi = {
    addProduct(productId) {
        return instance.post(ShoppingCartUrls.AddProduct, {"productId" : 4})
            .then(response => response.data)
    },
    changeProductAmount(params) {
        return instance.post(ShoppingCartUrls.ChangeProductAmount, params)
            .then(response => response.data)
    },
    removeProduct(productId) {
        return instance.post(ShoppingCartUrls.RemoveProduct, productId)
            .then(response => response.data)
    },
    getUserShoppingCart() {
        return instance.get(ShoppingCartUrls.GetUserShoppingCart)
            .then(response => response.data)
    }
}