import React from 'react';
import Tr from "../../../Table/Tr";
import Td from "../../../Table/Td";
import classes from "./BannersTable.module.css";
import IcoButton from "../../../buttons/IcoButton/IcoButton";
import Table from "../../../Table/Table";
import {ReactComponent as IcoEdit} from './../../../images/icoEdit.svg';
import {ReactComponent as IcoDelete} from './../../../images/icoDelete.svg';

const BannersTable = ({bannersData, handleClickEdit}) => {
    return (
        <Table>
            <Tr templateColumns='1fr 130px'>
                <Td fontWeight='600' justifyContent='left'>Заголовок баннера</Td>
                <Td fontWeight='600'>Дії</Td>
            </Tr>
            {bannersData.map(banner => (
                <Tr key={banner.bannerId} templateColumns='1fr 130px'>
                    <Td justifyContent='left'>{banner.title}</Td>
                    <Td>
                        <div className={classes.icoBtns}>
                            <IcoButton svgIco={<IcoEdit/>} onClick={() => handleClickEdit(banner.bannerId)}/>
                            <IcoButton svgIco={<IcoDelete/>}/>
                        </div>
                    </Td>
                </Tr>
            ))}
        </Table>
    );
};

export default BannersTable;