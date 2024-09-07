import React from 'react';
import classes from './Characteristics.module.css';
import ShowMoreBlock from "../../../components/ui/blocks/ShowMoreBlock/ShowMoreBlock";
import {v4 as uuidv4} from 'uuid'

const Characteristics = ({characteristics}) => {
    const characteristicsJSX = characteristics.map(el => {
        return <div className={classes.characteristic} key={uuidv4()}>
            <span>{el.title}</span>
            <span>{el.desc}</span>
        </div>
    })

    return <ShowMoreBlock title='Характеристики'>
        {characteristicsJSX}
    </ShowMoreBlock>
};

export default Characteristics;