import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    getAdminPromocodes,
    getAdminPromocodeById,
    deletePromocodeById
} from '../../../store/adminSlices/adminPromocodeSlice';
import classes from '../BannerContainer/BannerContainer.module.css';
import TopPanel from '../../TopPanel/TopPanel';
import SecondaryButton from '../../buttons/SecondaryButton/SecondaryButton';
import BottomPanel from '../../BottomPanel/BottomPanel';
import PromocodesTable from './PromocodesTable/PromocodesTable';
import EditPromocode from './EditPromocode/EditPromocode';
import AddPromocode from './AddPromocode/AddPromocode';

const PromocodesContainer = ({currentPage, setCurrentPage, amount, setAmount}) => {
    const [isOpenPopupEdit, setIsOpenPopupEdit] = useState(false);
    const [isOpenPopupAdd, setIsOpenPopupAdd] = useState(false);
    const {promocodes: {data: promocodesData}} = useSelector(state => state.admin.adminPromocode);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAdminPromocodes());
    }, [dispatch]);

    const startIndex = (currentPage - 1) * amount;
    const displayedPromocodes = promocodesData.slice(startIndex, startIndex + amount);
    const handleClickEdit = (promoId) => {
        dispatch(getAdminPromocodeById(promoId));
        setIsOpenPopupEdit(true);
    };

    const handleDeletePromocodeById = (promoId) => {
        dispatch(deletePromocodeById(promoId))
            .then(() => dispatch(getAdminPromocodes()))
    }

    return (
        <div className={classes.wrapper}>
            <TopPanel
                currentPage={currentPage}
                amount={amount}
                totalCount={promocodesData.length}
                setCurrentPage={setCurrentPage}
            >
                <SecondaryButton handleClick={() => setIsOpenPopupAdd(true)}>Додати промокод</SecondaryButton>
            </TopPanel>
            <PromocodesTable promocodesData={displayedPromocodes} handleClickEdit={handleClickEdit}
                             handleDeletePromocodeById={handleDeletePromocodeById}/>
            <EditPromocode isOpenPopupEdit={isOpenPopupEdit} setIsOpenPopupEdit={setIsOpenPopupEdit}/>
            <AddPromocode isOpenPopupAdd={isOpenPopupAdd} setIsOpenPopupAdd={setIsOpenPopupAdd}/>
            <BottomPanel
                currentPage={currentPage}
                amount={amount}
                totalCount={promocodesData.length}
                setCurrentPage={setCurrentPage}
                setAmount={setAmount}
                amountTitle="Кількість відображених промокодів"
            />
        </div>
    );
};

export default PromocodesContainer;