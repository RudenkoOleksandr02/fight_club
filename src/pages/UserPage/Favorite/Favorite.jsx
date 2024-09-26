import React, { useEffect, useState, useRef } from 'react';
import classes from "./Favorite.module.css";
import PrimaryButton from "../../../components/ui/Buttons/PrimaryButton/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavorite, deleteLocalFavorite } from "../../../store/pageSlices/userPageSlice";
import {addProductToCart} from "../../../store/pageSlices/cartPageSlice";
import { ReactComponent as IcoTrash } from './../../../assets/images/ico_trash.svg';
import { useNavigate } from "react-router-dom";
import NoImageBlock from "../../../components/ui/blocks/NoImageBlock/NoImageBlock";
import Breadcrumbs from "../../../components/ui/Breadcrumbs/Breadcrumbs";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Favorite = () => {
    const { data: favoriteData } = useSelector(state => state.userPage.favorite);
    const productsInCart = useSelector(state => state.cartPage.productsInCart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showNoFavorites, setShowNoFavorites] = useState(false);
    const noFavoritesTimeout = useRef(null);

    const nodeRefs = useRef({});
    const noFavoritesRef = useRef(null);

    useEffect(() => {
        if (favoriteData.length === 0) {
            noFavoritesTimeout.current = setTimeout(() => {
                setShowNoFavorites(true);
            }, 500);
        } else {
            if (noFavoritesTimeout.current) {
                clearTimeout(noFavoritesTimeout.current);
                noFavoritesTimeout.current = null;
            }
            setShowNoFavorites(false);
        }

        return () => {
            if (noFavoritesTimeout.current) {
                clearTimeout(noFavoritesTimeout.current);
            }
        };
    }, [favoriteData.length]);

    const handleDeleteFavorite = (productId) => {
        dispatch(deleteFavorite(productId));
        dispatch(deleteLocalFavorite(productId));
    }

    const handleAddToCart = (id, src, name, price) => {
        dispatch(addProductToCart({
            productId: id,
            image: src,
            name: name,
            price
        }));
    };

    const productInformationJSX = (product) => {
        const linksForBreadCrumbs = [];

        if (product.mainCategory !== null) {
            linksForBreadCrumbs.push({
                name: product.mainCategory.name,
                id: `/category/${product.mainCategory.categoryId}`
            });
        }

        return (
            <div className={classes.productInformation} onClick={() => navigate(`/product/${product.id}`)}>
                {product.images.length > 0 ? (
                    <img src={product.images[0]} alt={`${product.name} - обраний товар`} />
                ) : (
                    <div className={classes.noImageBlock}>
                        <NoImageBlock />
                    </div>
                )}
                <div className={classes.inner}>
                    <p>{product.name}</p>
                    <div className={classes.breadcrumbs}>
                        <Breadcrumbs
                            links={[...linksForBreadCrumbs, { name: product.name, id: `/product/${product.id}` }]}
                        />
                    </div>
                </div>
            </div>
        );
    }

    const buttonsJSX = (product) => (
        <div className={classes.buttons}>
            <button onClick={() => handleDeleteFavorite(product.id)}><IcoTrash /></button>
            <PrimaryButton
                disabled={!product.inStock}
                onClick={() => {
                    if (productsInCart.some(inCart => inCart.productId === product.id)) {
                        navigate('/cart')
                    } else {
                        handleAddToCart(product.id, product.images, product.name, product.price)
                    }
                }}
            >
                {productsInCart.some(inCart => inCart.productId === product.id) ? 'Перейти до кошика' : 'Додати до кошика'}
            </PrimaryButton>
        </div>
    )

    return (
        <div className={classes.wrapper}>
            <h3>Обране</h3>
            <TransitionGroup className={classes.favoritesContainer}>
                {favoriteData.map(product => {
                    if (!nodeRefs.current[product.id]) {
                        nodeRefs.current[product.id] = React.createRef();
                    }

                    return (
                        <CSSTransition
                            key={product.id}
                            nodeRef={nodeRefs.current[product.id]}
                            timeout={500}
                            classNames={{
                                enter: classes.productEnter,
                                enterActive: classes.productEnterActive,
                                exit: classes.productExit,
                                exitActive: classes.productExitActive,
                            }}
                        >
                            <div ref={nodeRefs.current[product.id]} className={classes.favoriteProduct}>
                                {productInformationJSX(product)}
                                {buttonsJSX(product)}
                            </div>
                        </CSSTransition>
                    )
                })}
            </TransitionGroup>
            <CSSTransition
                in={showNoFavorites}
                timeout={500}
                classNames={{
                    enter: classes.messageEnter,
                    enterActive: classes.messageEnterActive,
                    exit: classes.messageExit,
                    exitActive: classes.messageExitActive,
                }}
                nodeRef={noFavoritesRef}
                unmountOnExit
            >
                <p ref={noFavoritesRef} className={classes.absence}>Наразі у вас немає обраних товарів.</p>
            </CSSTransition>
        </div>
    );
};

export default Favorite;
