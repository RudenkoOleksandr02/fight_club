import React from 'react';
import EditContainer from '../../../EditContainer/EditContainer';
import InputAdmin from '../../../Inputs/InputAdmin';

const PromocodePopup = ({ handleClose, data, setData, handleSave, isSaveButtonActive }) => {
    const handleChangeInput = (key, value) => {
        setData(prevState => ({ ...prevState, [key]: value }));
    };

    return (
        <EditContainer handleSave={handleSave} isDisabledSave={!isSaveButtonActive} handleClose={handleClose}>
            <InputAdmin
                placeholder="Код"
                value={data.code}
                onChange={(e) => handleChangeInput('code', e.target.value)}
            />
            <InputAdmin
                placeholder="Знижка"
                type="number"
                value={data.discount}
                onChange={(e) => handleChangeInput('discount', e.target.value)}
            />
            <InputAdmin
                placeholder="Кількість"
                type="number"
                value={data.usageLeft}
                onChange={(e) => handleChangeInput('usageLeft', e.target.value)}
            />
            <InputAdmin
                placeholder="Термін придатності"
                type="datetime-local"
                value={data.expirationDate ? data.expirationDate.slice(0, 16) : ''}
                onChange={(e) => handleChangeInput('expirationDate', e.target.value)}
            />
        </EditContainer>
    );
};

export default PromocodePopup;
