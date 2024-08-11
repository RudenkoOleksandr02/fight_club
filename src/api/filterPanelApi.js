import {instance, FilterPanelUrls} from "../common/constants/apiUrls";

const FilterPanelApi = {
    getFilterPanelById(categoryId) {
        return instance.get(FilterPanelUrls.GetFilterPanelById(categoryId))
            .then(response => {
                console.log(response)
                return response.data
            })
    }
}

export default FilterPanelApi;