import React, {useEffect, useState} from 'react';
import classes from './MainBlock.module.css'
import {ReactComponent as IcoHeart} from "../../../../assets/images/ico_heart.svg";
import {ReactComponent as IcoHeartFilled} from './../../../../assets/images/IcoHeartFilled.svg'
import Rating from "../../../../components/ui/Rating/Rating";
import PrimaryButton from "../../../../components/ui/Buttons/PrimaryButton/PrimaryButton";
import {useDispatch, useSelector} from "react-redux";
import {addProductToCart} from "../../../../store/pageSlices/cartPageSlice";
import {useNavigate} from "react-router-dom";
import {roundNumber} from "../../../../common/utils/roundNumber";
import {priceWithDiscount} from "../../../../common/utils/priceWithDiscount";
import {deleteFavorite, getFavorite, addFavorite} from "../../../../store/pageSlices/userPageSlice";

const MainBlock = (props) => {
    const {
        id,
        name,
        nameEng,
        rating,
        numberOfReviews,
        numberOfPurchases,
        numberOfViews,
        article,
        discount,
        price,
        inStock,
        src
    } = props;
    const dispatch = useDispatch();
    const handleAddToCart = () => {
        dispatch(addProductToCart({
            productId: id,
            image: src,
            name: name,
            price,
            discount
        }));
    };

    const productsInCart = useSelector(state => state.cartPage.productsInCart);
    const inCart = productsInCart.some(product => product.productId === id);
    const isAuth = useSelector(state => state.auth.isAuth);
    const navigate = useNavigate();

    // FAVORITE
    const {data: favoriteData} = useSelector(state => state.userPage.favorite);
    const [isFavorite, setIsFavorite] = useState(favoriteData.find(favorite => favorite.id === id)?.id === id)
    useEffect(() => {
        dispatch(getFavorite())
    }, [])
    const handleAddFavorite = (productId) => {
        setIsFavorite(true)
        dispatch(addFavorite(productId))
    }
    const handleRemoveFavorite = (productId) => {
        setIsFavorite(false)
        dispatch(deleteFavorite(productId))
    }

    return (
        <div className={classes.wrapper}>
            <h3>{nameEng}</h3>
            <h2>{name}</h2>
            <div className={classes.rating}>
                {!!rating ? (
                    <Rating rating={rating}/>
                ) : (
                    <span className={classes.withoutRating}>Без оцінки</span>
                )}
            </div>

            <div className={classes.reviewsContainer}>
                <span>{numberOfReviews} відгуків</span>
                <span>{numberOfPurchases} покупок</span>
                <span>{numberOfViews} переглядів</span>
            </div>

            <div className={classes.priceContainer}>
                <div className={classes.price}>
                    {!!discount && <span className={classes.discount}>{roundNumber(price)}₴</span>}
                    <span className={classes.totalPrice}>{roundNumber(priceWithDiscount(price, discount))}₴</span>
                </div>
                <div className={`${classes.selected} ${!isAuth ? classes.notActive : ''}`} onClick={() => {
                    if (isAuth) {
                        if (isFavorite) {
                            handleRemoveFavorite(id)
                        } else {
                            handleAddFavorite(id)
                        }
                    } else {
                        return false
                    }
                }}>
                    <span>У обране</span>
                    {isFavorite ? (
                        <IcoHeartFilled
                            className={classes.icoFavorite}
                        />
                    ) : <IcoHeart
                        className={classes.icoFavorite}
                    />}
                </div>
            </div>

            <div className={classes.buyContainer}>
                <PrimaryButton onClick={() => {
                    if (inCart) {
                        navigate('/cart')
                    } else {
                        handleAddToCart()
                    }
                }} disabled={!inStock}>
                    {inCart ? 'Перейти до кошика' : 'Додати до кошика'}
                </PrimaryButton>
            </div>

            <div className={classes.inStockContainer}>
                {inStock
                    ? <span>Доступно!</span>
                    : <span>Недоступно</span>
                }
                <span>Код продукту: {article}</span>
            </div>
        </div>
    );
};

export default MainBlock;