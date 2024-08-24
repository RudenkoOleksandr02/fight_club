import {instance, SearchUrls} from './urls/apiUrls'

const searchApi = {
    getSearchByQuery(query) {
        return instance.get(SearchUrls.GetSearchByQuery(query))
            .then(response => response.data)
    }
}

export default searchApi;