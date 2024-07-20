import React from 'react';
import classes from './ListItem.module.css'
import Item from "./Item/Item";
import {v4 as uuidv4} from 'uuid'

const ListItem = ({searchData, onClose}) => {
    const searchDataJSX = searchData.map(data => {
        return <Item key={uuidv4()} data={data} onClose={onClose}/>
    })

    return (
        <div className={classes.wrapper}>
            {searchDataJSX}
        </div>
    );
};

export default ListItem;