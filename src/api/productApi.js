import {instance, ProductsUrls} from '../common/constants/apiUrls'

const productApi = {
    getProductsByFilter(params) {
        return instance.post(ProductsUrls.GetProductsByFilter, params)
            .then(response => {
                    return response.data
                }
            )
    },
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