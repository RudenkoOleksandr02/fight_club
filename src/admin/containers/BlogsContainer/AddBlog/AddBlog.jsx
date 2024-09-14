import React from 'react';
import {getModifiedFields} from "../../../../common/utils/getModifiedFields";
import {useDispatch} from "react-redux";
import {addBlog, getAdminBlogs} from "../../../../store/adminSlices/adminBlogSlice";
import GeneralPopup from "../../../GeneralPopup/GeneralPopup";
import EditableEntity from "../../../EditableEntity/EditableEntity";

const AddBlog = ({isOpenPopupAdd, setIsOpenPopupAdd}) => {
    const dispatch = useDispatch()
    const initialObject = {
        id: '',
        title: '',
        description: '',
        metaKeywords: '',
        metaDescription: '',
        desktopImageUrl: '',
        laptopImageUrl: '',
        tabletImageUrl: '',
        phoneImageUrl: '',
        altText: '',
        products: []
    }
    const trackerFields = (obj = {}) => {
        return {
            title: obj.title,
            description: obj.description,
            metaKeywords: obj.metaKeywords,
            metaDescription: obj.metaDescription,
            desktopImageUrl: obj.desktopImageUrl,
            laptopImageUrl: obj.laptopImageUrl,
            tabletImageUrl: obj.tabletImageUrl,
            phoneImageUrl: obj.phoneImageUrl,
            altText: obj.altText,
            productIds: obj.products?.map(product => product.id)
        }
    }

    const handleSave = (prevDataForOnlyTrack, dataForOnlyTrack) => {
        const modifiedData = getModifiedFields(prevDataForOnlyTrack, dataForOnlyTrack);
        dispatch(addBlog(modifiedData))
            .then(() => dispatch(getAdminBlogs()))
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
            Component={GeneralPopup}
        />
    );
};

export default AddBlog;