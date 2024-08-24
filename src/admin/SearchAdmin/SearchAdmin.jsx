import React from 'react';
import classes from './SearchAdmin.module.css'
import {ReactComponent as IcoSearch} from './../images/search.svg'
import {ReactComponent as IcoClose} from './../images/icoClose.svg'

const SearchAdmin = ({isOpen, onClose, onOpen, value, handleChange}) => {
    return (
        <div className={classes.search}>
            <button onClick={onOpen}><IcoSearch/></button>
            <div className={`${classes.field} ${isOpen ? classes.isOpen : ''}`}>
                <input placeholder='Пошук' autoFocus={true} value={value} onChange={handleChange}/>
                <button onClick={onClose}><IcoClose/></button>
            </div>
        </div>
    );
};

export default SearchAdmin;