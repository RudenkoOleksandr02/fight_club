import {instance, CatalogUrls, NavigationUrls} from "./urls/apiUrls";

const CatalogApi = {
    getFilterPanelById(categoryId) {
        return instance.get(CatalogUrls.GetFilterPanelById(categoryId))
            .then(response => {
                return response.data
            })
    },
    getProductsByFilter(params) {
        return instance.post(CatalogUrls.GetProductsByFilter, params)
            .then(response => {
                return response.data
            })
    },
    getCategoryById(categoryId) {
        return instance.get(CatalogUrls.GetCategoryById(categoryId))
            .then(response => response.data)
    }
}

export default CatalogApi;