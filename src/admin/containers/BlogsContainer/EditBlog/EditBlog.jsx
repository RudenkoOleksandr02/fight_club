import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getModifiedFields} from "../../../../common/utils/getModifiedFields";
import {getAdminBlogs, updateAdminBlogById} from "../../../../store/adminSlices/adminBlogSlice";
import GeneralPopup from "../../../GeneralPopup/GeneralPopup";
import EditableEntity from "../../../EditableEntity/EditableEntity";

const EditBlog = ({isOpenPopupEdit, setIsOpenPopupEdit}) => {
    const dispatch = useDispatch();
    const {blog: {data: blogData, loading: blogLoading}} = useSelector(state => state.admin.adminBlog);

    const [initialObject, setInitialObject] = useState({});
    useEffect(() => {
        if (blogData) {
            setInitialObject({
                id: blogData.blogId || '',
                title: blogData.title || '',
                description: blogData.description || '',
                metaKeywords: blogData.metaKeywords || '',
                metaDescription: blogData.metaDescription || '',
                desktopImageUrl: blogData.desktopImageUrl || '',
                laptopImageUrl: blogData.laptopImageUrl || '',
                tabletImageUrl: blogData.tabletImageUrl || '',
                phoneImageUrl: blogData.phoneImageUrl || '',
                altText: blogData.altText || '',
                products: blogData.products || [],
            });
        }
    }, [blogData]);
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
        dispatch(updateAdminBlogById(blogData.blogId, modifiedData))
            .then(() => dispatch(getAdminBlogs()))
    }

    return (
        <EditableEntity
            isOpenPopup={isOpenPopupEdit}
            setIsOpenPopup={setIsOpenPopupEdit}
            handleSave={handleSave}
            initialObject={initialObject}
            loading={blogLoading}
            trackerFields={trackerFields}
            Component={GeneralPopup}
        />
    );
};

export default EditBlog;