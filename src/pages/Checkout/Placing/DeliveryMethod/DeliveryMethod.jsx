import React from 'react';
import Die from "../../../../components/ui/Die/Die";
import NovaPoshta from "../../../../components/containers/NovaPoshta/NovaPoshta";

const DeliveryMethod = ({handleSetDeliveryInfo, errors}) => {
    return (
        <Die title='Спосіб доставки'>
            <NovaPoshta handleSetDeliveryInfo={handleSetDeliveryInfo} errorsCity={errors.city} errorsDepartment={errors.department} />
        </Die>
    );
};

export default DeliveryMethod;