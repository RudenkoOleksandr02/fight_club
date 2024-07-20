import {instance, SearchUrls} from '../common/constants/apiUrls'

const searchApi = {
    getSearchByQuery(query) {
        return instance.get(SearchUrls.GetSearchByQuery(query))
            .then(response => response.data)
    }
}

export default searchApi;