import React from 'react';
import classes from './Table.module.css'

const Tr = ({children, templateColumns = 'repeat(auto-fit, minmax(40px, auto))'}) => {
    return (
        <div className={classes.tr} style={{gridTemplateColumns: templateColumns}}>
            {children}
        </div>
    );
};

export default Tr;