import React, {useEffect, useState} from 'react';
import classes from "./SearchMobile.module.css";
import {ReactComponent as IcoSearch} from "../../../../assets/images/header/ico_search.svg";
import {getSearchByQuery} from "../../../../store/searchSlice";
import {useDispatch, useSelector} from "react-redux";
import ListItem from "../ListItem/ListItem";

const SearchMobile = ({setOpen}) => {
    const searchData = useSelector(state => state.search.searchData);
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (query) {
            dispatch(getSearchByQuery(query))
        }
    }, [query])

    return (
        <div className={classes.search}>
            <form className={classes.form}>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    type='text'
                    placeholder='Пошук'
                />
                <button className={classes.btnForm}>
                    <IcoSearch/>
                </button>
            </form>
            {searchData.length !== 0
                && query !== ""
                && <ListItem searchData={searchData} onClose={() => setOpen(false)}/>}
        </div>
    );
};

export default SearchMobile;