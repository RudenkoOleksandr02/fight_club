import React from 'react';
import classes from './Characteristics.module.css';
import ShowMore from "../../../ui/components/ShowMore/ShowMore";

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