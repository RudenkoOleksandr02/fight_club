import {instance, PromocodesUrls} from './urls/apiUrls'

const promocodesApi = {
    getPromocodesCheck(code) {
        return instance.get(PromocodesUrls.GetPromocodesCheck(code))
            .then(response => {
                    return response.data
                }
            )
    }
}

export default promocodesApi;