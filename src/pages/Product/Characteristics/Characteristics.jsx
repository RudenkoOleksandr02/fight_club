import React from 'react';
import classes from './Characteristics.module.css';
import ShowMore from "../../../components/ui/ShowMore/ShowMore";
import {v4 as uuidv4} from 'uuid'

const Characteristics = ({characteristics}) => {
    const characteristicsJSX = characteristics.map(el => {
        return <div className={classes.characteristic} key={uuidv4()}>
            <span>{el.title}</span>
            <span>{el.desc}</span>
        </div>
    })

    return <ShowMore title='Характеристики'>
        {characteristicsJSX}
    </ShowMore>
};

export default Characteristics;