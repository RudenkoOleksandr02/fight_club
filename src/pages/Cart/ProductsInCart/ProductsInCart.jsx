import React from 'react';
import classes from './ProductsInCart.module.css';
import {v4 as uuidv4} from 'uuid';
import {ReactComponent as IcoTrash} from "../../../assets/images/ico_trash.svg";

const ProductsInCart = ({productsInCart, handleAddToCart, handleDeleteFromCart, handleRemoveFromCart}) => {
    const productsInCartJSX = productsInCart.map(product => {
        return <div key={uuidv4()} className={classes.productInCart}>
            <div className={classes.inner}>
                <img src={product.image} alt="product" className={classes.image}/>
                <p>{product.name}</p>
            </div>
            <div className={classes.inner}>
                <div className={classes.quantity}>
                    <button className={classes.remove} onClick={() => handleRemoveFromCart(product.id)}>
                        <span></span>
                    </button>
                    <span>{product.quantity}</span>
                    <button className={classes.add} onClick={() => handleAddToCart(product)}>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <span className={classes.price}>{product.price * product.quantity}</span>
                <button className={classes.delete} onClick={() => handleDeleteFromCart(product.id)}>
                    <IcoTrash/>
                </button>
            </div>
        </div>
    })

    return (
        <div className={classes.wrapper}>
            {productsInCartJSX}
        </div>
    );
};

export default ProductsInCart;