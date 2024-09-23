import React, {useEffect, useState} from 'react';
import classes from './SearchDesktop.module.css'
import {ReactComponent as IcoSearch} from "../../../../assets/images/header/ico_search.svg";
import Modal from "./Modal/Modal";
import {useDispatch, useSelector} from "react-redux";
import {getSearchByQuery} from "../../../../store/searchSlice";
import ListItem from "../ListItem/ListItem";

const SearchDesktop = () => {
    const searchData = useSelector(state => state.search.searchData);
    const dispatch = useDispatch();
    const [isActive, setIsActive] = useState(false);
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (query) {
            dispatch(getSearchByQuery(query))
        }
    }, [query])

    return <div>
        <button className={classes.btn} onClick={() => setIsActive(true)}>
            <IcoSearch/>
        </button>
        <Modal active={isActive} setActive={setIsActive}>
            <form className={classes.form}>
                <button className={classes.btnForm}>
                    <IcoSearch/>
                </button>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    type='text'
                    placeholder='Пошук'
                    autoFocus={true}
                />
            </form>
            {searchData.length !== 0
                && query !== ""
                && <ListItem searchData={searchData} onClose={() => setIsActive(false)}/>}
        </Modal>
    </div>
};

export default SearchDesktop;