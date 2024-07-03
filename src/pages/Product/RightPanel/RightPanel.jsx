import React from 'react';
import MainBlock from "./MainBlock/MainBlock";
import DeliveryBlock from "./DeliveryBlock/DeliveryBlock";

const RightPanel = (props) => {
    return (
        <div>
            <MainBlock {...props}/>
            <DeliveryBlock/>
        </div>
    );
};

export default RightPanel;