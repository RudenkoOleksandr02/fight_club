import {ShoppingCartOrderUrls, instance} from "../common/constants/apiUrls";

export const shoppingCartOrderApi = {
    createOrderForGuest(params) {
        return instance.post(ShoppingCartOrderUrls.CreateOrderForGuest, params)
            .then(response => response.data)
    },
    createOrderForUser(params) {
        return instance.post(ShoppingCartOrderUrls.CreateOrderForUser, params)
            .then(response => response.data)
    }
}