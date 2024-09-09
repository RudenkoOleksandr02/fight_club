import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getModifiedFields} from "../../../../common/utils/getModifiedFields";
import {getAdminBanners, updateAdminBannerById} from "../../../../store/adminSlices/adminBannerSlice";
import Preloader from "../../../../components/ui/Preloader/Preloader";
import PopupAdmin from "../../../PopupAdmin/PopupAdmin";
import GeneralPopup from "../../../GeneralPopup/GeneralPopup";

const EditBanner = ({isOpenPopupEdit, setIsOpenPopupEdit}) => {
    const {banner: {data: bannerData, loading: bannerLoading}} = useSelector(state => state.admin.adminBanner);
    const dispatch = useDispatch();

    const [bannerDataForOnlyChange, setBannerDataForOnlyChange] = useState({});
    const [bannerDataForOnlyTrack, setBannerDataForOnlyTrack] = useState({});
    const prevBannerDataForOnlyTrack = useRef({});
    const [isSaveButtonActive, setIsSaveButtonActive] = useState(false);

    // Обновление bannerDataForOnlyChange и зачистка prevBannerDataForOnlyTrack.current
    useEffect(() => {
        if (bannerData) {
            setBannerDataForOnlyChange({
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

        prevBannerDataForOnlyTrack.current = {}
    }, [bannerData]);

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
            altText: bannerDataForOnlyChange.altText,
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
        dispatch(updateAdminBannerById(bannerData.bannerId, modifiedData))
            .then(() => dispatch(getAdminBanners()))
    }

    return (
        <>
            {isOpenPopupEdit && (
                bannerLoading ? (
                    <Preloader color='secondary' cover={true}/>
                ) : (
                    <PopupAdmin>
                        <GeneralPopup
                            handleClose={() => setIsOpenPopupEdit(false)}
                            data={bannerDataForOnlyChange}
                            setData={setBannerDataForOnlyChange}
                            isSaveButtonActive={isSaveButtonActive}
                            handleSave={handleSave}
                        />
                    </PopupAdmin>
                )
            )}
        </>
    );
};

export default EditBanner;