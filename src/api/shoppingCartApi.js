import {ShoppingCartUrls, instance} from "./urls/apiUrls";

export const shoppingCartApi = {
    addProduct(productId) {
        return instance.post(ShoppingCartUrls.AddProduct, {"productId" : productId})
            .then(response => {
                return response.data
            })
    },
    changeProductAmount(params) {
        return instance.post(ShoppingCartUrls.ChangeProductAmount, params)
            .then(response => response.data)
    },
    removeProduct(productId) {
        return instance.post(ShoppingCartUrls.RemoveProduct, {"productId" : productId})
            .then(response => {
                return response.data
            })
    },
    getUserShoppingCart() {
        return instance.get(ShoppingCartUrls.GetUserShoppingCart)
            .then(response => response.data)
    }
}