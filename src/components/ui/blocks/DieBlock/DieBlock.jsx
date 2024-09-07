import React from 'react';
import classes from './DieBlock.module.css'

const DieBlock = ({children, title = ''}) => {
    return (
        <div className={classes.wrapper}>
            {title !== '' && <h3>{title}</h3>}
            <div className={classes.inner}>
                {children}
            </div>
        </div>
    );
};

export default DieBlock;