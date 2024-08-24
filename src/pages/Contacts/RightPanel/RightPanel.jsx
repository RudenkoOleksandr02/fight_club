import React from 'react';
import classes from './RightPanel.module.css'
import Die from "../../../components/ui/Die/Die";
import contacts from "../../../data/contacts.json";

const RightPanel = () => {
    return (
        <div className={classes.rightPanel}>
            <Die>
                <h3>Телефон</h3>
                {contacts.phoneNumbers.map((number, index) => {
                    return <p key={index}>
                        {number}
                    </p>
                })}
            </Die>
            <Die>
                <h3>Пошта</h3>
                <p>{contacts.mail}</p>
            </Die>
            <Die>
                <h3>Адреса</h3>
                <p>{contacts.address}</p>
            </Die>
        </div>
    );
};

export default RightPanel;