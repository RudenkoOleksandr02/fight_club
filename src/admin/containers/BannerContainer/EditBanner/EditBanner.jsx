import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getModifiedFields} from "../../../../common/utils/getModifiedFields";
import {getAdminBanners, updateAdminBannerById} from "../../../../store/adminSlices/adminBannerSlice";
import GeneralPopup from "../../../GeneralPopup/GeneralPopup";
import EditableEntity from "../../../EditableEntity/EditableEntity";

const EditBanner = ({isOpenPopupEdit, setIsOpenPopupEdit}) => {
    const dispatch = useDispatch();
    const {banner: {data: bannerData, loading: bannerLoading}} = useSelector(state => state.admin.adminBanner);

    const [initialObject, setInitialObject] = useState({});
    useEffect(() => {
        if (bannerData) {
            setInitialObject({
                id: bannerData.bannerId || '',
                title: bannerData.title || '',
                description: bannerData.description || '',
                metaKeywords: bannerData.metaKeywords || '',
                metaDescription: bannerData.metaDescription || '',
                desktopImageUrl: bannerData.desktopImageUrl || '',
                laptopImageUrl: bannerData.laptopImageUrl || '',
                tabletImageUrl: bannerData.tabletImageUrl || '',
                phoneImageUrl : bannerData.phoneImageUrl || '',
                altText: bannerData.altText || '',
                products: bannerData.products || [],
            });
        }
    }, [bannerData]);
    const trackerFields = (obj = {}) => {
        return {
            title: obj.title,
            description: obj.description,
            metaKeywords: obj.metaKeywords,
            metaDescription: obj.metaDescription,
            desktopImageUrl: obj.desktopImageUrl,
            laptopImageUrl: obj.laptopImageUrl,
            tabletImageUrl: obj.tabletImageUrl,
            phoneImageUrl : obj.phoneImageUrl,
            altText: obj.altText,
            productIds: obj.products?.map(product => product.id)
        }
    }

    const handleSave = (prevDataForOnlyTrack, dataForOnlyTrack) => {
        const modifiedData = getModifiedFields(prevDataForOnlyTrack, dataForOnlyTrack);
        dispatch(updateAdminBannerById(bannerData.bannerId, modifiedData))
            .then(() => dispatch(getAdminBanners()))
    }

    return (
        <EditableEntity
            isOpenPopup={isOpenPopupEdit}
            setIsOpenPopup={setIsOpenPopupEdit}
            handleSave={handleSave}
            initialObject={initialObject}
            loading={bannerLoading}
            trackerFields={trackerFields}
            Component={GeneralPopup}
        />
    );
};

export default EditBanner;