import React from 'react';
import classes from './Table.module.css'

const Td = ({children, justifyContent = 'center', fontWeight = '400'}) => {
    return (
        <div className={classes.td}
             style={{
                 justifyContent: justifyContent,
                 fontWeight: fontWeight
             }}>
            {children}
        </div>
    );
};

export default Td;