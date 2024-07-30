import {instance, PromocodesUrls} from '../common/constants/apiUrls'

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