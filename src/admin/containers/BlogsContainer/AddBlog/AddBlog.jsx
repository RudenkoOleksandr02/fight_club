import React, {useEffect, useRef, useState} from 'react';
import {getModifiedFields} from "../../../../common/utils/getModifiedFields";
import PopupAdmin from "../../../PopupAdmin/PopupAdmin";
import {useDispatch} from "react-redux";
import {addBlog} from "../../../../store/adminSlices/adminBlogSlice";
import GeneralPopup from "../../../GeneralPopup/GeneralPopup";

const AddBlog = ({isOpenPopupAdd, setIsOpenPopupAdd}) => {
    const dispatch = useDispatch()
    const [blogDataForOnlyChange, setBlogDataForOnlyChange] = useState({
        id: '',
        title: '',
        description: '',
        metaKeywords: '',
        metaDescription: '',
        desktopImageUrl: '',
        laptopImageUrl: '',
        tabletImageUrl: '',
        phoneImageUrl: '',
        desktopAltText: '1',
        laptopAltText: '2',
        tabletAltText: '3',
        phoneAltText: '4',
        products: [],
    });
    const [blogDataForOnlyTrack, setBlogDataForOnlyTrack] = useState({});
    const prevBlogDataForOnlyTrack = useRef({});
    const [isSaveButtonActive, setIsSaveButtonActive] = useState(false);

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
            phoneImageUrl: blogDataForOnlyChange.phoneImageUrl,
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
        dispatch(addBlog(modifiedData))
        setIsOpenPopupAdd(false)
    }

    return (
        <>
            {isOpenPopupAdd && (
                <PopupAdmin>
                    <GeneralPopup
                        handleClose={() => setIsOpenPopupAdd(false)}
                        data={blogDataForOnlyChange}
                        setData={setBlogDataForOnlyChange}
                        isSaveButtonActive={isSaveButtonActive}
                        handleSave={handleSave}
                    />
                </PopupAdmin>
            )}
        </>
    );
};

export default AddBlog;