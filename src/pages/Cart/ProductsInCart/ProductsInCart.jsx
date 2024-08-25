import React from 'react';
import classes from './ProductsInCart.module.css';
import {v4 as uuidv4} from 'uuid';
import Quantity from "./Quantity/Quantity";
import {useNavigate} from "react-router-dom";

const ProductsInCart = ({productsInCart, handleAddToCart, handleDeleteFromCart, handleChangeProductsInCart}) => {
    const navigate = useNavigate();

    const productsInCartJSX = productsInCart.map(product => {
        return <div key={uuidv4()} className={classes.productInCart}>
            <div className={classes.inner} onClick={() => navigate('/product/' +  product.productId)}>
                <img src={product.image ? product.image : product.images[0]} alt="product" className={classes.image}/>
                <p className={classes.name} onClick={() => navigate('/product/' +  product.productId)}>{product.name}</p>
            </div>
            <Quantity
                product={product}
                productId={product.productId}
                quantity={product.quantity}
                price={product.price}
                handleAddToCart={handleAddToCart}
                handleDeleteFromCart={handleDeleteFromCart}
                handleChangeProductsInCart={handleChangeProductsInCart}
            />
        </div>
    })

    return (
        <div className={classes.wrapper}>
            {productsInCartJSX}
        </div>
    );
};

export default ProductsInCart;