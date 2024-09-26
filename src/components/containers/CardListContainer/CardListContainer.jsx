import React from 'react';
import classes from './CardListContainer.module.css';
import CardItem from "../CardItem/CardItem";

const CardListContainer = ({ productsData }) => {

    const productListJSX = productsData.products.map(product => (
        <div key={product.id}>
            <CardItem
                id={product.id}
                path={`/product/${product.id}`}
                src={product.image}
                titles={[product.name, product.nameEng]}
                price={product.price}
                discount={product.discount}
                inStock={product.inStock}
                isHit={product.isHit}
                isNew={product.isNew}
                rating={product.rating}
                extraClass={classes.extraClass}
            />
        </div>
    ));

    return (
        <div className={classes.cardList}>
            {productListJSX}
        </div>
    );
};

export default CardListContainer;