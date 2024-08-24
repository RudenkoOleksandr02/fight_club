import React from 'react';
import classes from './Die.module.css'

const Die = ({children, title = ''}) => {
    return (
        <div className={classes.wrapper}>
            {title !== '' && <h3>{title}</h3>}
            <div className={classes.inner}>
                {children}
            </div>
        </div>
    );
};

export default Die;