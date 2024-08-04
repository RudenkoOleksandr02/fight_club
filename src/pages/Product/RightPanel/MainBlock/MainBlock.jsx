import React, {useState} from 'react';
import classes from './MainBlock.module.css'
import {ReactComponent as IcoHeart} from "../../../../assets/images/ico_heart.svg";
import Rating from "../../../../ui/components/Rating/Rating";
import TertiaryButton from "../../../../ui/components/Buttons/TertiaryButton/TertiaryButton";
import PrimaryButton from "../../../../ui/components/Buttons/PrimaryButton/PrimaryButton";
import {useDispatch, useSelector} from "react-redux";
import {addProduct} from "../../../../store/cartSlice";
import {useNavigate} from "react-router-dom";

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
        options,
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
    const [sortBy, setSortBy] = useState('');
    const paramsForVariant = options.map((option, index) => {
        return {
            name: option,
            value: index
        }
    })

    const productsInCart = useSelector(state => state.cart.productsInCart);
    const inCart = productsInCart.some(product => product.productId === id);
    const navigate = useNavigate()

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
                <span>{price}₴</span>
                <div>
                    <span>У обране</span>
                    <IcoHeart/>
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
                <TertiaryButton
                    params={paramsForVariant}
                    onChange={setSortBy}
                >
                    Варіант
                </TertiaryButton>
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