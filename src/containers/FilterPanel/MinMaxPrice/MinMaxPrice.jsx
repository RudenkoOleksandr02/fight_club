import React, {useEffect} from 'react';
import classes from './MinMaxPrice.module.css'

const MinMaxPrice = ({minPrice, maxPrice, minMaxPrice, setMinMaxPrice}) => {
    useEffect(() => {
        setMinMaxPrice({maxPrice: Math.ceil(maxPrice), minPrice: Math.floor(minPrice)})
    }, [minPrice, maxPrice])

    return (
        <div className={classes.wrapper}>
            <input
                type="number"
                min={minMaxPrice.minPrice}
                max={minMaxPrice.maxPrice}
                value={minMaxPrice.minPrice}
                onChange={(e) => {
                    setMinMaxPrice({maxPrice: minMaxPrice.maxPrice, minPrice: e.target.value});
                }}
            />
            <span className={classes.line}/>
            <input
                type="number"
                min={minMaxPrice.minPrice}
                max={minMaxPrice.maxPrice}
                value={minMaxPrice.maxPrice}
                onChange={(e) => {
                    setMinMaxPrice({maxPrice: e.target.value, minPrice: minMaxPrice.minPrice});
                }}
            />
        </div>
    );
};

export default MinMaxPrice;