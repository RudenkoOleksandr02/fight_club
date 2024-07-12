import React from 'react';
import classes from './CardListContainer.module.css';
import CardItem from "./../../ui/components/CardItem/CardItem";

const CardListContainer = ({ productsData }) => {
    const productListJSX = productsData.products.map(product => (
        <div key={product.id}>
            <CardItem
                src={product.images[0]}
                titles={[product.name, product.nameEng]}
                price={product.price}
                inStock={product.inStock}
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