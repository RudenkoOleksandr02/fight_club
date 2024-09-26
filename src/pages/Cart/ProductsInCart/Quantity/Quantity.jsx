import React, {useEffect, useState} from 'react';
import classes from './Quantity.module.css';
import {ReactComponent as IcoTrash} from "../../../../assets/images/ico_trash.svg";
import {roundNumber} from "../../../../common/utils/roundNumber";
import {
    addProductToCart,
    changeProductAmountInCart, deleteProductInCart, getTotalAmountProducts,
    removeProductInCart
} from "../../../../store/pageSlices/cartPageSlice";
import {useDispatch} from "react-redux";

const Quantity = ({
                      product,
                      productId,
                      quantity,
                      price,
                      totalAmount
                  }) => {
    const dispatch = useDispatch();
    const [localQuantity, setLocalQuantity] = useState(0);

    useEffect(() => {
        dispatch(getTotalAmountProducts(productId))
    }, [productId]);

    useEffect(() => {
        setLocalQuantity(quantity);
    }, [quantity]);

    const handleAddProductToCart = (product) => {
        if (totalAmount > quantity) {
            dispatch(addProductToCart(product))
        }
    };
    const handleRemoveProductInCart = (productId, quantity) => {
        dispatch(removeProductInCart({productId, quantity}));
    };
    const handleChangeAmountProductInCart = (productId, quantity) => {
        dispatch(changeProductAmountInCart({productId, quantity}));
    }
    const handleDeleteProductInCart = (productId) => {
        dispatch(deleteProductInCart(productId));
    };

    const handleSetupQuantity = () => {
        if (localQuantity !== '' && Number(localQuantity) !== 0) {
            if (totalAmount > localQuantity) {
                handleChangeAmountProductInCart(productId, Number(localQuantity));
            } else {
                handleChangeAmountProductInCart(productId, Number(totalAmount));
                setLocalQuantity(Number(totalAmount));
            }
        } else {
            setLocalQuantity(quantity);
        }
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.quantity}>
                <button className={classes.remove} onClick={() => handleRemoveProductInCart(productId, quantity)}>
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
                <button
                    className={`${classes.add} ${localQuantity === totalAmount ? classes.disabled : ''}`}
                    onClick={() => handleAddProductToCart(product)}
                >
                    <span></span>
                    <span></span>
                </button>
            </div>
            <span className={classes.price}>{roundNumber(price * quantity)}₴</span>
            <button className={classes.delete} onClick={() => handleDeleteProductInCart(productId)}>
                <IcoTrash/>
            </button>
        </div>
    );
};

export default Quantity;