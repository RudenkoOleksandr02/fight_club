import React from 'react';
import MainBlock from "./MainBlock/MainBlock";
import DieBlock from "./DieBlock/DieBlock";

const RightPanel = (props) => {
    return (
        <div>
            <MainBlock {...props}/>
            <DieBlock dieNumbers={props.dieNumbers}/>
        </div>
    );
};

export default RightPanel;