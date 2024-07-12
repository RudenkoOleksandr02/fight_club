import {instance, FilterPanelUrls} from "../common/constants/apiUrls";

const FilterPanelApi = {
    getFilterPanelByCategoryName(categoryName) {
        return instance.get(FilterPanelUrls.GetFilterPanelByCategoryName(categoryName))
            .then(response => response.data)
    }
}

export default FilterPanelApi;