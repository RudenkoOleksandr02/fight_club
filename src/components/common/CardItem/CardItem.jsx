import React from 'react';
import classes from './CardItem.module.css';
import Button from "../../UI/Buttons/Button/Button";

const CardItem = ({src, titles, price, inStock}) => {
    return (
        <div className={classes.wrapper}>
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
                        <p>{inStock ? 'В наличии' : 'Нету в наличии'}</p>
                    </div>
                    <Button disabled={!inStock}>Купить</Button>
                </div>
            </div>
        </div>
    );
};

export default CardItem;