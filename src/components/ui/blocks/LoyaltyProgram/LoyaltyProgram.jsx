import React, { useState } from 'react';
import classes from "./LoyaltyProgram.module.css";
import loyaltyProgram from "../../../../data/loyaltyProgram.json";
import { ReactComponent as IcoMessage } from "../../../../assets/images/ico_message.svg";

const LoyaltyProgram = () => {
    const [activeMessageId, setActiveMessageId] = useState(1);

    const handleMouseEnter = (id) => {
        setActiveMessageId(id);
    };
    const handleMouseLeave = () => {
        setActiveMessageId(null);
    };
    const handleClick = (id) => {
        setActiveMessageId(id);
    };

    return (
        <div className={classes.wrapper}>
            <h3>Програма лояльності</h3>
            {loyaltyProgram.map(item => (
                <div
                    className={classes.item}
                    key={item.id}
                    onClick={() => handleClick(item.id)}
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                >
                    <span>{item.title}</span>
                    <div
                        className={classes.icoMessage}
                        tabIndex="0"
                        aria-label={`Показати повідомлення для ${item.title}`}
                    >
                        <IcoMessage />
                    </div>
                    {activeMessageId === item.id && (
                        <div className={classes.message}>
                            {item.message}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default LoyaltyProgram;
