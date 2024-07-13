import {instance, HomePageUrls} from '../common/constants/apiUrls'

const homePageApi = {
    getNewProducts() {
        return instance.get(HomePageUrls.GetNewProducts)
            .then(response => response.data)
    },
    getDiscountsProducts() {
        return instance.get(HomePageUrls.GetDiscountsProducts)
            .then(response => response.data)
    },
    getPopularProducts() {
        return instance.get(HomePageUrls.GetPopularProducts)
            .then(response => response.data)
    },
}

export default homePageApi;