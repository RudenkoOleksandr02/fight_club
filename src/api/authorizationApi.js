import {AuthorizationUrls, instance} from "../common/constants/apiUrls";

export const authorizationApi = {
    register(params) {
        return instance.post(AuthorizationUrls.Register, params)
            .then(response => response.data)
    },
    login(params) {
        return instance.post(AuthorizationUrls.Login, params)
            .then(response => response.data)
    },
    logout() {
        return instance.post(AuthorizationUrls.Logout, null)
            .then(response => {
                return response.data
            })
    }
}