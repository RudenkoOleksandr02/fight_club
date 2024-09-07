import React, {useEffect, useRef, useState} from 'react';
import PopupAdmin from "../../../PopupAdmin/PopupAdmin";
import Preloader from "../../../../components/ui/Preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import {getModifiedFields} from "../../../../common/utils/getModifiedFields";
import {getAdminBlogs, updateAdminBlogById} from "../../../../store/adminSlices/adminBlogSlice";
import GeneralPopup from "../../../GeneralPopup/GeneralPopup";

const EditBlog = ({isOpenPopupEdit, setIsOpenPopupEdit}) => {
    const {blog: {data: blogData, loading: blogLoading}} = useSelector(state => state.admin.adminBlog);
    const dispatch = useDispatch();

    const [blogDataForOnlyChange, setBlogDataForOnlyChange] = useState({});
    const [blogDataForOnlyTrack, setBlogDataForOnlyTrack] = useState({});
    const prevBlogDataForOnlyTrack = useRef({});
    const [isSaveButtonActive, setIsSaveButtonActive] = useState(false);

    // Обновление blogDataForOnlyChange и зачистка prevBlogDataForOnlyTrack.current
    useEffect(() => {
        if (blogData) {
            setBlogDataForOnlyChange({
                id: blogData.blogId || '',
                title: blogData.title || '',
                description: blogData.description || '',
                metaKeywords: blogData.metaKeywords || '',
                metaDescription: blogData.metaDescription || '',
                desktopImageUrl: blogData.desktopImageUrl || '',
                laptopImageUrl: blogData.laptopImageUrl || '',
                tabletImageUrl: blogData.tabletImageUrl || '',
                phoneImageUrl : blogData.phoneImageUrl || '',
                desktopAltText: blogData.desktopAltText || '',
                laptopAltText: blogData.laptopAltText || '',
                tabletAltText: blogData.tabletAltText || '',
                phoneAltText: blogData.phoneAltText || '',
                products: blogData.products || [],
            });
        }

        prevBlogDataForOnlyTrack.current = {}
    }, [blogData]);

    // Обновление blogDataForOnlyTrack
    useEffect(() => {
        setBlogDataForOnlyTrack({
            title: blogDataForOnlyChange.title,
            description: blogDataForOnlyChange.description,
            metaKeywords: blogDataForOnlyChange.metaKeywords,
            metaDescription: blogDataForOnlyChange.metaDescription,
            desktopImageUrl: blogDataForOnlyChange.desktopImageUrl,
            laptopImageUrl: blogDataForOnlyChange.laptopImageUrl,
            tabletImageUrl: blogDataForOnlyChange.tabletImageUrl,
            phoneImageUrl : blogDataForOnlyChange.phoneImageUrl,
            desktopAltText: blogDataForOnlyChange.desktopAltText,
            laptopAltText: blogDataForOnlyChange.laptopAltText,
            tabletAltText: blogDataForOnlyChange.tabletAltText,
            phoneAltText: blogDataForOnlyChange.phoneAltText,
            productIds: blogDataForOnlyChange.products?.map(product => product.id)
        });
    }, [blogDataForOnlyChange]);

    // Обновление prevBlogDataForOnlyTrack.current
    useEffect(() => {
        if (!Object.keys(prevBlogDataForOnlyTrack.current).length
            && Object.keys(blogDataForOnlyTrack).every(key => blogDataForOnlyTrack[key] !== undefined)) {
            prevBlogDataForOnlyTrack.current = blogDataForOnlyTrack;
        }
    }, [blogDataForOnlyTrack]);

    // Проверка изменений и активация кнопки сохранения
    useEffect(() => {
        if (!!Object.keys(prevBlogDataForOnlyTrack.current).length) {
            const modifiedFields = getModifiedFields(prevBlogDataForOnlyTrack.current, blogDataForOnlyTrack);
            if (!Object.keys(modifiedFields).length) {
                setIsSaveButtonActive(false)
            } else {
                setIsSaveButtonActive(true)
            }
        }
    }, [blogDataForOnlyTrack]);

    const handleSave = () => {
        const modifiedData = getModifiedFields(prevBlogDataForOnlyTrack.current, blogDataForOnlyTrack);
        dispatch(updateAdminBlogById(blogData.blogId, modifiedData))
            .then(() => dispatch(getAdminBlogs()))
    }

    return (
        <>
            {isOpenPopupEdit && (
                blogLoading ? (
                    <Preloader color='secondary' cover={true}/>
                ) : (
                    <PopupAdmin>
                        <GeneralPopup
                            handleClose={() => setIsOpenPopupEdit(false)}
                            data={blogDataForOnlyChange}
                            setData={setBlogDataForOnlyChange}
                            isSaveButtonActive={isSaveButtonActive}
                            handleSave={handleSave}
                        />
                    </PopupAdmin>
                )
            )}
        </>
    );
};

export default EditBlog;