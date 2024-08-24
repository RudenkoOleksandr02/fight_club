import React from 'react';
import classes from './OrderContainer.module.css'
import {ReactComponent as IcoClose} from './../images/icoClose.svg';
import {returnStatusFromNumber} from "../../common/utils/returnStatusFromNumber";
import {formatDate} from "../../common/utils/formatDate";
import {formatTime} from "../../common/utils/formatTime";
import InputAdmin from "../Inputs/InputAdmin";
import Table from "../Table/Table";
import Tr from "../Table/Tr";
import Td from "../Table/Td";
import {roundNumber} from "../../common/utils/roundNumber";
import PrimaryButton from "../buttons/PrimaryButton/PrimaryButton";
import IcoButton from "../buttons/IcoButton/IcoButton";
import CheckboxAdmin from "../Inputs/CheckboxAdmin";

const OrderEditContainer = ({order, handleClose, promocodes}) => {
    return (
        <div className={classes.editContainer}>
            <div className={classes.close}>
                <IcoButton svgIco={<IcoClose/>} onClick={handleClose}/>
            </div>
            <div className={classes.mainInformation}>
                <span className={classes.orderId}>№{order.orderId}</span>
                <div className={classes.statusAndTime}>
                    <div className={classes.status}>{returnStatusFromNumber(order.status)}</div>
                    <div className={classes.dateAndTime}>
                        <span>{formatDate(order.orderDate)}</span>
                        <span>{formatTime(order.orderDate)}</span>
                    </div>
                </div>
            </div>
            <div className={classes.userInformation}>
                <InputAdmin value={order.username + ' ' + order.surname} placeholder='Замовник' disabled={true}/>
                <InputAdmin value={order.phoneNumber} placeholder='Телефон' disabled={true}/>
                <InputAdmin value={order.email} placeholder='Почта' disabled={true}/>
                <InputAdmin value={order.deliveryInfo.city} placeholder='Місто' disabled={true}/>
                <InputAdmin value={order.deliveryInfo.departmentNumber} placeholder='Відділення' disabled={true}/>
                <div className={classes.promo}>
                    <InputAdmin value={promocodes !== null ? promocodes.code : ''} placeholder='Ідентифікатор промокоду' disabled={true}/>
                    <InputAdmin value={promocodes !== null ? promocodes.discount + '%' : ''} placeholder='Знижка' disabled={true}/>
                </div>
            </div>
            <div className={classes.checkout}>
                <Table>
                    <Tr templateColumns='40px 1fr'>
                        <Td><input type='checkbox' disabled={true} checked={!order.dontCallMe}/></Td>
                        <Td justifyContent='left'>Чекаю на дзвінок</Td>
                    </Tr>
                    <Tr templateColumns='40px 1fr'>
                        <Td><CheckboxAdmin checked={order.ecoPackaging} disabled={true}/></Td>
                        <Td justifyContent='left'>Екологічна упаковка</Td>
                    </Tr>
                </Table>
            </div>
            <div className={classes.priceContainer}>
                <p>Знижка від товарної акції: <span>{roundNumber(order.discountFromProductAction)}</span></p>
                <p>Знижка від промокоду: <span>{roundNumber(order.discountFromPromocode)}</span></p>
                <p>Загальна знижка: <span>{roundNumber(order.totalDiscount)}</span></p>
                <p>Загальна ціна: <span>{roundNumber(order.totalPrice)}</span></p>
                <p className={classes.totalPriceWithDiscount}>Загальна ціна зі знижкою: <span>{roundNumber(order.totalPriceWithDiscount)}</span>
                </p>
            </div>
            <div className={classes.save}>
                <PrimaryButton>Зберегти зміни</PrimaryButton>
            </div>
        </div>
    );
};

export default OrderEditContainer;