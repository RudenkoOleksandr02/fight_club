import React from 'react';
import DieBlock from "../../../../components/ui/blocks/DieBlock/DieBlock";
import NovaPoshta from "../../../../components/containers/NovaPoshta/NovaPoshta";

const DeliveryMethod = ({handleSetDeliveryInfo, errors}) => {
    return (
        <DieBlock title='Спосіб доставки'>
            <NovaPoshta handleSetDeliveryInfo={handleSetDeliveryInfo} errorsCity={errors.city} errorsDepartment={errors.department} />
        </DieBlock>
    );
};

export default DeliveryMethod;