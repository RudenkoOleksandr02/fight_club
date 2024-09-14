import React, {useEffect, useState} from 'react';
import classes from "./PopupForOrder.module.css";
import SelectButton from "../../../buttons/SelectButton/SelectButton";
import {returnStatusFromNumber} from "../../../../common/utils/returnStatusFromNumber";
import {formatDate} from "../../../../common/utils/formatDate";
import {formatTime} from "../../../../common/utils/formatTime";
import InputAdmin from "../../../Inputs/InputAdmin";
import Table from "../../../Table/Table";
import Tr from "../../../Table/Tr";
import Td from "../../../Table/Td";
import {roundNumber} from "../../../../common/utils/roundNumber";
import Checkbox from "../../../../components/ui/inputs/Checkbox/Checkbox";
import EditContainer from "../../../EditContainer/EditContainer";
import {useDispatch, useSelector} from "react-redux";
import {getPromocodeById} from "../../../../store/adminSlices/adminOrderSlice";

const PopupForOrder = ({handleSave, data, handleClose, setData, isSaveButtonActive}) => {
    const {promocode} = useSelector(state => state.admin.adminOrder);
    const dispatch = useDispatch();

    const [isOpenSelectStatusPopup, setIsOpenSelectStatusPopup] = useState(false);

    useEffect(() => {
        dispatch(getPromocodeById(data.promocodeId))
    }, [data.promocodeId]);

    const handleStatusChange = (newStatus) => {
        setData(prevState => ({...prevState, status: newStatus}));
        setIsOpenSelectStatusPopup(false);
    };
    const statusOptionsJSX = [0, 1, 2, 3, 4, 5, 6].map(statusNumber => (
        <button
            key={statusNumber}
            onClick={() => handleStatusChange(statusNumber)}
        >
            {returnStatusFromNumber(statusNumber)}
        </button>
    ));

    return (
        <EditContainer handleSave={handleSave} isDisabledSave={!isSaveButtonActive} handleClose={handleClose}>
            <div className={classes.editContainer}>
                <div className={classes.firstInformation}>
                    <span className={classes.orderId}>№{data.orderId}</span>
                    <div className={classes.statusAndTime}>
                        <SelectButton
                            title={returnStatusFromNumber(data.status)}
                            setIsOpenModal={setIsOpenSelectStatusPopup}
                            isOpenModal={isOpenSelectStatusPopup}
                            content={statusOptionsJSX}
                            modificationStyle={{
                                outlined: false,
                                fontSizeBtn: '24px',
                                fontWeightBtn: '600'
                            }}
                        />
                        <div className={classes.dateAndTime}>
                            <span>{formatDate(data.orderDate)}</span>
                            <span>{formatTime(data.orderDate)}</span>
                        </div>
                    </div>
                </div>
                <div className={classes.secondaryInformation}>
                    <InputAdmin value={data.username + ' ' + data.surname} placeholder='Замовник'
                                disabled={true}/>
                    <InputAdmin value={data.phoneNumber} placeholder='Телефон' disabled={true}/>
                    <InputAdmin value={data.email} placeholder='Почта' disabled={true}/>
                    <InputAdmin value={data.city} placeholder='Місто' disabled={true}/>
                    <InputAdmin value={data.departmentNumber} placeholder='Відділення' disabled={true}/>
                    <div className={classes.promo}>
                        <InputAdmin value={!!promocode.data.code ? promocode.data.code : 'Відсутній'}
                                    placeholder='Ідентифікатор промокоду'
                                    disabled={true}/>
                        <InputAdmin value={`${!!promocode.data.discount ? promocode.data.discount : 0}%`}
                                    placeholder='Знижка'
                                    disabled={true}/>
                    </div>
                </div>
                <div className={classes.products}>
                    <Table>
                        <Tr templateColumns='1fr 110px 160px 168px 130px 150px 160px'>
                            <Td justifyContent='left' fontWeight='700'>Назва товару</Td>
                            <Td fontWeight='700'>ID</Td>
                            <Td fontWeight='700'>Артикул</Td>
                            <Td fontWeight='700'>Варт. од. тов.</Td>
                            <Td fontWeight='700'>Кількість</Td>
                            <Td fontWeight='700'>Знижка</Td>
                            <Td fontWeight='700'>Сума</Td>
                        </Tr>
                        {data.products.map(product => (
                            <Tr key={product.productId} templateColumns='1fr 110px 160px 168px 130px 150px 160px'>
                                <Td justifyContent='left'>{product.productName}</Td>
                                <Td>{product.productId}</Td>
                                <Td>{product.article}</Td>
                                <Td>{product.unitPrice}</Td>
                                <Td>{product.quantity}</Td>
                                <Td>{roundNumber(product.discount)}%</Td>
                                <Td>{roundNumber(product.total)}</Td>
                            </Tr>
                        ))}
                    </Table>
                </div>
                <Table>
                    <Tr templateColumns='40px 1fr'>
                        <Td><Checkbox style='_' disabled={true} checked={!data.dontCallMe}/></Td>
                        <Td justifyContent='left'>Чекаю на дзвінок</Td>
                    </Tr>
                    <Tr templateColumns='40px 1fr'>
                        <Td><Checkbox style='_' disabled={true} checked={data.ecoPackaging}/></Td>
                        <Td justifyContent='left'>Екологічна упаковка</Td>
                    </Tr>
                </Table>
                <div className={classes.result}>
                    <p>Знижка від промокоду: <span>{roundNumber(data.promocodeDiscount)}</span></p>
                    <p>Знижка від продукції: <span>{roundNumber(data.productsDiscount)}</span></p>
                    <p>Загальна знижка: <span>{roundNumber(data.totalDiscount)}</span></p>
                    <p>Загальна ціна: <span>{roundNumber(data.totalPrice)}</span></p>
                    <p className={classes.totalPriceWithDiscount}>Загальна ціна зі
                        знижкою: <span>{roundNumber(data.totalPriceWithDiscount)}</span></p>
                </div>
            </div>
        </EditContainer>
    );
};

export default PopupForOrder;