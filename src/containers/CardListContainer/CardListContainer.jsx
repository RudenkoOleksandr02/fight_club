import React from 'react';
import classes from './CardListContainer.module.css';
import CardItem from "./../../ui/components/CardItem/CardItem";

const CardList = ({ products }) => {
    const productListJSX = products.map(product => (
        <div key={product.id}>
            <CardItem
                src={product.images[0]}
                titles={[product.name, product.nameEng]}
                price={product.price}
                inStock={product.inStock}
                extraClasses={classes.extraClasses}
            />
        </div>
    ));

    return (
        <div className={classes.cardList}>
            {productListJSX}
        </div>
    );
};

export default CardList;