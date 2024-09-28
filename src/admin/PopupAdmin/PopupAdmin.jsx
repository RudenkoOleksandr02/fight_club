import React from 'react';
import Popup from "../../components/ui/Popup/Popup";

const PopupAdmin = ({children}) => {
    return (
        <Popup>{children}</Popup>
    );
};

export default PopupAdmin;