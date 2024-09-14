import React from 'react';
import {useDispatch} from "react-redux";
import {getModifiedFields} from "../../../../common/utils/getModifiedFields";
import {addAdminBrand, getAdminBrands} from "../../../../store/adminSlices/adminBrandsSlice";
import EditableEntity from "../../../EditableEntity/EditableEntity";
import BrandsPopup from "../BrandsPopup/BrandsPopup";

const AddBrands = ({isOpenPopupAdd, setIsOpenPopupAdd}) => {
    const dispatch = useDispatch();
    const initialObject = {
        title: '',
        description: '',
        metaKeywords: '',
        metaDescription: '',
        imageUrl: '',
        logoImageUrl: ''
    }
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
        dispatch(addAdminBrand(modifiedData))
            .then(() => dispatch(getAdminBrands()))
        setIsOpenPopupAdd(false)
    }

    return (
        <EditableEntity
            isOpenPopup={isOpenPopupAdd}
            setIsOpenPopup={setIsOpenPopupAdd}
            handleSave={handleSave}
            initialObject={initialObject}
            loading={false}
            trackerFields={trackerFields}
            Component={BrandsPopup}
        />
    );
};

export default AddBrands;