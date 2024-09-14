import React from 'react';
import Tr from "../../../Table/Tr";
import Td from "../../../Table/Td";
import classes from "./BrandsTable.module.css";
import IcoButton from "../../../buttons/IcoButton/IcoButton";
import Table from "../../../Table/Table";
import {ReactComponent as IcoEdit} from './../../../images/icoEdit.svg';
import {ReactComponent as IcoDelete} from './../../../images/icoDelete.svg';

const BrandsTable = ({brandsData, handleClickEdit}) => {
    return (
        <Table>
            <Tr templateColumns='1fr 130px'>
                <Td fontWeight='600' justifyContent='left'>Заголовок бренда</Td>
                <Td fontWeight='600'>Дії</Td>
            </Tr>
            {brandsData.map(brand => (
                <Tr key={brand.brandId} templateColumns='1fr 130px'>
                    <Td justifyContent='left'>{brand.title}</Td>
                    <Td>
                        <div className={classes.icoBtns}>
                            <IcoButton svgIco={<IcoEdit/>} onClick={() => handleClickEdit(brand.brandId)}/>
                            <IcoButton svgIco={<IcoDelete/>}/>
                        </div>
                    </Td>
                </Tr>
            ))}
        </Table>
    );
};

export default BrandsTable;