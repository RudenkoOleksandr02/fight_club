import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from "react-redux";
import {getModifiedFields} from "../../../../common/utils/getModifiedFields";
import {addBanner} from "../../../../store/adminSlices/adminBannerSlice";
import PopupAdmin from "../../../PopupAdmin/PopupAdmin";
import GeneralPopup from "../../../GeneralPopup/GeneralPopup";

const AddBanner = ({isOpenPopupAdd, setIsOpenPopupAdd}) => {
    const dispatch = useDispatch()
    const [bannerDataForOnlyChange, setBannerDataForOnlyChange] = useState({
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
    const [bannerDataForOnlyTrack, setBannerDataForOnlyTrack] = useState({});
    const prevBannerDataForOnlyTrack = useRef({});
    const [isSaveButtonActive, setIsSaveButtonActive] = useState(false);

    // Обновление bannerDataForOnlyTrack
    useEffect(() => {
        setBannerDataForOnlyTrack({
            title: bannerDataForOnlyChange.title,
            description: bannerDataForOnlyChange.description,
            metaKeywords: bannerDataForOnlyChange.metaKeywords,
            metaDescription: bannerDataForOnlyChange.metaDescription,
            desktopImageUrl: bannerDataForOnlyChange.desktopImageUrl,
            laptopImageUrl: bannerDataForOnlyChange.laptopImageUrl,
            tabletImageUrl: bannerDataForOnlyChange.tabletImageUrl,
            phoneImageUrl : bannerDataForOnlyChange.phoneImageUrl,
            desktopAltText: bannerDataForOnlyChange.desktopAltText,
            laptopAltText: bannerDataForOnlyChange.laptopAltText,
            tabletAltText: bannerDataForOnlyChange.tabletAltText,
            phoneAltText: bannerDataForOnlyChange.phoneAltText,
            productIds: bannerDataForOnlyChange.products?.map(product => product.id)
        });
    }, [bannerDataForOnlyChange]);

    // Обновление prevBannerDataForOnlyTrack.current
    useEffect(() => {
        if (!Object.keys(prevBannerDataForOnlyTrack.current).length
            && Object.keys(bannerDataForOnlyTrack).every(key => bannerDataForOnlyTrack[key] !== undefined)) {
            prevBannerDataForOnlyTrack.current = bannerDataForOnlyTrack;
        }
    }, [bannerDataForOnlyTrack]);

    // Проверка изменений и активация кнопки сохранения
    useEffect(() => {
        if (!!Object.keys(prevBannerDataForOnlyTrack.current).length) {
            const modifiedFields = getModifiedFields(prevBannerDataForOnlyTrack.current, bannerDataForOnlyTrack);
            if (!Object.keys(modifiedFields).length) {
                setIsSaveButtonActive(false)
            } else {
                setIsSaveButtonActive(true)
            }
        }
    }, [bannerDataForOnlyTrack]);

    const handleSave = () => {
        const modifiedData = getModifiedFields(prevBannerDataForOnlyTrack.current, bannerDataForOnlyTrack);
        dispatch(addBanner(modifiedData))
        setIsOpenPopupAdd(false)
    }

    return (
        <>
            {isOpenPopupAdd && (
                <PopupAdmin>
                    <GeneralPopup
                        handleClose={() => setIsOpenPopupAdd(false)}
                        data={bannerDataForOnlyChange}
                        setData={setBannerDataForOnlyChange}
                        isSaveButtonActive={isSaveButtonActive}
                        handleSave={handleSave}
                    />
                </PopupAdmin>
            )}
        </>
    );
};

export default AddBanner;