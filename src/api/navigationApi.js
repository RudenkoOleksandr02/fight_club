import {instance, NavigationUrls} from './urls/apiUrls'

const navigationApi = {
    getCategoryTree(categoryId) {
        return instance.get(NavigationUrls.GetCategoryTree(categoryId))
            .then(response => response.data)
    },
    getPopularProductsByCategory(categoryId) {
        return instance.get(NavigationUrls.GetPopularProductsByCategory(categoryId))
            .then(response => response.data)
    },
    getCategory() {
        return instance.get(NavigationUrls.GetCategory)
            .then(response => response.data)
    }
}

export default navigationApi;