import React from 'react';
import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";
import classes from './CardItem.module.css'
import {Link} from "react-router-dom";

const CardItem = ({
                      path,
                      src,
                      titles,
                      price,
                      inStock,
                      extraClass = ''
                  }) => {
    return (
        <div className={`${classes.wrapper} ${extraClass}`}>
            <div className={classes.image}>
                <Link to={path}>
                    <img src={src} alt='card-image'/>
                </Link>
            </div>
            <div className={classes.inner}>
                <div className={classes.titles}>
                    <Link to={path}>{titles[0]}</Link>
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