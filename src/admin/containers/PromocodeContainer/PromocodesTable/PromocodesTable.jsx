import React from 'react';
import Tr from '../../../Table/Tr';
import Td from '../../../Table/Td';
import classes from './PromocodesTable.module.css';
import IcoButton from '../../../buttons/IcoButton/IcoButton';
import Table from '../../../Table/Table';
import { ReactComponent as IcoEdit } from './../../../images/icoEdit.svg';
import { ReactComponent as IcoDelete } from './../../../images/icoDelete.svg';

const PromocodesTable = ({ promocodesData, handleClickEdit }) => {
    return (
        <Table>
            <Tr templateColumns="1fr 130px">
                <Td fontWeight="600" justifyContent="left">Промокод</Td>
                <Td fontWeight="600">Дії</Td>
            </Tr>
            {promocodesData.map(promocode => (
                <Tr key={promocode.promocodeId} templateColumns="1fr 130px">
                    <Td justifyContent="left">{promocode.code}</Td>
                    <Td>
                        <div className={classes.icoBtns}>
                            <IcoButton svgIco={<IcoEdit />} onClick={() => handleClickEdit(promocode.promocodeId)} />
                            <IcoButton svgIco={<IcoDelete />} />
                        </div>
                    </Td>
                </Tr>
            ))}
        </Table>
    );
};

export default PromocodesTable;
