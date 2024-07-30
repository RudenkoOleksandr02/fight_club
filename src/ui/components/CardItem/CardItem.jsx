import React from 'react';
import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";
import classes from './CardItem.module.css'
import {Link} from "react-router-dom";
import {putProductInCart} from '../../../store/forGuest/cartForGuestSlice';
import {useDispatch, useSelector} from "react-redux";
import {addProduct} from "../../../store/forUser/cartForUserSlice";

const CardItem = ({
                      id,
                      path,
                      src,
                      titles,
                      price,
                      inStock,
                      extraClass = ''
                  }) => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    /*const handleAddToCart = () => {
        if (user === null) {
            dispatch(putProductInCart({
                id,
                image: src,
                name: titles[0],
                price
            }));
        } else {
            dispatch(addProduct(id))
        }
    };*/
    const handleAddToCart = () => {
        dispatch(putProductInCart({
            id,
            image: src,
            name: titles[0],
            price
        }))
    }

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
                            <p>{Math.round(price)}₴</p>
                            <p>{inStock ? 'В наявності' : 'Немає в наявності'}</p>
                        </div>
                        <div className={classes.btnContainer}>
                            <PrimaryButton disabled={!inStock} onClick={handleAddToCart}>Купить</PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    export default CardItem;