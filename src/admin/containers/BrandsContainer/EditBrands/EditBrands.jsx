import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getModifiedFields} from "../../../../common/utils/getModifiedFields";
import {getAdminBrands, updateAdminBrandById} from "../../../../store/adminSlices/adminBrandsSlice";
import EditableEntity from "../../../EditableEntity/EditableEntity";
import BrandsPopup from "../BrandsPopup/BrandsPopup";

const EditBrands = ({isOpenPopupEdit, setIsOpenPopupEdit}) => {
    const dispatch = useDispatch();
    const {brand: {data: brandData, loading: brandLoading}} = useSelector(state => state.admin.adminBrands);

    const [initialObject, setInitialObject] = useState({});
    useEffect(() => {
        if (brandData) {
            setInitialObject({
                title: brandData.title || '',
                description: brandData.description || '',
                metaKeywords: brandData.metaKeywords || '',
                metaDescription: brandData.metaDescription || '',
                imageUrl: brandData.imageUrl || '',
                logoImageUrl: brandData.logoImageUrl || ''
            });
        }
    }, [brandData]);
    const trackerFields = (obj = {}) => {
        return {
            title: obj.title,
            description: obj.description,
            metaKeywords: obj.metaKeywords,
            metaDescription: obj.metaDescription,
            imageUrl: obj.imageUrl,
            logoImageUrl: obj.logoImageUrl
        }
    }

    const handleSave = (prevDataForOnlyTrack, dataForOnlyTrack) => {
        const modifiedData = getModifiedFields(prevDataForOnlyTrack, dataForOnlyTrack);
        dispatch(updateAdminBrandById(brandData.brandId, modifiedData))
            .then(() => dispatch(getAdminBrands()))
    }

    return (
        <EditableEntity
            isOpenPopup={isOpenPopupEdit}
            setIsOpenPopup={setIsOpenPopupEdit}
            handleSave={handleSave}
            initialObject={initialObject}
            loading={brandLoading}
            trackerFields={trackerFields}
            Component={BrandsPopup}
        />
    );
};

export default EditBrands;