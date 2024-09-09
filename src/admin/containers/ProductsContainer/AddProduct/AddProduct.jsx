import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from "react-redux";
import {getModifiedFields} from "../../../../common/utils/getModifiedFields";
import Preloader from "../../../../components/ui/Preloader/Preloader";
import PopupAdmin from "../../../PopupAdmin/PopupAdmin";
import PopupForProduct from "../PopupForProduct/PopupForProduct";

const AddProduct = ({isOpenPopupAddProduct, setIsOpenPopupAddProduct}) => {
    const dispatch = useDispatch();

    // инициализация начального состояния
    const [productDataForOnlyChange, setProductDataForOnlyChange] = useState({
        id: '',
        images: {},
        name: '',
        nameEng: '',
        price: '',
        discount: '',
        amount: '',
        article: '',
        description: '',
        ingridients: '',
        characteristic: [],
        mainCategory: {},
        additionalCategories: [],
        metaKeys: '',
        metaDescription: ''
    });
    const [productDataForOnlyTrack, setProductDataOnlyTrack] = useState({});
    const prevProductDataForEditOnlyTrack = useRef({});
    const [isSaveButtonActive, setIsSaveButtonActive] = useState(false);

    // Обновление productDataForOnlyTrack
    useEffect(() => {
        setProductDataOnlyTrack({
            images: productDataForOnlyChange.images,
            name: productDataForOnlyChange.name,
            nameEng: productDataForOnlyChange.nameEng,
            price: productDataForOnlyChange.price,
            discount: productDataForOnlyChange.discount,
            amount: productDataForOnlyChange.amount,
            article: productDataForOnlyChange.article,
            description: productDataForOnlyChange.description,
            ingridients: productDataForOnlyChange.ingridients,
            mainCategoryId: productDataForOnlyChange.mainCategory?.categoryId,
            characteristicIds: productDataForOnlyChange?.characteristics?.map(characteristic => characteristic.characteristicId),
            additionalCategoryIds: productDataForOnlyChange?.additionalCategories?.map(addCategory => addCategory.categoryId),
            metaKeys: productDataForOnlyChange.metaKeys,
            metaDescription: productDataForOnlyChange.metaDescription
        });
    }, [productDataForOnlyChange]);

    // Обновление prevProductDataForEditOnlyTrack.current
    useEffect(() => {
        if (!Object.keys(prevProductDataForEditOnlyTrack.current).length
            && Object.keys(productDataForOnlyTrack).every(key => productDataForOnlyTrack[key] !== undefined)) {
            prevProductDataForEditOnlyTrack.current = productDataForOnlyTrack;
        }
    }, [productDataForOnlyTrack]);

    // Проверка изменений и активация кнопки сохранения
    useEffect(() => {
        if (!!Object.keys(prevProductDataForEditOnlyTrack.current).length) {
            const modifiedFields = getModifiedFields(prevProductDataForEditOnlyTrack.current, productDataForOnlyTrack);
            if (!Object.keys(modifiedFields).length) {
                setIsSaveButtonActive(false)
            } else {
                setIsSaveButtonActive(true)
            }
        }
    }, [productDataForOnlyTrack]);

    const handleSave = () => {}

    return (
        <>
            {isOpenPopupAddProduct && (
                    <PopupAdmin>
                        <PopupForProduct
                            productData={productDataForOnlyChange}
                            setProductData={setProductDataForOnlyChange}
                            handleClosePopup={() => setIsOpenPopupAddProduct(false)}
                            handleSaveProduct={handleSave}
                            isSaveButtonActive={isSaveButtonActive}
                            mode='create'
                        />
                    </PopupAdmin>
            )}
        </>
    );
};

export default AddProduct;