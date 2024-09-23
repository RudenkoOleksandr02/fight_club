import {instance, ReviewsUrls} from "./urls/apiUrls";

const reviewsApi = {
    getReviewsInProduct(productId, page, pageSize) {
        return instance.get(ReviewsUrls.GetReviewsInProduct(productId, page, pageSize))
            .then(response => {
                return response.data
            })
    },
    postReviews(params) {
        return instance.post(ReviewsUrls.PostReviews, params)
            .then(response => {
                return response.data
            })
    }
}

export default reviewsApi;