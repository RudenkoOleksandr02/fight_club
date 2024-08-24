import React from 'react';
import classes from './LeftPanel.module.css';

const LeftPanel = ({children, isOpen}) => {
    return (
        <div className={`${classes.wrapper} ${isOpen ? classes.isOpen : ''}`}>
            {children}
        </div>
    );
};

export default LeftPanel;