import {AdminUrls, instance} from "./urls/apiUrls";

export const adminApi = {
    getAdminAuth() {
        return instance.get(AdminUrls.GetAdminAuth)
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
    removeImagesByProductId(productId, url) {
        return instance.post(AdminUrls.RemoveImagesByProductId(productId), url)
            .then(response => response.data)
    },
    getCharacteristicSearch(searchTerm) {
        return instance.get(AdminUrls.GetCharacteristicSearch(searchTerm))
            .then(response => response.data)
    },
    getCharacteristicValues(characteristicTitle) {
        return instance.get(AdminUrls.GetCharacteristicValues(characteristicTitle))
            .then(response => response.data)
    },
    getCharacteristicById(characteristicId) {
        return instance.get(AdminUrls.GetCharacteristicById(characteristicId))
            .then(response => response.data)
    },
    searchCategories(searchTerm) {
        return instance.get(AdminUrls.SearchCategories(searchTerm))
            .then(response => response.data)
    },
    getAdminFilterPanel() {
        return instance.get(AdminUrls.GetAdminFilterPanel)
            .then(response => response.data)
    },

    // PROMOCODE
    getPromocodesById(promoId) {
        return instance.get(AdminUrls.GetPromocodesById(promoId))
            .then(response => {
                return response.data
            })
    },

    // ORDERS
    getOrders() {
        return instance.get(AdminUrls.GetOrders)
            .then(response => response.data)
    },
    getOrderById(orderId) {
        return instance.get(AdminUrls.GetOrderById(orderId))
            .then(response => response.data)
    },
    updateOrderById(orderId, params) {
        return instance.put(AdminUrls.UpdateStatusOrderById(orderId), params)
            .then(response => response.data)
    },
    getAdminOrderFilterPanel() {
        return instance.get(AdminUrls.GetAdminOrderFilterPanel)
            .then(response => response.data)
    },
    getOrdersByAdminFilterPanel(params) {
        return instance.post(AdminUrls.GetOrdersByAdminFilter, params)
            .then(response => response.data)
    },

    // SEARCH PRODUCTS
    getProductsBySearch(searchTerm) {
        return instance.post(AdminUrls.GetProductsByAdminFilter, {start: 0, amount: 40, searchTerm: searchTerm})
            .then(response => response.data)
    },

    // BLOGS
    getBlogs() {
        return instance.get(AdminUrls.GetBlogs)
            .then(response => response.data)
    },
    getBlogById(blogId) {
        return instance.get(AdminUrls.GetBlogById(blogId))
            .then(response => response.data)
    },
    updateBlogById(blogId, params) {
        const formData = new FormData();

        if (params.title) formData.append('Title', params.title);
        if (params.description) formData.append('Description', params.description);
        if (params.metaKeywords) formData.append('MetaKeywords', params.metaKeywords);
        if (params.metaDescription) formData.append('MetaDescription', params.metaDescription);
        if (params.desktopImage) formData.append('DesktopImage', params.desktopImage);
        if (params.laptopImage) formData.append('LaptopImage', params.laptopImage);
        if (params.tabletImage) formData.append('TabletImage', params.tabletImage);
        if (params.phoneImage) formData.append('PhoneImage', params.phoneImage);
        if (params.desktopAltText) formData.append('DesktopAltText', params.desktopAltText);
        if (params.laptopAltText) formData.append('LaptopAltText', params.laptopAltText);
        if (params.tabletAltText) formData.append('TabletAltText', params.tabletAltText);
        if (params.phoneAltText) formData.append('PhoneAltText', params.phoneAltText);
        if (params.productIds && params.productIds.length > 0) {
            params.productIds.forEach(id => formData.append('ProductIds', id));
        }

        return instance.put(AdminUrls.UpdateBlogById(blogId), formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => response.data)
    },
    addBlog(params) {
        const formData = new FormData();

        if (params.title) formData.append('Title', params.title);
        if (params.description) formData.append('Description', params.description);
        if (params.metaKeywords) formData.append('MetaKeywords', params.metaKeywords);
        if (params.metaDescription) formData.append('MetaDescription', params.metaDescription);
        if (params.desktopImageUrl) formData.append('DesktopImage', params.desktopImageUrl);
        if (params.laptopImageUrl) formData.append('LaptopImage', params.laptopImageUrl);
        if (params.tabletImageUrl) formData.append('TabletImage', params.tabletImageUrl);
        if (params.phoneImageUrl) formData.append('PhoneImage', params.phoneImageUrl);
        formData.append('DesktopAltText', "test");
        formData.append('LaptopAltText', "test");
        formData.append('TabletAltText', "test");
        formData.append('PhoneAltText', "test");
        if (params.productIds && params.productIds.length > 0) {
            params.productIds.forEach(id => formData.append('ProductIds', id));
        }
        console.log(params)

        return instance.post(AdminUrls.AddBlog, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => response.data)
    },

    // BANNER
    getBanners() {
        return instance.get(AdminUrls.GetBanners)
            .then(response => response.data)
    },
    getBannerById(bannerId) {
        return instance.get(AdminUrls.GetBannerById(bannerId))
            .then(response => response.data)
    },
    updateBannerById(bannerId, params) {
        const formData = new FormData();

        if (params.title) formData.append('Title', params.title);
        if (params.description) formData.append('Description', params.description);
        if (params.metaKeywords) formData.append('MetaKeywords', params.metaKeywords);
        if (params.metaDescription) formData.append('MetaDescription', params.metaDescription);
        if (params.desktopImage) formData.append('DesktopImage', params.desktopImage);
        if (params.laptopImage) formData.append('LaptopImage', params.laptopImage);
        if (params.tabletImage) formData.append('TabletImage', params.tabletImage);
        if (params.phoneImage) formData.append('PhoneImage', params.phoneImage);
        if (params.desktopAltText) formData.append('DesktopAltText', params.desktopAltText);
        if (params.laptopAltText) formData.append('LaptopAltText', params.laptopAltText);
        if (params.tabletAltText) formData.append('TabletAltText', params.tabletAltText);
        if (params.phoneAltText) formData.append('PhoneAltText', params.phoneAltText);
        if (params.productIds && params.productIds.length > 0) {
            params.productIds.forEach(id => formData.append('ProductIds', id));
        }

        return instance.put(AdminUrls.UpdateBannerById(bannerId), formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => response.data)
    },
    addBanner(params) {
        const formData = new FormData();

        if (params.title) formData.append('Title', params.title);
        if (params.description) formData.append('Description', params.description);
        if (params.metaKeywords) formData.append('MetaKeywords', params.metaKeywords);
        if (params.metaDescription) formData.append('MetaDescription', params.metaDescription);
        if (params.desktopImageUrl) formData.append('DesktopImage', params.desktopImageUrl);
        if (params.laptopImageUrl) formData.append('LaptopImage', params.laptopImageUrl);
        if (params.tabletImageUrl) formData.append('TabletImage', params.tabletImageUrl);
        if (params.phoneImageUrl) formData.append('PhoneImage', params.phoneImageUrl);
        formData.append('DesktopAltText', "test");
        formData.append('LaptopAltText', "test");
        formData.append('TabletAltText', "test");
        formData.append('PhoneAltText', "test");
        if (params.productIds && params.productIds.length > 0) {
            params.productIds.forEach(id => formData.append('ProductIds', id));
        }

        return instance.post(AdminUrls.AddBanner, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => response.data)
    }
}