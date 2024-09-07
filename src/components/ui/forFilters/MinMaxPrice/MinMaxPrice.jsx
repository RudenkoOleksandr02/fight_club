import React, {useEffect, useState} from 'react';
import classes from './MinMaxPrice.module.css'

const MinMaxPrice = ({
                         modificationStyle = {
                             width: `100%`,
                             color: 'primary'
                         },
                         minPrice,
                         maxPrice,
                         setMinPrice,
                         setMaxPrice
                     }) => {
    const [initialMinPrice, setInitialMinPrice] = useState(0);
    const [initialMaxPrice, setInitialMaxPrice] = useState(0);

    useEffect(() => {
        setInitialMinPrice(Math.floor(minPrice))
        setInitialMaxPrice(Math.ceil(maxPrice))
    }, [minPrice, maxPrice]);

    const handleChangeMinPrice = (e) => {
        const value = e.target.value;
        if (+value < 0) {
            setInitialMinPrice(0)
        } else if (value === '') {
            setInitialMinPrice(value)
        } else if (+value >= +initialMaxPrice) {
            setInitialMinPrice(+value)
            setMinPrice(+value)
            setMaxPrice(+value + 1)
            setInitialMaxPrice(+value + 1)
        } else {
            setInitialMinPrice(+value)
            setMinPrice(+value)
        }
    }
    const handleChangeMaxPrice = (e) => {
        const value = e.target.value;
        if (+value < 0) {
            setInitialMaxPrice(0)
        } else if (value === '') {
            setInitialMaxPrice(value)
        } else if (+value <= +initialMinPrice) {
            setInitialMaxPrice(value)
        } else {
            setInitialMaxPrice(+value)
            setMaxPrice(+value)
        }
    }

    return (
        <div className={`${classes.wrapper} ${modificationStyle.color !== 'primary' ? classes.modification : ''}`}>
            <input
                type='number'
                value={initialMinPrice}
                onChange={handleChangeMinPrice}
                onBlur={e => {
                    if (e.target.value === '') {
                        setInitialMinPrice(Math.floor(minPrice))
                        setMinPrice(Math.floor(minPrice))
                    }
                }}
                className={classes.minPrice}
                style={{width: modificationStyle.width}}
            />
            <span className={classes.line}></span>
            <input
                type='number'
                value={initialMaxPrice}
                onChange={handleChangeMaxPrice}
                onBlur={e => {
                    if (e.target.value === '') {
                        setInitialMaxPrice(Math.ceil(maxPrice))
                        setMaxPrice(Math.ceil(maxPrice))
                    } else if (+e.target.value <= +initialMinPrice) {
                        setInitialMaxPrice(+initialMinPrice + 1)
                        setMaxPrice(+initialMinPrice + 1)
                    }
                }}
                className={classes.maxPrice}
                style={{width: modificationStyle.width}}
            />
        </div>
    );
};

export default MinMaxPrice;