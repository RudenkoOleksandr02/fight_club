import React from 'react';
import Button from "../../UI/Buttons/Button/Button";

const CardItem = ({src, titles, price, inStock, classes}) => {
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
                        <p>{inStock ? 'В наявності' : 'Немає в наявності'}</p>
                    </div>
                    <Button disabled={!inStock}>Купить</Button>
                </div>
            </div>
        </div>
    );
};

export default CardItem;