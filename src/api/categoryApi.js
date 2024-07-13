import {instance, CategoryUrls} from '../common/constants/apiUrls'

const categoryApi = {
    getCategoryTree(categoryName) {
        return instance.get(CategoryUrls.GetCategoryTree + '?categoryName=' + categoryName)
            .then(response => response.data)
    },
    getCategoryById(categoryId) {
        return instance.get(CategoryUrls.GetCategoryById(categoryId))
            .then(response => response.data)
    }
}

export default categoryApi;