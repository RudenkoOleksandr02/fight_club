import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getModifiedFields} from "../../../../common/utils/getModifiedFields";
import EditableEntity from "../../../EditableEntity/EditableEntity";
import CharacteristicPopup from "../CharacteristicPopup/CharacteristicPopup";
import {
    addAdminCharacteristic,
    getAdminCharacteristicById, getCharacteristicDescsByTitle, getCharacteristicTitlesBySearchTerm,
    updateAdminCharacteristicById
} from "../../../../store/adminSlices/adminCharacteristicsSlice";

const EditCharacteristic = ({isOpenPopupEdit, setIsOpenPopupEdit}) => {
    const dispatch = useDispatch();
    const {
        characteristicDescs: {
            data: characteristicDescsData,
            loading: characteristicDescsLoading
        }
    } = useSelector(state => state.admin.adminCharacteristics);
    const {
        characteristic: {
            data: characteristicData,
            loading: characteristicLoading
        }
    } = useSelector(state => state.admin.adminCharacteristics);
    useEffect(() => {
        if (!!characteristicDescsData.length) {
            dispatch(getAdminCharacteristicById(characteristicDescsData[0].id))
        }
    }, [characteristicDescsData]);

    const [initialObject, setInitialObject] = useState({});
    useEffect(() => {
        if (characteristicData) {
            setInitialObject({
                characteristicTitle: characteristicData.title || '',
                characteristicDescs: characteristicDescsData || []
            });
        }
    }, [characteristicData]);

    const trackerFields = (obj = {}) => {
        return {
            characteristicDescs: obj.characteristicDescs
        }
    }
    const handleSave = async (prevDataForOnlyTrack, dataForOnlyTrack) => {
        const modifiedData = getModifiedFields(prevDataForOnlyTrack, dataForOnlyTrack);

        // ADD
        for (const item of modifiedData.characteristicDescs) {
            const id = String(item.id);

            if (id.split('-')[0] === 'new') {
                await dispatch(addAdminCharacteristic({title: characteristicData.title, desc: item.desc}))
            }
        }

        // UPDATE
        for (const item of modifiedData.characteristicDescs) {
            const id = String(item.id);

            if (!(id.split('-')[0] === 'new')) {
                await dispatch(updateAdminCharacteristicById(item.id, {title: characteristicData.title, desc: item.desc}))
            }
        }

        await dispatch(getCharacteristicDescsByTitle(characteristicData.title))
        await dispatch(getCharacteristicTitlesBySearchTerm(''))
    }

    return (
        <EditableEntity
            isOpenPopup={isOpenPopupEdit}
            setIsOpenPopup={setIsOpenPopupEdit}
            handleSave={handleSave}
            initialObject={initialObject}
            loading={characteristicDescsLoading || characteristicLoading}
            trackerFields={trackerFields}
            Component={CharacteristicPopup}
        />
    );
};

export default EditCharacteristic;