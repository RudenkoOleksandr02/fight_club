import React from 'react';
import classes from "./PurchaseHistory.module.css";

const PurchaseHistory = () => {
    return (
        <div className={classes.wrapper}>
            <h3>Історія покупок</h3>
            <div className={classes.history}>
                <p className={classes.absence}>Ви ще не здійснили жодної покупки.</p>
            </div>
        </div>
    );
};

export default PurchaseHistory;