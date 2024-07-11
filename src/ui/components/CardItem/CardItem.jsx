import React from 'react';
import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";
import classes from './CardItem.module.css'

const CardItem = ({src, titles, price, inStock, extraClass = ''}) => {
    return (
        <div className={`${classes.wrapper} ${extraClass}`} >
            <div className={classes.image}>
                <img src={src} alt='card-image'/>
            </div>
            <div className={classes.inner}>
                <div className={classes.titles}>
                    <p>{titles[0]}</p>
                    <p>{titles[1]}</p>
                </div>

                <div className={classes.box}>
                    <div className={classes.price}>
                        <p>{price}₴</p>
                        <p>{inStock ? 'В наявності' : 'Немає в наявності'}</p>
                    </div>
                    <div className={classes.btnContainer}>
                        <PrimaryButton disabled={!inStock}>Купить</PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardItem;