import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {getModifiedFields} from "../../../../common/utils/getModifiedFields";
import {
    addAdminCharacteristic
} from "../../../../store/adminSlices/adminCharacteristicsSlice";
import EditableEntity from "../../../EditableEntity/EditableEntity";
import CharacteristicPopup from "../CharacteristicPopup/CharacteristicPopup";

const AddCharacteristic = ({isOpenPopupAdd, setIsOpenPopupAdd}) => {
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        const modifiedData = getModifiedFields(prevDataForOnlyTrack, dataForOnlyTrack);

        // ADD
        for (const item of modifiedData.characteristicDescs) {
            const id = String(item.id);

            if (id.split('-')[0] === 'new') {
                await dispatch(addAdminCharacteristic({title: modifiedData.characteristicTitle, desc: item.description}))
            }
        }

        setIsOpenPopupAdd(false)
        setLoading(false);
    }

    return (
        <EditableEntity
            isOpenPopup={isOpenPopupAdd}
            setIsOpenPopup={setIsOpenPopupAdd}
            handleSave={handleSave}
            initialObject={initialObject}
            loading={loading}
            trackerFields={trackerFields}
            Component={CharacteristicPopup}
        />
    );
};

export default AddCharacteristic;