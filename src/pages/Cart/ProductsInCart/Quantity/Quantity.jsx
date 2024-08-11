import React, {useState} from 'react';
import classes from './Quantity.module.css';
import {ReactComponent as IcoTrash} from "../../../../assets/images/ico_trash.svg";

const Quantity = ({product, productId, quantity, price, handleAddToCart, handleChangeProductsInCart, handleDeleteFromCart}) => {
    const [localQuantity, setLocalQuantity] = useState(quantity);

    const handleSetupQuantity = () => {
        if (localQuantity !== '' && Number(localQuantity) !== 0) {
            handleChangeProductsInCart(productId, Number(localQuantity));
        } else {
            setLocalQuantity(quantity);
        }
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.quantity}>
                <button className={classes.remove}
                        onClick={() => handleChangeProductsInCart(productId, quantity - 1)}>
                    <span></span>
                </button>
                <input
                    value={localQuantity}
                    className={classes.quantityInput}
                    type='number'
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            handleSetupQuantity()
                        }
                    }}
                    onBlur={handleSetupQuantity}
                    onChange={e => {
                        setLocalQuantity(e.target.value);
                    }}/>
                <button className={classes.add} onClick={() => handleAddToCart(product)}>
                    <span></span>
                    <span></span>
                </button>
            </div>
            <span className={classes.price}>{Math.round(price * quantity)}$</span>
            <button className={classes.delete} onClick={() => handleDeleteFromCart(productId)}>
                <IcoTrash/>
            </button>
        </div>
    );
};

export default Quantity;