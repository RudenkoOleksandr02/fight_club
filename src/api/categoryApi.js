import {instance, CatalogUrls} from '../common/constants/apiUrls'

const categoryApi = {
    getCategoryTree(categoryName) {
        return instance.get(CatalogUrls.GetCategoryTree + '?categoryName=' + categoryName)
            .then(response => response.data)
    }
}

export default categoryApi;