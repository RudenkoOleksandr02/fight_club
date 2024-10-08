import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteBannerById, getAdminBannerById, getAdminBanners} from "../../../store/adminSlices/adminBannerSlice";
import classes from './BannerContainer.module.css'
import TopPanel from "../../TopPanel/TopPanel";
import SecondaryButton from "../../buttons/SecondaryButton/SecondaryButton";
import BottomPanel from "../../BottomPanel/BottomPanel";
import BannersTable from "./BannersTable/BannersTable";
import EditBanner from "./EditBanner/EditBanner";
import AddBanner from "./AddBanner/AddBanner";

const BannerContainer = ({currentPage, setCurrentPage, amount, setAmount}) => {
    const [isOpenPopupEdit, setIsOpenPopupEdit] = useState(false);
    const [isOpenPopupAdd, setIsOpenPopupAdd] = useState(false);
    const {banners: {data: bannersData, loading: bannersLoading}} = useSelector(state => state.admin.adminBanner);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAdminBanners())
    }, [])

    const startIndex = (currentPage - 1) * amount;
    const displayedBanners = bannersData.slice(startIndex, startIndex + amount)
    const handleClickEdit = (blogId) => {
        dispatch(getAdminBannerById(blogId))
        setIsOpenPopupEdit(true);
    }
    const handleDeleteBannerById = (bannerId) => {
        dispatch(deleteBannerById(bannerId))
            .then(() => dispatch(getAdminBanners()))
    }

    return (
        <div className={classes.wrapper}>
            <TopPanel
                currentPage={currentPage}
                amount={amount}
                totalCount={bannersData.length}
                setCurrentPage={setCurrentPage}
            >
                <SecondaryButton handleClick={() => setIsOpenPopupAdd(true)}>Додати баннер</SecondaryButton>
            </TopPanel>
            <BannersTable
                bannersData={displayedBanners}
                handleClickEdit={handleClickEdit}
                handleDeleteBannerById={handleDeleteBannerById}
            />
            <EditBanner isOpenPopupEdit={isOpenPopupEdit} setIsOpenPopupEdit={setIsOpenPopupEdit}/>
            <AddBanner isOpenPopupAdd={isOpenPopupAdd} setIsOpenPopupAdd={setIsOpenPopupAdd}/>
            <BottomPanel
                currentPage={currentPage}
                amount={amount}
                totalCount={bannersData.length}
                setCurrentPage={setCurrentPage}
                setAmount={setAmount}
                amountTitle='Кількість показаних банерів'
            />
        </div>
    );
};

export default BannerContainer;