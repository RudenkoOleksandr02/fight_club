import React from 'react';
import EditContainer from "../../../EditContainer/EditContainer";
import classes from "./CharacteristicPopup.module.css";
import DieBlock from "../../../DieBlock/DieBlock";
import InputAdmin from "../../../Inputs/InputAdmin";
import Table from "../../../Table/Table";
import Tr from "../../../Table/Tr";
import Td from "../../../Table/Td";
import { ReactComponent as IcoDelete } from './../../../images/icoDelete.svg';
import IcoButton from "../../../buttons/IcoButton/IcoButton";
import { v4 as uuidv4 } from 'uuid';

const CharacteristicPopup = ({ handleClose, data, setData, handleSave, isSaveButtonActive, editMode}) => {
    const addCharacteristicOption = () => {
        setData(prevState => ({
            ...prevState,
            characteristicDescs: [
                ...(prevState.characteristicDescs || []),
                { description: '', id: 'new-' + uuidv4() }
            ]
        }));
    };

    const changeCharacteristicOption = (value, id) => {
        setData(prevState => ({
            ...prevState,
            characteristicDescs: prevState.characteristicDescs.map(characteristicDesc => {
                if (characteristicDesc.id === id) {
                    return {
                        ...characteristicDesc,
                        description: value
                    };
                } else {
                    return characteristicDesc;
                }
            })
        }));
    };

    const deleteCharacteristicOption = (id) => {
        setData(prevState => ({
            ...prevState,
            characteristicDescs: prevState.characteristicDescs.filter(characteristicDesc => characteristicDesc.id !== id)
        }));
    };

    const changeCharacteristicTitle = (value) => {
        setData(prevState => ({
            ...prevState,
            characteristicTitle: value
        }));
    };

    return (
        <EditContainer handleSave={handleSave} isDisabledSave={!isSaveButtonActive} handleClose={handleClose}>
            <div className={classes.wrapper}>
                <InputAdmin
                    placeholder="Характеристика"
                    value={data.characteristicTitle || ''}
                    onChange={e => changeCharacteristicTitle(e.target.value)}
                    disabled={editMode}
                />
                <DieBlock title="Опции" titleForBtn="Добавить опцию" handleClick={addCharacteristicOption}>
                    <Table>
                        {data.characteristicDescs && data.characteristicDescs.length > 0 ? (
                            data.characteristicDescs.map((desc) => (
                                <Tr key={desc.id} templateColumns="1fr 44px">
                                    <Td justifyContent="left">
                                        <input
                                            value={desc.description}
                                            onChange={e => changeCharacteristicOption(e.target.value, desc.id)}
                                            className={classes.inputOption}
                                        />
                                    </Td>
                                    <Td>
                                        <IcoButton
                                            svgIco={<IcoDelete />}
                                            onClick={() => deleteCharacteristicOption(desc.id)}
                                        />
                                    </Td>
                                </Tr>
                            ))
                        ) : (
                            <Tr>
                                <Td>Немає доступних опцій</Td>
                            </Tr>
                        )}
                    </Table>
                </DieBlock>
            </div>
        </EditContainer>
    );
};

export default CharacteristicPopup;
