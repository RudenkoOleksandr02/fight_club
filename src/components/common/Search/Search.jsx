import React, {useState} from 'react';
import classes from './Search.module.css'
import {ReactComponent as IcoSearch} from "../../../assets/images/ico_search.svg";
import Modal from "../../UI/Modal/Modal";

const Search = () => {
    const [isActive, setIsActive] = useState(false);

    return <div className={classes.search}>
        <button className={classes.btn} onClick={() => setIsActive(true)}>
            <IcoSearch/>
        </button>
        <Modal active={isActive} setActive={setIsActive}>
            <form className={classes.form}>
                <button className={classes.btnForm}>
                    <IcoSearch/>
                </button>
                <input type='text' placeholder='Поиск' autoFocus={true}/>
            </form>
        </Modal>
    </div>
};

export default Search;