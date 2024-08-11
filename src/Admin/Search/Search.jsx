import React from 'react';
import classes from './Search.module.css'
import {ReactComponent as IcoSearch} from './../images/search.svg'

const Search = () => {
    return (
        <div className={classes.search}>
            <IcoSearch/>
        </div>
    );
};

export default Search;