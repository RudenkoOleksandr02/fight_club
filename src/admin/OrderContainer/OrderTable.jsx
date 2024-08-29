import React from 'react';
import Table from "../Table/Table";
import Tr from "../Table/Tr";
import Td from "../Table/Td";
import {ReactComponent as IcoDelete} from './../images/icoDelete.svg';
import {ReactComponent as IcoEdit} from './../images/icoEdit.svg';
import {ReactComponent as IcoPhone} from './../images/icoPhone.svg';
import classes from "./OrderContainer.module.css";
import {returnStatusFromNumber} from "../../common/utils/returnStatusFromNumber";
import {formatDate} from "../../common/utils/formatDate";
import {roundNumber} from "../../common/utils/roundNumber";
import IcoButton from "../buttons/IcoButton/IcoButton";

const OrderTable = ({displayedOrders, handleClickEdit}) => {
    return (
        <Table>
            <Tr templateColumns='1fr 120px 251px 109px 170px 131px'>
                <Td justifyContent='left'>Номер</Td>
                <Td>Дата</Td>
                <Td>Адреса</Td>
                <Td>Ціна</Td>
                <Td>Статус</Td>
                <Td fontWeight='700'>Дії</Td>
            </Tr>
            {displayedOrders.map(order => (
                <Tr key={order.orderId} templateColumns='1fr 120px 251px 109px 170px 131px'>
                    <Td justifyContent='left'>
                        <div className={classes.orderIdAndPhone}>
                            <span>{order.orderId}</span>
                            <button className={classes.phoneButt}><IcoPhone/></button>
                        </div>
                    </Td>
                    <Td>{formatDate(order.orderDate)}</Td>
                    <Td>{order.deliveryInfo.city}</Td>
                    <Td>{roundNumber(order.totalPriceWithDiscount)}</Td>
                    <Td>{returnStatusFromNumber(order.status)}</Td>
                    <Td>
                        <div className={classes.icoBtns}>
                            <IcoButton svgIco={<IcoEdit/>} onClick={() => handleClickEdit(order.orderId)}/>
                            <IcoButton svgIco={<IcoDelete/>}/>
                        </div>
                    </Td>
                </Tr>
            ))}
        </Table>
    );
};

export default OrderTable;