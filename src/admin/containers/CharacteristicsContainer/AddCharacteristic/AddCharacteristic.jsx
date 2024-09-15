import React from 'react';
import {useDispatch} from "react-redux";
import {getModifiedFields} from "../../../../common/utils/getModifiedFields";
import {
    addAdminCharacteristic,
    getCharacteristicTitlesBySearchTerm
} from "../../../../store/adminSlices/adminCharacteristicsSlice";
import EditableEntity from "../../../EditableEntity/EditableEntity";
import CharacteristicPopup from "../CharacteristicPopup/CharacteristicPopup";

const AddCharacteristic = ({isOpenPopupAdd, setIsOpenPopupAdd}) => {
    const dispatch = useDispatch();
    const initialObject = {
        characteristicTitle: '',
        characteristicDescs: []
    }
    const trackerFields = (obj = {}) => {
        return {
            characteristicTitle: obj.characteristicTitle,
            characteristicDescs: obj.characteristicDescs
        }
    }

    const handleSave = async (prevDataForOnlyTrack, dataForOnlyTrack) => {
        const modifiedData = getModifiedFields(prevDataForOnlyTrack, dataForOnlyTrack);

        // ADD
        for (const item of modifiedData.characteristicDescs) {
            const id = String(item.id);


            if (id.split('-')[0] === 'new') {
                await dispatch(addAdminCharacteristic({title: modifiedData.characteristicTitle, desc: item.desc}))
            }
        }

        await dispatch(getCharacteristicTitlesBySearchTerm(''))
        setIsOpenPopupAdd(false)
    }

    return (
        <EditableEntity
            isOpenPopup={isOpenPopupAdd}
            setIsOpenPopup={setIsOpenPopupAdd}
            handleSave={handleSave}
            initialObject={initialObject}
            loading={false}
            trackerFields={trackerFields}
            Component={CharacteristicPopup}
        />
    );
};

export default AddCharacteristic;