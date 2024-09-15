import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getModifiedFields } from '../../../../common/utils/getModifiedFields';
import {
    getProductsByAdminFilter,
    putProductById,
    getProductById,
} from '../../../../store/adminSlices/adminProductSlice';
import PopupForProduct from '../PopupForProduct/PopupForProduct';
import EditableEntity from '../../../EditableEntity/EditableEntity';

const EditProduct = ({
                         isOpenPopupProductEdit,
                         setIsOpenPopupProductEdit,
                         amount,
                         currentPage,
                         searchTerm,
                     }) => {
    const dispatch = useDispatch();
    const {
        product: { data: productData, loading: productLoading },
    } = useSelector((state) => state.admin.adminProduct);

    // Состояние для хранения исходных URL изображений
    const [initialImageUrls, setInitialImageUrls] = useState([]);
    const [initialObject, setInitialObject] = useState({});

    useEffect(() => {
        if (productData) {
            // Сохраняем исходные URL изображений
            setInitialImageUrls(productData.images || []);

            setInitialObject({
                id: productData.id || '',
                images: { urls: productData.images || [], files: [] },
                name: productData.name || '',
                nameEng: productData.nameEng || '',
                price: productData.price || '',
                discount: productData.discount || '',
                amount: productData.amount || '',
                article: productData.article || '',
                description: productData.description || '',
                ingridients: productData.ingridients || '',
                characteristics: productData.characteristics || [],
                mainCategory: productData.mainCategory || {},
                brand: productData.brand || {},
                additionalCategories: productData.additionalCategories || [],
                metaKeys: productData.metaKeys || '',
                metaDescription: productData.metaDescription || '',
            });
        }
    }, [productData]);
    console.log(productData.brand)

    const trackerFields = (obj = {}) => {
        const initialUrls = initialImageUrls;
        const updatedUrls = obj.images?.urls || [];
        const imagesToDelete = initialUrls.filter((url) => !updatedUrls.includes(url));
        const imagesToAdd = obj.images?.files || [];

        return {
            imagesToDelete: imagesToDelete,
            imagesToAdd: imagesToAdd,
            name: obj.name,
            nameEng: obj.nameEng,
            price: obj.price,
            discount: obj.discount,
            amount: obj.amount,
            article: obj.article,
            description: obj.description,
            ingridients: obj.ingridients,
            mainCategoryId: obj.mainCategory?.categoryId,
            brandId: obj.brand?.brandId || {},
            characteristicIds: obj?.characteristics?.map((characteristic) => characteristic.characteristicId),
            additionalCategoryIds: obj?.additionalCategories?.map((addCategory) => addCategory.categoryId),
            metaKeys: obj.metaKeys,
            metaDescription: obj.metaDescription,
        };
    };

    const handleSave = (prevDataForOnlyTrack, dataForOnlyTrack) => {
        const modifiedData = getModifiedFields(prevDataForOnlyTrack, dataForOnlyTrack);

        dispatch(putProductById(productData.id, modifiedData))
            .then(() => dispatch(getProductById(productData.id)))
            .then(() =>
                dispatch(
                    getProductsByAdminFilter({
                        amount,
                        start: (currentPage - 1) * amount,
                        searchTerm,
                    })
                )
            );
    };

    return (
        <EditableEntity
            isOpenPopup={isOpenPopupProductEdit}
            setIsOpenPopup={setIsOpenPopupProductEdit}
            handleSave={handleSave}
            initialObject={initialObject}
            loading={productLoading}
            trackerFields={trackerFields}
            Component={PopupForProduct}
        />
    );
};

export default EditProduct;
