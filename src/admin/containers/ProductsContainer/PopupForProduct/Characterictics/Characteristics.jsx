import React, {useEffect, useState} from 'react';
import classes from "./Characterictics.module.css";
import AddCharacteristicsTitle from "./AddCharacteristicsTitle";
import AddCharacteristicsDesc from "./AddCharacteristicsDesc";
import {ReactComponent as IcoDelete} from './../../../../images/icoDelete.svg';
import Table from "../../../../Table/Table";
import Tr from "../../../../Table/Tr";
import Td from "../../../../Table/Td";
import IcoButton from "../../../../buttons/IcoButton/IcoButton";
import DieBlock from "../../../../DieBlock/DieBlock";

const Characteristics = ({productData, setProductData}) => {
    const [characteristics, setCharacteristics] = useState([]); // [{characteristicId, title, desc}]
    useEffect(() => {
        if (Array.isArray(productData?.characteristics)) {
            setCharacteristics(productData.characteristics.map(characteristic => ({
                characteristicId: characteristic?.characteristicId,
                title: characteristic?.title,
                desc: characteristic?.desc
            })));
        }
    }, [productData]);
    const handleSaveCharacteristics = (characteristic) => {
        setProductData(prevState => ({...prevState, characteristics: [...prevState.characteristics, characteristic]}))
    }
    const handleDellCharacteristics = (characteristicId) => {
        const updatedCharacteristics = characteristics.filter(characteristic => characteristic.characteristicId !== characteristicId);
        setCharacteristics(updatedCharacteristics);
        setProductData(prevState => ({
            ...prevState, characteristics: updatedCharacteristics
        }));
    };

    return (
        <div className={classes.wrapper}>
            <DieBlock title='Характеристики' withoutButton={true}>
                <AddCharacteristicsTitle setCharacteristics={setCharacteristics}/>
                <Table>
                    {!!characteristics.length ? characteristics.map((characteristic) => (
                        <Tr key={characteristic.characteristicId} templateColumns='360px 1fr 44px'>
                            <Td justifyContent='left'>{characteristic.title}</Td>
                            <Td justifyContent='left'>
                                <AddCharacteristicsDesc
                                    characteristic={characteristic}
                                    setCharacteristics={setCharacteristics}
                                    characteristics={characteristics}
                                    handleSaveCharacteristics={handleSaveCharacteristics}
                                />
                            </Td>
                            <Td>
                                <IcoButton svgIco={<IcoDelete/>}
                                           onClick={() => handleDellCharacteristics(characteristic.characteristicId)}
                                />
                            </Td>
                        </Tr>
                    )) : 'Беззмістовний'}
                </Table>
            </DieBlock>
        </div>
    );
};

export default Characteristics;

