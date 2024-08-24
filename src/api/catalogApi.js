import {instance, CatalogUrls} from "./urls/apiUrls";

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
    }
}

export default CatalogApi;