import React, { useRef } from 'react';
import classes from './ProductsInCart.module.css';
import Quantity from "./Quantity/Quantity";
import { useNavigate } from "react-router-dom";
import NoImageBlock from "../../../components/ui/blocks/NoImageBlock/NoImageBlock";
import { useSelector } from "react-redux";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const ProductsInCart = ({ productsInCart }) => {
    const navigate = useNavigate();
    const { data: productsTotalAmount } = useSelector(state => state.cartPage.productsTotalAmount);
    const nodeRefs = useRef({});

    return (
        <div className={classes.wrapper}>
            <TransitionGroup>
                {productsInCart.map(product => {
                    if (!nodeRefs.current[product.productId]) {
                        nodeRefs.current[product.productId] = React.createRef();
                    }

                    return (
                        <CSSTransition
                            key={product.productId}
                            nodeRef={nodeRefs.current[product.productId]}
                            timeout={500}
                            classNames={{
                                enter: classes.productEnter,
                                enterActive: classes.productEnterActive,
                                exit: classes.productExit,
                                exitActive: classes.productExitActive,
                            }}
                        >
                            <div
                                ref={nodeRefs.current[product.productId]}
                                className={classes.productInCart}
                            >
                                <div
                                    className={classes.inner}
                                    onClick={() => navigate(`/product/${product.productId}`)}
                                >
                                    <div className={classes.imageContainer}>
                                        {product.image || !!product.images?.length ? (
                                            <img src={product.image || product.images[0]} alt={`${product.name} in cart`} />
                                        ) : (
                                            <div className={classes.noImageBlock}>
                                                <NoImageBlock />
                                            </div>
                                        )}
                                    </div>
                                    <p className={classes.name}>{product.name}</p>
                                </div>
                                <Quantity
                                    product={product}
                                    productId={product.productId}
                                    quantity={product.quantity}
                                    totalAmount={
                                        productsTotalAmount.find(item => item?.id === product.productId)?.totalAmount || 0
                                    }
                                    price={product.price * (1 - product.discount / 100)}
                                />
                            </div>
                        </CSSTransition>
                    );
                })}
            </TransitionGroup>
        </div>
    );
};

export default ProductsInCart;
