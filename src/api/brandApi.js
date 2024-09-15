import {instance, BrandUrls} from "./urls/apiUrls";

const BlogApi = {
    getBrands() {
        return instance.get(BrandUrls.GetBrands)
            .then(response => response.data)
    },
    getBrandById(brandId) {
        return instance.get(BrandUrls.GetBrandById(brandId))
            .then(response => {
                return response.data
            })
    }
}

export default BlogApi;