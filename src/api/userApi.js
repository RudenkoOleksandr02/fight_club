import {instance, UserUrls} from "./urls/apiUrls";

const userApi = {
    getFavorite() {
        return instance.get(UserUrls.GetFavorite)
            .then(response => {
                return response.data
            })
    },
    addFavorite(productId) {
        return instance.post(UserUrls.AddFavorite(productId))
            .then(response => {
                return response.data
            })
    },
    deleteFavorite(productId) {
        return instance.delete(UserUrls.DeleteFavorite(productId))
            .then(response => {
                return response.data
            })
    },
    getUser() {
        return instance.get(UserUrls.GetUser)
            .then(response => {
                return response.data
            })
    },
    updateUser(params) {
        return instance.put(UserUrls.UpdateUser, params)
            .then(response => {
                return response.data
            })
    }
}

export default userApi;