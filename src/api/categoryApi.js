import {instance, CategoryUrls} from '../common/constants/apiUrls'

const categoryApi = {
    getCategoryTree(categoryId) {
        return instance.get(CategoryUrls.GetCategoryTree(categoryId))
            .then(response => response.data)
    },
    getCategoryById(categoryId) {
        return instance.get(CategoryUrls.GetCategoryById(categoryId))
            .then(response => response.data)
    }
}

export default categoryApi;