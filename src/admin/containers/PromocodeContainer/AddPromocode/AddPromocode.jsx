import React from 'react';
import { useDispatch } from 'react-redux';
import { getModifiedFields } from '../../../../common/utils/getModifiedFields';
import { addAdminPromocode, getAdminPromocodes } from '../../../../store/adminSlices/adminPromocodeSlice';
import EditableEntity from '../../../EditableEntity/EditableEntity';
import PromocodePopup from '../PromocodePopup/PromocodePopup';

const AddPromocode = ({ isOpenPopupAdd, setIsOpenPopupAdd }) => {
    const dispatch = useDispatch();
    const initialObject = {
        code: '',
        discount: 0,
        usageLeft: 0,
        expirationDate: ''
    };

    const trackerFields = (obj = {}) => ({
        code: obj.code,
        discount: obj.discount,
        usageLeft: obj.usageLeft,
        expirationDate: obj.expirationDate,
    });

    const handleSave = (prevDataForOnlyTrack, dataForOnlyTrack) => {
        const modifiedData = getModifiedFields(prevDataForOnlyTrack, dataForOnlyTrack);
        dispatch(addAdminPromocode(modifiedData))
            .then(() => dispatch(getAdminPromocodes()));
        setIsOpenPopupAdd(false);
    };

    return (
        <EditableEntity
            isOpenPopup={isOpenPopupAdd}
            setIsOpenPopup={setIsOpenPopupAdd}
            handleSave={handleSave}
            initialObject={initialObject}
            loading={false}
            trackerFields={trackerFields}
            Component={PromocodePopup}
        />
    );
};

export default AddPromocode;
