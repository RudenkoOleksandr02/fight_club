import {AdminUrls, instance} from "./urls/apiUrls";

export const adminApi = {
    getAdminAuth() {
        return instance.get(AdminUrls.GetAdminAuth)
            .then(response => response.data)
    },
    getOrders() {
        return instance.get(AdminUrls.GetOrders)
            .then(response => response.data)
    },
    getProductsByAdminFilter(params) {
        return instance.post(AdminUrls.GetProductsByAdminFilter, params)
            .then(response => response.data)
    },
    toggleIsNew(productId, boolean) {
        return instance.post(AdminUrls.ToggleIsNew(productId), boolean)
            .then(response => response.data)
    },
    toggleIsHit(productId, boolean) {
        return instance.post(AdminUrls.ToggleIsHit(productId), boolean)
            .then(response => response.data)
    },
    toggleIsShow(productId, boolean) {
        return instance.post(AdminUrls.ToggleIsShow(productId), boolean)
            .then(response => response.data)
    },
    importFromExcel(file) {
        const formData = new FormData();
        formData.append('excelFile', file);

        return instance.post(AdminUrls.ImportFromExcel, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                return response.data
            })
            .catch(error => {
                console.error('There was an error uploading the file!', error);
                throw error;
            });
    },
    getProductById(productId) {
        return instance.get(AdminUrls.GetProductById(productId))
            .then(response => response.data)
    },
    putProductById(productId, params) {
        return instance.put(AdminUrls.PutProductById(productId), params)
            .then(response => response.data)
    },
    getPromocodesById(promoId) {
        return instance.get(AdminUrls.GetPromocodesById(promoId))
            .then(response => response.data)
    },
    postImagesByProductId(productId, files) {
        const formData = new FormData();

        files.forEach((file, index) => {
            formData.append('imageFiles', file);
        });

        return instance.post(AdminUrls.PostImagesByProductId(productId), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error('There was an error uploading the file!', error);
                throw error;
            });
    },
    getCategory() {
        return instance.get(AdminUrls.GetCategory)
            .then(response => response.data)
    }
}