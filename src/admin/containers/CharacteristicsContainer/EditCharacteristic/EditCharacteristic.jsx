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

    const [showedPreloader, setShowedPreloader] = useState(false);

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
        setShowedPreloader(true);
        try {
            const modifiedData = getModifiedFields(prevDataForOnlyTrack, dataForOnlyTrack);

            // ADD
            for (const item of modifiedData.characteristicDescs) {
                const id = String(item.id);
                if (id.startsWith('new')) {
                    await dispatch(addAdminCharacteristic({ title: dataForOnlyTrack.characteristicTitle, desc: item.desc }));
                }
            }

            // UPDATE
            for (const item of modifiedData.characteristicDescs) {
                const id = String(item.id);
                if (!id.startsWith('new')) {
                    await dispatch(updateAdminCharacteristicById(item.id, { title: dataForOnlyTrack.characteristicTitle, desc: item.desc }));
                }
            }

            await dispatch(getCharacteristicDescsByTitle(dataForOnlyTrack.characteristicTitle));
            await dispatch(getCharacteristicTitlesBySearchTerm(''));
        } catch (error) {
            console.error('Ошибка при сохранении характеристик:', error);
        } finally {
            setShowedPreloader(false);
        }
    }

    return (
        <EditableEntity
            isOpenPopup={isOpenPopupEdit}
            setIsOpenPopup={setIsOpenPopupEdit}
            handleSave={handleSave}
            initialObject={initialObject}
            loading={showedPreloader}
            trackerFields={trackerFields}
            Component={CharacteristicPopup}
        />
    );
};

export default EditCharacteristic;