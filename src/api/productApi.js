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
        return instance.get(`Product/${productId}`)
            .then(response => {
                return response.data
            })
    }
}

export default productApi;