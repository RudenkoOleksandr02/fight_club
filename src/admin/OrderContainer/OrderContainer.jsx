import React, {useEffect, useState} from 'react';
import TopPanel from "../TopPanel/TopPanel";
import {getOrderById, getOrders, getPromocodeById} from "../../store/adminSlice";
import {useDispatch, useSelector} from "react-redux";
import BottomPanel from "../BottomPanel/BottomPanel";
import classes from './OrderContainer.module.css'
import Search from "../SearchAdmin/SearchAdmin";
import SecondaryButton from "../buttons/SecondaryButton/SecondaryButton";
import OrderTable from "./OrderTable";
import OrderEditContainer from "./OrderEditContainer";
import PopupAdmin from "../PopupAdmin/PopupAdmin";
import Preloader from "../../components/ui/Preloader/Preloader";

const OrderContainer = ({currentPage, setCurrentPage, setAmount, amount}) => {
    const {orders, promocode, orderById} = useSelector(state => state.admin);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    const startIndex = (currentPage - 1) * amount;
    const displayedOrders = orders.data.slice(startIndex, startIndex + amount);

    const [isOpenPopupEdit, setIsOpenPopupEdit] = useState(false);
    const [orderId, setOrderId] = useState(null);
    useEffect(() => {
        const order = orders.data.find(order => order.orderId === orderId);
        dispatch(getPromocodeById(order?.promocodeId || null))
    }, [orderId, dispatch]);

    const handleClickEdit = (orderId) => {
        /*setOrderId(orderId);*/
        dispatch(getOrderById(orderId))
        setIsOpenPopupEdit(true);
    }

    return (
        <div className={classes.wrapper}>
            <TopPanel
                currentPage={currentPage}
                amount={amount}
                totalCount={orders.data.length}
                setCurrentPage={setCurrentPage}
            >
                <Search/>
                <SecondaryButton>За популярністю</SecondaryButton>
                <SecondaryButton>Фільтрувати</SecondaryButton>
            </TopPanel>
            {orders.loading ? <Preloader color='primary'/> : (
                <OrderTable displayedOrders={displayedOrders} handleClickEdit={handleClickEdit}/>
            )}
            {isOpenPopupEdit && (
                promocode.loading ? (
                    <Preloader color='secondary' cover={true}/>
                ) : (
                    <div className={classes.popupFix}>
                        <PopupAdmin>
                            {orderById.loading ? <Preloader cover={true} color='secondary'/> : (
                                <OrderEditContainer
                                    order={orderById.data}
                                    handleClose={() => setIsOpenPopupEdit(false)}
                                    promocodes={promocode.data}
                                />
                            )}
                        </PopupAdmin>
                    </div>
                )
            )}
            <BottomPanel
                currentPage={currentPage}
                amount={amount}
                totalCount={orders.data.length}
                setCurrentPage={setCurrentPage}
                setAmount={setAmount}
                amountTitle='Кількість показаних замовлень'
            />
        </div>
    );
};

export default OrderContainer;
