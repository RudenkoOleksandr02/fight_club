import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getModifiedFields } from '../../../../common/utils/getModifiedFields';
import { getAdminPromocodes, updateAdminPromocodeById } from '../../../../store/adminSlices/adminPromocodeSlice';
import EditableEntity from '../../../EditableEntity/EditableEntity';
import PromocodePopup from '../PromocodePopup/PromocodePopup';

const EditPromocode = ({ isOpenPopupEdit, setIsOpenPopupEdit }) => {
    const dispatch = useDispatch();
    const { promocode: { data: promocodeData, loading: promocodeLoading } } = useSelector(state => state.admin.adminPromocode);

    const [initialObject, setInitialObject] = useState({});
    useEffect(() => {
        if (promocodeData) {
            setInitialObject({
                code: promocodeData.code || '',
                discount: promocodeData.discount || 0,
                usageLeft: promocodeData.usageLeft || 0,
                expirationDate: promocodeData.expirationDate || '',
            });
        }
    }, [promocodeData]);

    const trackerFields = (obj = {}) => ({
        code: obj.code,
        discount: obj.discount,
        usageLeft: obj.usageLeft,
        expirationDate: obj.expirationDate,
    });

    const handleSave = (prevDataForOnlyTrack, dataForOnlyTrack) => {
        const modifiedData = getModifiedFields(prevDataForOnlyTrack, dataForOnlyTrack);
        dispatch(updateAdminPromocodeById(promocodeData.promocodeId, modifiedData))
            .then(() => dispatch(getAdminPromocodes()));
    };

    return (
        <EditableEntity
            isOpenPopup={isOpenPopupEdit}
            setIsOpenPopup={setIsOpenPopupEdit}
            handleSave={handleSave}
            initialObject={initialObject}
            loading={promocodeLoading}
            trackerFields={trackerFields}
            Component={PromocodePopup}
        />
    );
};

export default EditPromocode;
