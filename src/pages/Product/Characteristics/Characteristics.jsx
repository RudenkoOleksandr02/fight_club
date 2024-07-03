import React from 'react';
import ShowMore from "../../../components/UI/ShowMore/ShowMore";
import classes from './Characteristics.module.css';

const Characteristics = ({characteristics}) => {
    const characteristicsJSX = characteristics.map(el => {
        return <div className={classes.characteristic}>
            <span>{el.title}</span>
            <span>{el.desc}</span>
        </div>
    })

    return <ShowMore title='Характеристики'>
        {characteristicsJSX}
    </ShowMore>
};

export default Characteristics;