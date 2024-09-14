import React from 'react';
import classes from './CharacteristicsTable.module.css'
import Tr from "../../../Table/Tr";
import Td from "../../../Table/Td";
import IcoButton from "../../../buttons/IcoButton/IcoButton";
import Table from "../../../Table/Table";
import {ReactComponent as IcoEdit} from './../../../images/icoEdit.svg';
import {ReactComponent as IcoDelete} from './../../../images/icoDelete.svg';
import {v4 as uuidv4} from 'uuid';

const CharacteristicsTable = ({characteristicsData, handleClickEdit}) => {
    return (
        <Table>
            <Tr templateColumns='1fr 130px'>
                <Td fontWeight='600' justifyContent='left'>Назва характеристики</Td>
                <Td fontWeight='600'>Дії</Td>
            </Tr>
            {characteristicsData.map(characteristic => (
                <Tr key={uuidv4()} templateColumns='1fr 130px'>
                    <Td justifyContent='left'>{characteristic}</Td>
                    <Td>
                        <div className={classes.icoBtns}>
                            <IcoButton svgIco={<IcoEdit/>}
                                       onClick={() => handleClickEdit(characteristic)}/>
                            <IcoButton svgIco={<IcoDelete/>}/>
                        </div>
                    </Td>
                </Tr>
            ))}
        </Table>
    );
};

export default CharacteristicsTable;
