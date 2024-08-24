import {instance, HomePageUrls} from './urls/apiUrls'

const homePageApi = {
    getNewProducts() {
        return instance.get(HomePageUrls.GetNewProducts)
            .then(response => response.data)
            .catch(error => {
                throw error;
            });
    },
    getDiscountsProducts() {
        return instance.get(HomePageUrls.GetDiscountsProducts)
            .then(response => response.data)
            .catch(error => {
                throw error;
            });
    },
    getPopularProducts() {
        return instance.get(HomePageUrls.GetPopularProducts)
            .then(response => response.data)
            .catch(error => {
                throw error;
            });
    }
}

export default homePageApi;