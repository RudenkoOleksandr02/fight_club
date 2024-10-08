import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { getModifiedFields } from "../../../../common/utils/getModifiedFields";
import EditableEntity from "../../../EditableEntity/EditableEntity";
import CharacteristicPopup from "../CharacteristicPopup/CharacteristicPopup";
import {
    addAdminCharacteristic,
    deleteCharacteristicById,
    getAdminCharacteristics,
    updateAdminCharacteristicById
} from "../../../../store/adminSlices/adminCharacteristicsSlice";

const EditCharacteristic = ({ isOpenPopupEdit, setIsOpenPopupEdit, currentTitle, characteristicsData }) => {
    const dispatch = useDispatch();
    const [initialObject, setInitialObject] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (characteristicsData) {
            const currentCharacteristic = characteristicsData.find(item => item.title === currentTitle);
            setInitialObject({
                characteristicTitle: currentCharacteristic?.title || '',
                characteristicDescs: currentCharacteristic?.descriptionsWithIds || []
            });
        }
    }, [characteristicsData, currentTitle]);

    const trackerFields = (obj = {}) => {
        return {
            characteristicDescs: obj.characteristicDescs
        };
    };

    const handleSave = async (prevDataForOnlyTrack, dataForOnlyTrack) => {
        try {
            setLoading(true);
            const modifiedData = getModifiedFields(prevDataForOnlyTrack, dataForOnlyTrack);

            const modifiedDescs = modifiedData.characteristicDescs || [];
            const prevDescs = prevDataForOnlyTrack.characteristicDescs || [];

            const modifiedDataIds = new Set(modifiedDescs.map(item => String(item.id)));

            // ADD
            const addPromises = modifiedDescs
                .filter(item => String(item.id).startsWith('new'))
                .map(item => dispatch(addAdminCharacteristic({
                    title: initialObject.characteristicTitle,
                    desc: item.description
                })));
            await Promise.all(addPromises);

            // UPDATE
            const updatePromises = modifiedDescs
                .filter(item => !String(item.id).startsWith('new'))
                .map(item => dispatch(updateAdminCharacteristicById(item.id, {
                    title: initialObject.characteristicTitle,
                    desc: item.description
                })));
            await Promise.all(updatePromises);

            // DELETE
            const prevDataIds = new Set(prevDescs.map(item => String(item.id)));
            const deletedIds = [...prevDataIds].filter(id => !modifiedDataIds.has(id));
            const deletePromises = deletedIds
                .filter(id => !id.startsWith('new'))
                .map(id => dispatch(deleteCharacteristicById(id)));
            await Promise.all(deletePromises);

            await dispatch(getAdminCharacteristics());
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Ошибка при сохранении характеристик:', error);
        }
    };

    return (
        <EditableEntity
            isOpenPopup={isOpenPopupEdit}
            setIsOpenPopup={setIsOpenPopupEdit}
            handleSave={handleSave}
            initialObject={initialObject}
            loading={loading}
            trackerFields={trackerFields}
            Component={CharacteristicPopup}
            editMode={true}
        />
    );
};

export default EditCharacteristic;
