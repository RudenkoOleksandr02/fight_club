import React, {useEffect, useState} from 'react';
import classes from './MainBlock.module.css'
import {ReactComponent as IcoHeart} from "../../../../assets/images/ico_heart.svg";
import {ReactComponent as IcoHeartFilled} from './../../../../assets/images/IcoHeartFilled.svg'
import Rating from "../../../../components/ui/Rating/Rating";
import TertiaryButton from "../../../../components/ui/Buttons/TertiaryButton/TertiaryButton";
import PrimaryButton from "../../../../components/ui/Buttons/PrimaryButton/PrimaryButton";
import {useDispatch, useSelector} from "react-redux";
import {addProduct} from "../../../../store/cartPageSlice";
import {useNavigate} from "react-router-dom";
import {roundNumber} from "../../../../common/utils/roundNumber";
import {priceWithDiscount} from "../../../../common/utils/priceWithDiscount";
import {deleteFavorite, getFavorite, addFavorite} from "../../../../store/userPageSlice";

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
        dispatch(addProduct({
            productId: id,
            image: src,
            name: name,
            price
        }));
    };

    const productsInCart = useSelector(state => state.cartPage.productsInCart);
    const inCart = productsInCart.some(product => product.productId === id);
    const navigate = useNavigate();

    // FAVORITE
    const {data: favoriteData, loading: favoriteLoading} = useSelector(state => state.userPage.favorite);
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
                <Rating rating={rating}/>
            </div>

            <div className={classes.reviewsContainer}>
                <span>{numberOfReviews} відгуків</span>
                <span>{numberOfPurchases} покупок</span>
                <span>{numberOfViews} переглядів</span>
            </div>

            <div className={classes.priceContainer}>
                <div className={classes.price}>
                    <span>{roundNumber(price)}</span>
                    <span>{roundNumber(priceWithDiscount(price, discount))}₴</span>
                </div>
                <div className={classes.selected}>
                    <span>У обране</span>
                    {isFavorite ? (
                        <IcoHeartFilled
                            onClick={() => handleRemoveFavorite(id)}
                            className={classes.icoFavorite}
                        />
                    ) : <IcoHeart
                        onClick={() => handleAddFavorite(id)}
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