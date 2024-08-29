import React, {useState} from 'react';
import classes from './OrderContainer.module.css';
import {ReactComponent as IcoClose} from './../images/icoClose.svg';
import {returnStatusFromNumber} from "../../common/utils/returnStatusFromNumber";
import {formatDate} from "../../common/utils/formatDate";
import {formatTime} from "../../common/utils/formatTime";
import InputAdmin from "../Inputs/InputAdmin";
import Table from "../Table/Table";
import Tr from "../Table/Tr";
import Td from "../Table/Td";
import {roundNumber} from "../../common/utils/roundNumber";
import IcoButton from "../buttons/IcoButton/IcoButton";
import {useDispatch} from "react-redux";
import {getOrderById, getOrders, updateOrderById} from "../../store/adminSlice";
import SelectButton from "../buttons/SelectButton/SelectButton";
import Checkbox from "../../components/ui/inputs/Checkbox/Checkbox";
import EditContainer from "../EditContainer/EditContainer";

const OrderEditContainer = ({orderData, handleClose, promocodes}) => {
    const dispatch = useDispatch()
    const [status, setStatus] = useState(orderData.status);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        setIsDropdownOpen(false);
    };
    const handleSave = (orderId, status) => {
        dispatch(updateOrderById(orderId, {status: status}))
            .then(() => dispatch(getOrderById(orderId)))
            .then(() => dispatch(getOrders()))
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
        <EditContainer handleSave={() => handleSave(orderData.orderId, status)} isDisabledBtn={status === orderData.status}>
            <div className={classes.editContainer}>
                <div className={classes.close}>
                    <IcoButton svgIco={<IcoClose/>} onClick={handleClose}/>
                </div>
                <div className={classes.firstInformation}>
                    <span className={classes.orderId}>№{orderData.orderId}</span>
                    <div className={classes.statusAndTime}>
                        <SelectButton
                            title={returnStatusFromNumber(status)}
                            setIsOpenModal={setIsDropdownOpen}
                            isOpenModal={isDropdownOpen}
                            content={statusOptionsJSX}
                            modificationStyle={{
                                outlined: false,
                                fontSizeBtn: '24px',
                                fontWeightBtn: '600'
                            }}
                        />
                        <div className={classes.dateAndTime}>
                            <span>{formatDate(orderData.orderDate)}</span>
                            <span>{formatTime(orderData.orderDate)}</span>
                        </div>
                    </div>
                </div>
                <div className={classes.secondaryInformation}>
                    <InputAdmin value={orderData.username + ' ' + orderData.surname} placeholder='Замовник'
                                disabled={true}/>
                    <InputAdmin value={orderData.phoneNumber} placeholder='Телефон' disabled={true}/>
                    <InputAdmin value={orderData.email} placeholder='Почта' disabled={true}/>
                    <InputAdmin value={orderData.city} placeholder='Місто' disabled={true}/>
                    <InputAdmin value={orderData.departmentNumber} placeholder='Відділення' disabled={true}/>
                    <div className={classes.promo}>
                        <InputAdmin value={!!promocodes.length ? promocodes.code : 'Відсутній'}
                                    placeholder='Ідентифікатор промокоду'
                                    disabled={true}/>
                        <InputAdmin value={`${!!promocodes.length ? promocodes.discount : 0}%`} placeholder='Знижка'
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
                        {orderData.products.map(product => (
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
                        <Td><Checkbox style='_' disabled={true} checked={!orderData.dontCallMe}/></Td>
                        <Td justifyContent='left'>Чекаю на дзвінок</Td>
                    </Tr>
                    <Tr templateColumns='40px 1fr'>
                        <Td><Checkbox style='_' disabled={true} checked={orderData.ecoPackaging}/></Td>
                        <Td justifyContent='left'>Екологічна упаковка</Td>
                    </Tr>
                </Table>
                <div className={classes.result}>
                    <p>Знижка від промокоду: <span>{roundNumber(orderData.promocodeDiscount)}</span></p>
                    <p>Загальна знижка: <span>{roundNumber(orderData.totalDiscount)}</span></p>
                    <p>Загальна ціна: <span>{roundNumber(orderData.totalPrice)}</span></p>
                    <p className={classes.totalPriceWithDiscount}>Загальна ціна зі
                        знижкою: <span>{roundNumber(orderData.totalPriceWithDiscount)}</span></p>
                </div>
            </div>
        </EditContainer>
    );
};

export default OrderEditContainer;
