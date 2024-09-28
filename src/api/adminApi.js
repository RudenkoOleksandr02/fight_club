import {AdminUrls, instance, ProductsUrls} from "./urls/apiUrls";

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
        const formData = new FormData();

        if (params.name) formData.append('Name', params.name);
        if (params.nameEng) formData.append('NameEng', params.nameEng);
        if (params.mainCategoryId) formData.append('MainCategoryId', params.mainCategoryId);
        if (params.brandId) formData.append('BrandId', params.brandId);
        if (params.article) formData.append('Article', params.article);
        if (params.price) formData.append('Price', Number(params.price));
        if (params.discount) formData.append('Discount', Number(params.discount));
        if (params.amount) formData.append('AvailableAmount', Number(params.amount));
        if (params.description) formData.append('Description', params.description);
        if (params.ingridients) formData.append('Ingridients', params.ingridients);
        if (params.characteristicIds && params.characteristicIds.length > 0) {
            params.characteristicIds.forEach(id => formData.append('CharacteristicIds', id));
        }
        if (params.additionalCategoryIds && params.additionalCategoryIds.length > 0) {
            params.additionalCategoryIds.forEach(id => formData.append('AdditionalCategoryIds', id));
        }
        if (params.imagesToDelete && params.imagesToDelete.length > 0) {
            params.imagesToDelete.forEach(link => formData.append('ImagesToDelete', link));
        }
        if (params.imagesToAdd && params.imagesToAdd.length > 0) {
            params.imagesToAdd.forEach(file => formData.append('ImagesToAdd', file));
        }
        if (params.metaKeys) formData.append('MetaKeys', params.metaKeys);
        if (params.metaDescription) formData.append('MetaDescription', params.metaDescription);

        return instance.put(AdminUrls.PutProductById(productId), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => response.data)
    },
    addProduct(params) {
        const formData = new FormData();

        if (params.name) formData.append('Name', params.name);
        if (params.nameEng) formData.append('NameEng', params.nameEng);
        if (params.mainCategoryId) formData.append('MainCategoryId', params.mainCategoryId);
        if (params.brandId) formData.append('BrandId', params.brandId);
        if (params.article) formData.append('Article', params.article);
        if (params.price) formData.append('Price', Number(params.price));
        if (params.discount) formData.append('Discount', Number(params.discount));
        if (params.amount) formData.append('AvailableAmount', Number(params.amount));
        if (params.description) formData.append('Description', params.description);
        if (params.ingridients) formData.append('Ingridients', params.ingridients);
        if (params.characteristicIds && params.characteristicIds.length > 0) {
            params.characteristicIds.forEach(id => formData.append('CharacteristicIds', id));
        }
        if (params.additionalCategoryIds && params.additionalCategoryIds.length > 0) {
            params.additionalCategoryIds.forEach(id => formData.append('AdditionalCategoryIds', id));
        }
        if (params.images.files && params.images.files.length > 0) {
            params.images.files.forEach(file => formData.append('Images', file));
        }
        if (params.metaKeys) formData.append('MetaKeys', params.metaKeys);
        if (params.metaDescription) formData.append('MetaDescription', params.metaDescription);

        return instance.post(AdminUrls.AddProduct, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => response.data)
    },
    deleteProductById(productId) {
        return instance.delete(AdminUrls.DeleteProductById(productId))
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
        return instance.put(AdminUrls.UpdateBlogById(blogId), getFormDataForBannerAndBlog(params), {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => response.data)
    },
    addBlog(params) {
        return instance.post(AdminUrls.AddBlog, getFormDataForBannerAndBlog(params), {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => response.data)
    },
    deleteBlogById(blogId) {
        return instance.delete(AdminUrls.DeleteBlogById(blogId)).then(response => response.data)
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
        return instance.put(AdminUrls.UpdateBannerById(bannerId), getFormDataForBannerAndBlog(params), {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => response.data)
    },
    addBanner(params) {
        return instance.post(AdminUrls.AddBanner, getFormDataForBannerAndBlog(params), {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => response.data)
    },
    deleteBannerById(bannerId) {
      return instance.delete(AdminUrls.DeleteBannerById(bannerId)).then(response => response.data)
    },

    // CHARACTERISTICS
    getCharacteristics() {
        return instance.get(AdminUrls.GetCharacteristics)
            .then(response => response.data)
    },
    getCharacteristicById(characteristicId) {
        return instance.get(AdminUrls.GetCharacteristicById(characteristicId))
            .then(response => response.data)
    },
    updateCharacteristicById(characteristicId, params) {
        return instance.put(AdminUrls.UpdateCharacteristicById(characteristicId), params)
            .then(response => response.data)
    },
    addCharacteristic(params) {
        return instance.post(AdminUrls.AddCharacteristic, params)
            .then(response => response.data)
    },
    getCharacteristicTitlesBySearchTerm(searchTerm) {
        return instance.get(AdminUrls.GetCharacteristicTitlesBySearchTerm(searchTerm))
            .then(response => response.data)
    },
    getCharacteristicDescsByTitle(characteristicTitle) {
        return instance.get(AdminUrls.GetCharacteristicDescsByTitle(characteristicTitle))
            .then(response => response.data)
    },
    deleteCharacteristicById(characteristicId) {
        return instance.delete(AdminUrls.DeleteCharacteristicById(characteristicId))
            .then(response => response.data)
    },

    // BRANDS
    getBrands() {
        return instance.get(AdminUrls.GetBrands)
            .then(response => response.data)
    },
    getBrandById(brandId) {
        return instance.get(AdminUrls.GetBrandById(brandId))
            .then(response => response.data)
    },
    updateBrandById(brandId, params) {
        const formData = new FormData();

        if (params.title) formData.append('Title', params.title);
        if (params.description) formData.append('Description', params.description);
        if (params.metaKeywords) formData.append('MetaKeywords', params.metaKeywords);
        if (params.metaDescription) formData.append('MetaDescription', params.metaDescription);
        if (params.imageUrl) formData.append('Image', params.imageUrl);
        if (params.logoImageUrl) formData.append('LogoImage', params.logoImageUrl);

        return instance.put(AdminUrls.UpdateBrandById(brandId), formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => response.data)
    },
    addBrand(params) {
        const formData = new FormData();

        if (params.title) formData.append('Title', params.title);
        if (params.description) formData.append('Description', params.description);
        if (params.metaKeywords) formData.append('MetaKeywords', params.metaKeywords);
        if (params.metaDescription) formData.append('MetaDescription', params.metaDescription);
        if (params.imageUrl) formData.append('Image', params.imageUrl);
        if (params.logoImageUrl) formData.append('LogoImage', params.logoImageUrl);

        return instance.post(AdminUrls.AddBrand, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => response.data)
    },
    getBrandsBySearch(searchTerm) {
        return instance.get(AdminUrls.GetBrandsBySearch(searchTerm))
            .then(response => response.data)
    },
    deleteBrandById(brandId) {
        return instance.delete(AdminUrls.DeleteBrandById(brandId))
    },

    // PROMOCODE
    getPromocodes() {
        return instance.get(AdminUrls.GetPromocodes)
            .then(response => response.data)
    },
    getPromocodeById(promoId) {
        return instance.get(AdminUrls.GetPromocodeById(promoId))
            .then(response => response.data)
    },
    updatePromocodeById(promoId, params) {
        return instance.put(AdminUrls.UpdatePromocodeById(promoId), params)
            .then(response => response.data)
    },
    addPromocode(params) {
        return instance.post(AdminUrls.AddPromocode, params)
            .then(response => response.data)
    },
    deletePromocodeById(promoId) {
      return instance.delete(AdminUrls.DeletePromocodeById(promoId))
          .then(response => response.data)
    },

    // REVIEWS
    searchReviews(params) {
        return instance.post(AdminUrls.SearchReviews, params)
            .then(response => response.data)
    },
    deleteReviewById(reviewId) {
        return instance.delete(AdminUrls.DeleteReviewById(reviewId))
            .then(response => response.data)
    },
    deleteAllReviewsByUserId(userId) {
        return instance.delete(AdminUrls.DeleteUserById(userId))
            .then(response => response.data)
    },

    // OFFLINE ORDERS
    createOfflineOrder(params) {
        return instance.post(AdminUrls.CreateOfflineOrder, params)
            .then(response => response.data)
    }
}

const getFormDataForBannerAndBlog = (params) => {
    const formData = new FormData();

    if (params.title) formData.append('Title', params.title);
    if (params.description) formData.append('Description', params.description);
    if (params.metaKeywords) formData.append('MetaKeywords', params.metaKeywords);
    if (params.metaDescription) formData.append('MetaDescription', params.metaDescription);
    if (params.desktopImageUrl) formData.append('DesktopImage', params.desktopImageUrl);
    if (params.laptopImageUrl) formData.append('LaptopImage', params.laptopImageUrl);
    if (params.tabletImageUrl) formData.append('TabletImage', params.tabletImageUrl);
    if (params.phoneImageUrl) formData.append('PhoneImage', params.phoneImageUrl);
    if (params.altText) formData.append('AltText', params.altText)
    if (params.productIds && params.productIds.length > 0) {
        params.productIds.forEach(id => formData.append('ProductIds', id));
    }

    return formData;
}