import React, {useEffect, useRef, useState} from 'react';
import {getModifiedFields} from "../../../../common/utils/getModifiedFields";
import Preloader from "../../../../components/ui/Preloader/Preloader";
import PopupAdmin from "../../../PopupAdmin/PopupAdmin";
import PopupForOrder from "../PopupForOrder/PopupForOrder";
import {getOrdersByAdminFilterPanel, updateOrderById} from "../../../../store/adminSlices/adminOrderSlice";
import {useDispatch, useSelector} from "react-redux";

const EditOrder = ({isOpenPopupEdit, setIsOpenPopupEdit, amount, currentPage}) => {
    const {order: {data: orderData, loading: orderLoading}} = useSelector(state => state.admin.adminOrder);
    const dispatch = useDispatch();

    const [orderDataForOnlyChange, setOrderDataForOnlyChange] = useState({});
    const [orderDataForOnlyTrack, setOrderDataForOnlyTrack] = useState({});
    const prevOrderDataForOnlyTrack = useRef({});
    const [isSaveButtonActive, setIsSaveButtonActive] = useState(false);

    console.log(orderData)

    // Обновление orderDataForOnlyChange и зачистка prevBlogDataForOnlyTrack.current
    useEffect(() => {
        if (orderData) {
            setOrderDataForOnlyChange({
                orderId: orderData.orderId || '',
                orderDate: orderData.orderDate || '',
                status: orderData.status || 0,
                username: orderData.username || '',
                surname: orderData.surname || '',
                email: orderData.email || '',
                phoneNumber: orderData.phoneNumber || '',
                city: orderData.city || '',
                departmentNumber: orderData.departmentNumber || '',
                promocodeId: orderData.promocodeId || '',
                discountFromCashback: orderData.discountFromCashback || 0,
                promocodeDiscount: orderData.promocodeDiscount || 0,
                productsDiscount: orderData.productsDiscount || 0,
                totalPrice: orderData.totalPrice || 0,
                totalDiscount: orderData.totalDiscount || 0,
                totalPriceWithDiscount: orderData.totalPriceWithDiscount || 0,
                products: orderData.products || [],
                dontCallMe: orderData.dontCallMe || false,
                ecoPackaging : orderData.ecoPackaging || false,
            });
        }

        prevOrderDataForOnlyTrack.current = {}
    }, [orderData]);

    // Обновление orderDataForOnlyTrack
    useEffect(() => {
        setOrderDataForOnlyTrack({
            status: orderDataForOnlyChange.status
        });
    }, [orderDataForOnlyChange]);

    // Обновление prevOrderDataForOnlyTrack.current
    useEffect(() => {
        if (!Object.keys(prevOrderDataForOnlyTrack.current).length
            && Object.keys(orderDataForOnlyTrack).every(key => orderDataForOnlyTrack[key] !== undefined)) {
            prevOrderDataForOnlyTrack.current = orderDataForOnlyTrack;
        }
    }, [orderDataForOnlyTrack]);

    // Проверка изменений и активация кнопки сохранения
    useEffect(() => {
        if (!!Object.keys(prevOrderDataForOnlyTrack.current).length) {
            const modifiedFields = getModifiedFields(prevOrderDataForOnlyTrack.current, orderDataForOnlyTrack);
            if (!Object.keys(modifiedFields).length) {
                setIsSaveButtonActive(false)
            } else {
                setIsSaveButtonActive(true)
            }
        }
    }, [orderDataForOnlyTrack]);

    const handleSave = () => {
        const modifiedData = getModifiedFields(prevOrderDataForOnlyTrack.current, orderDataForOnlyTrack);
        dispatch(updateOrderById(orderData.orderId, modifiedData))
            .then(() => dispatch(getOrdersByAdminFilterPanel({amount, start: (currentPage - 1) * amount})))
    }

    return (
        <>
            {isOpenPopupEdit && (
                orderLoading ? (
                    <Preloader color='secondary' cover={true}/>
                ) : (
                    <PopupAdmin>
                        <PopupForOrder
                            handleClose={() => setIsOpenPopupEdit(false)}
                            data={orderDataForOnlyChange}
                            setData={setOrderDataForOnlyChange}
                            isSaveButtonActive={isSaveButtonActive}
                            handleSave={handleSave}
                        />
                    </PopupAdmin>
                )
            )}
        </>
    );
};

export default EditOrder;
