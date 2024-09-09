import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getModifiedFields} from "../../../../common/utils/getModifiedFields";
import {
    getProductsByAdminFilter,
    postImagesByProductId,
    putProductById,
    removeImagesByProductId
} from "../../../../store/adminSlices/adminProductSlice";
import {getProductById} from "../../../../store/pageSlices/productPageSlice";
import Preloader from "../../../../components/ui/Preloader/Preloader";
import PopupAdmin from "../../../PopupAdmin/PopupAdmin";
import PopupForProduct from "../PopupForProduct/PopupForProduct";


const EditProduct = ({isOpenPopupProductEdit, setIsOpenPopupProductEdit, amount, currentPage}) => {
    const dispatch = useDispatch();
    const {product: {data: productData, loading: productLoading}} = useSelector(state => state.admin.adminProduct);

    const [productDataForEditOnlyChange, setProductDataForEditOnlyChange] = useState({});
    const [productDataForEditOnlyTrack, setProductDataForEditOnlyTrack] = useState({});
    const prevProductDataForEditOnlyTrack = useRef({});
    const [isSaveButtonActive, setIsSaveButtonActive] = useState(false);

    // Обновление productDataForEditOnlyChange и зачистка prevProductDataForEditOnlyTrack.current
    useEffect(() => {
        if (productData) {
            setProductDataForEditOnlyChange({
                id: productData.id || '',
                images: {urls: productData.images, files: []} || {},
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
                additionalCategories: productData.additionalCategories || [],
                metaKeys: productData.metaKeys || '',
                metaDescription: productData.metaDescription || ''
            });
        }

        prevProductDataForEditOnlyTrack.current = {}
    }, [productData]);

    // Обновление productDataForEditOnlyTrack
    useEffect(() => {
        setProductDataForEditOnlyTrack({
            images: productDataForEditOnlyChange.images,
            name: productDataForEditOnlyChange.name,
            nameEng: productDataForEditOnlyChange.nameEng,
            price: productDataForEditOnlyChange.price,
            discount: productDataForEditOnlyChange.discount,
            amount: productDataForEditOnlyChange.amount,
            article: productDataForEditOnlyChange.article,
            description: productDataForEditOnlyChange.description,
            ingridients: productDataForEditOnlyChange.ingridients,
            mainCategoryId: productDataForEditOnlyChange.mainCategory?.categoryId,
            characteristicIds: productDataForEditOnlyChange?.characteristics?.map(characteristic => characteristic.characteristicId),
            additionalCategoryIds: productDataForEditOnlyChange?.additionalCategories?.map(addCategory => addCategory.categoryId),
            metaKeys: productDataForEditOnlyChange.metaKeys,
            metaDescription: productDataForEditOnlyChange.metaDescription
        });
    }, [productDataForEditOnlyChange]);

    // Обновление prevProductDataForEditOnlyTrack.current
    useEffect(() => {
        if (!Object.keys(prevProductDataForEditOnlyTrack.current).length
            && Object.keys(productDataForEditOnlyTrack).every(key => productDataForEditOnlyTrack[key] !== undefined)) {
            prevProductDataForEditOnlyTrack.current = productDataForEditOnlyTrack;
        }
    }, [productDataForEditOnlyTrack]);

    // Проверка изменений и активация кнопки сохранения
    useEffect(() => {
        if (!!Object.keys(prevProductDataForEditOnlyTrack.current).length) {
            const modifiedFields = getModifiedFields(prevProductDataForEditOnlyTrack.current, productDataForEditOnlyTrack);
            console.log(modifiedFields)
            if (!Object.keys(modifiedFields).length) {
                setIsSaveButtonActive(false)
            } else {
                setIsSaveButtonActive(true)
            }
        }
    }, [productDataForEditOnlyTrack]);

    // Слежка за удаленными изображениями
    const [currentImagesUrls, setCurrentImagesUrls] = useState([]);
    useEffect(() => {
        if (productDataForEditOnlyTrack.images) {
            const urls = productDataForEditOnlyTrack.images.urls || [];
            setCurrentImagesUrls(urls);
        }
    }, [productDataForEditOnlyTrack.images]);

    const handlePutProduct = () => {
        const modifiedData = getModifiedFields(prevProductDataForEditOnlyTrack.current, productDataForEditOnlyTrack);
        const modifiedDataWithoutImages = Object.keys(modifiedData).reduce((acc, key) => {
            if (key !== 'images') {
                acc[key] = modifiedData[key];
            }
            return acc;
        }, {});
        dispatch(putProductById(productData.id, modifiedDataWithoutImages))
            .then(() => {
                productData.images.forEach(image => {
                    const currentUrls = currentImagesUrls || [];
                    if (!currentUrls.includes(image)) {
                        dispatch(removeImagesByProductId(productData.id, image));
                    }
                });
            })
            .then(() => dispatch(postImagesByProductId(productData.id, productDataForEditOnlyChange.images.files)))
            .then(() => dispatch(getProductById(productData.id)))
            .then(() => dispatch(getProductsByAdminFilter({amount, start: (currentPage - 1) * amount})));
    };

    return (
        <>
            {isOpenPopupProductEdit && (
                productLoading ? (
                    <Preloader color='secondary' cover={true}/>
                ) : (
                    <PopupAdmin>
                        <PopupForProduct
                            productData={productDataForEditOnlyChange}
                            setProductData={setProductDataForEditOnlyChange}
                            handleClosePopup={() => setIsOpenPopupProductEdit(false)}
                            handleSaveProduct={handlePutProduct}
                            isSaveButtonActive={isSaveButtonActive}
                        />
                    </PopupAdmin>
                )
            )}
        </>
    );
};

export default EditProduct;
