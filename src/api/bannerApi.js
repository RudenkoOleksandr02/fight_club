import {instance, CatalogUrls} from './urls/apiUrls'

const categoryApi = {
    getCategoryTree(categoryName) {
        return instance.get(CatalogUrls.GetCategoryTree + '?categoryName=' + categoryName)
            .then(response => response.data)
    }
}

export default categoryApi;