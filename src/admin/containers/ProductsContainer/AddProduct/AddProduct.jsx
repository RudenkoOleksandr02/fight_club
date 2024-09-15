import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { getModifiedFields } from '../../../../common/utils/getModifiedFields';
import PopupForProduct from '../PopupForProduct/PopupForProduct';
import {addProduct, getProductsByAdminFilter} from '../../../../store/adminSlices/adminProductSlice';
import EditableEntity from '../../../EditableEntity/EditableEntity';

const AddProduct = ({ isOpenPopupAddProduct, setIsOpenPopupAddProduct, amount, currentPage, searchTerm }) => {
    const dispatch = useDispatch();

    const initialObject = useMemo(() => ({
        name: '',
        nameEng: '',
        mainCategory: {},
        brand: {},
        article: '',
        price: '',
        discount: '',
        amount: '',
        description: '',
        ingridients: '',
        characteristics: [],
        additionalCategories: [],
        images: { urls: [], files: [] },
        metaKeys: '',
        metaDescription: '',
    }), []); // Используем useMemo для мемоизации объекта initialObject

    const trackerFields = useCallback((obj = {}) => ({
        name: obj.name,
        nameEng: obj.nameEng,
        mainCategoryId: obj.mainCategory?.categoryId || {},
        brandId: obj.brand?.brandId || {},
        article: obj.article,
        price: obj.price,
        discount: obj.discount,
        amount: obj.amount,
        description: obj.description,
        ingridients: obj.ingridients,
        characteristicIds: obj?.characteristics?.map(characteristic => characteristic.characteristicId),
        additionalCategoryIds: obj?.additionalCategories?.map(addCategory => addCategory.categoryId),
        images: obj.images,
        metaKeys: obj.metaKeys,
        metaDescription: obj.metaDescription
    }), []); // Обернули trackerFields в useCallback для предотвращения пересоздания функции

    const handleSave = useCallback((prevDataForOnlyTrack, dataForOnlyTrack) => {
        const modifiedData = getModifiedFields(prevDataForOnlyTrack, dataForOnlyTrack);
        dispatch(addProduct(modifiedData))
            .then(() => dispatch(getProductsByAdminFilter({amount, start: (currentPage - 1) * amount, searchTerm})));

        setIsOpenPopupAddProduct(false)
    }, [dispatch]); // Используем useCallback для мемоизации handleSave

    return (
        <EditableEntity
            isOpenPopup={isOpenPopupAddProduct}
            setIsOpenPopup={setIsOpenPopupAddProduct}
            handleSave={handleSave}
            initialObject={initialObject}
            loading={false}
            trackerFields={trackerFields}
            Component={PopupForProduct}
        />
    );
};

export default AddProduct;
