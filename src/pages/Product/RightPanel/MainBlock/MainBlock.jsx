import React from 'react';
import classes from './MainBlock.module.css'

const MainBlock = (props) => {
    const {name, nameEng, rating, numberOfReviews, numberOfPurchases, numberOfViews, article, options, price, inStock} = props;

    return (
        <div className={classes.wrapper}>
            <h3>{nameEng}</h3>
            <h2>{name}</h2>
            <div className={classes.rating}>{rating}</div>

            <div className={classes.reviewsContainer}>
                <span>{numberOfReviews} відгуків</span>
                <span>{numberOfPurchases} покупок</span>
                <span>{numberOfViews} переглядів</span>
            </div>

            <div className={classes.priceContainer}>
                <span>{price}₴</span>
                <div>
                    <span>У обране</span>
                    <span>+</span>
                </div>
            </div>

            <div className={classes.buyContainer}>
                <button>Купити</button>
                <button>Варіант</button>
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