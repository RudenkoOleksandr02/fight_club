import {instance, ProductsUrls} from './urls/apiUrls'

const productApi = {
    getProductById(productId) {
        return instance.get(ProductsUrls.GetProductById(productId))
            .then(response => {
                return response.data
            })
    },
    getAlsoBought(productId) {
        return instance.get(ProductsUrls.GetAlsoBought(productId))
            .then(response => {
                return response.data
            })
    }
}

export default productApi;