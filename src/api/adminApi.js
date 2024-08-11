import {AdminUrls, instance} from "../common/constants/apiUrls";

export const adminApi = {
    getAdminAuth() {
        return instance.get(AdminUrls.GetAdminAuth)
            .then(response => response.data)
    },
    getOrders() {
        return instance.get(AdminUrls.GetOrders)
            .then(response => response.data)
    },
    getProductsByFilter(params) {
        return instance.post(AdminUrls.GetProductsByFilter, params)
            .then(response => {
                    return response.data
                }
            )
    },
    importFromExcel(file) {
        if (!file) {
            console.error('No file provided.');
            return;
        }

        console.log('File:', file);

        const formData = new FormData();
        formData.append('excelFile', file);

        return instance.post(AdminUrls.ImportFromExcel, formData)
            .then(response => {
                return response.data
            })
            .catch(error => {
                console.error('There was an error uploading the file!', error);
                throw error; // Re-throw the error if needed for further handling
            });
    }
}