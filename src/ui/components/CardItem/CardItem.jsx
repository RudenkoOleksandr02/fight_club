import React from 'react';
import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";
import classes from './CardItem.module.css'
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addProduct} from "../../../store/cartSlice";

const CardItem = ({
                      id,
                      path,
                      src,
                      titles,
                      price,
                      inStock,
                      extraClass = ''
                  }) => {
    const productsInCart = useSelector(state => state.cart.productsInCart)
    const inCart = productsInCart.some(product => product.productId === id);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleAddToCart = () => {
        dispatch(addProduct({
            productId: id,
            image: src,
            name: titles[0],
            price
        }));
    };

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
                        <PrimaryButton disabled={!inStock} onClick={() => {
                            if (inCart) {
                                navigate('/cart')
                            } else {
                                handleAddToCart()
                            }
                        }}>
                            {inCart ? 'Перейти до кошика' : 'Додати до кошика'}
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardItem;