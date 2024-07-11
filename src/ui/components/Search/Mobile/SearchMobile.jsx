import React from 'react';
import classes from "./SearchMobile.module.css";
import {ReactComponent as IcoSearch} from "../../../../assets/images/header/ico_search.svg";

const SearchMobile = () => {
    return (
        <div className={classes.search}>
            <form className={classes.form}>
                <input type='text' placeholder='Пошук'/>
                <button className={classes.btnForm}>
                    <IcoSearch/>
                </button>
            </form>
        </div>
    );
};

export default SearchMobile;