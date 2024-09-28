import React from 'react';
import classes from './LeftPanel.module.css'
import DieBlock from "../../../components/ui/blocks/DieBlock/DieBlock";
import contacts from "../../../data/contacts.json";

const LeftPanel = () => {
    return (
        <div className={classes.rightPanel}>
            <DieBlock>
                <h3>Телефон</h3>
                {contacts.phoneNumbers.map((number, index) => {
                    return <p key={index}>
                        {number}
                    </p>
                })}
            </DieBlock>
            <DieBlock>
                <h3>Пошта</h3>
                <p className={classes.email}>{contacts.mail}</p>
            </DieBlock>
            <DieBlock>
                <h3>Адреса</h3>
                <p>{contacts.address}</p>
            </DieBlock>
        </div>
    );
};

export default LeftPanel;