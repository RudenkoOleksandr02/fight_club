import React from 'react';
import classes from './Table.module.css'

const Td = ({children, justifyContent = 'center'}) => {
    return (
        <div className={classes.td}
             style={{
                 justifyContent: justifyContent
             }}>
            {children}
        </div>
    );
};

export default Td;