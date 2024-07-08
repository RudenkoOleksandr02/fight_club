import React from 'react';
import classes from './MainBlock.module.css'
import Rating from "../../../../components/UI/Rating/Rating";
import {ReactComponent as IcoHeart} from "../../../../assets/images/heart.svg";
import TertiaryButton from "../../../../components/UI/Buttons/TertiaryButton/TertiaryButton";
import PrimaryButton from "../../../../components/UI/Buttons/PrimaryButton/PrimaryButton";

const MainBlock = (props) => {
    const {name, nameEng, rating, numberOfReviews, numberOfPurchases, numberOfViews, article, options, price, inStock} = props;

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
                <PrimaryButton>Купити</PrimaryButton>
                <TertiaryButton>Варіант</TertiaryButton>
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