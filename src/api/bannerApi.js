import {instance, BannerUrls} from './urls/apiUrls'

const bannerApi = {
    getBanners() {
        return instance.get(BannerUrls.GetBanners)
            .then(response => response.data)
    },
    getBannerById(bannerId) {
        return instance.get(BannerUrls.GetBannerById(bannerId))
            .then(response => response.data)
    },
    getProductsByBannerFilter(params) {
        return instance.post(BannerUrls.GetProductsByBannerFilter, params)
            .then(response => response.data)
    },
    getFilterPanelBannerById(bannerId) {
        return instance.get(BannerUrls.GetFilterPanelBannerById(bannerId))
            .then(response => response.data)
    }
}

export default bannerApi;