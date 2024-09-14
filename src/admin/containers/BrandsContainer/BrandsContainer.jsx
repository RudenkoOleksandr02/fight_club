import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAdminBrandById, getAdminBrands} from "../../../store/adminSlices/adminBrandsSlice";
import classes from "../BannerContainer/BannerContainer.module.css";
import TopPanel from "../../TopPanel/TopPanel";
import SecondaryButton from "../../buttons/SecondaryButton/SecondaryButton";
import Preloader from "../../../components/ui/Preloader/Preloader";
import BottomPanel from "../../BottomPanel/BottomPanel";
import BrandsTable from "./BrandsTable/BrandsTable";
import EditBrands from "./EditBrands/EditBrands";
import AddBrands from "./AddBrands/AddBrands";

const BrandsContainer = ({currentPage, setCurrentPage, amount, setAmount}) => {
    const [isOpenPopupEdit, setIsOpenPopupEdit] = useState(false);
    const [isOpenPopupAdd, setIsOpenPopupAdd] = useState(false);
    const {brands: {data: brandsData, loading: brandsLoading}} = useSelector(state => state.admin.adminBrands);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAdminBrands())
    }, []);

    const startIndex = (currentPage - 1) * amount;
    const displayedBrands = brandsData.slice(startIndex, startIndex + amount)
    const handleClickEdit = (brandId) => {
        dispatch(getAdminBrandById(brandId))
        setIsOpenPopupEdit(true);
    }

    return (
        <div className={classes.wrapper}>
            <TopPanel
                currentPage={currentPage}
                amount={amount}
                totalCount={brandsData.length}
                setCurrentPage={setCurrentPage}
            >
                <SecondaryButton handleClick={() => setIsOpenPopupAdd(true)}>Додати бренд</SecondaryButton>
            </TopPanel>
            {brandsLoading ? <Preloader color='primary'/> : (
                <BrandsTable brandsData={displayedBrands} handleClickEdit={handleClickEdit}/>
            )}
            <EditBrands isOpenPopupEdit={isOpenPopupEdit} setIsOpenPopupEdit={setIsOpenPopupEdit}/>
            <AddBrands isOpenPopupAdd={isOpenPopupAdd} setIsOpenPopupAdd={setIsOpenPopupAdd}/>
            <BottomPanel
                currentPage={currentPage}
                amount={amount}
                totalCount={brandsData.length}
                setCurrentPage={setCurrentPage}
                setAmount={setAmount}
                amountTitle='Кількість показаних брендів'
            />
        </div>
    );
};

export default BrandsContainer;