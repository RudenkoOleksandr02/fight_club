import React from 'react';
import classes from './CardList.module.css';
import CardItem from "./../../../ui/CardItem/CardItem";
import {v4 as uuidv4} from 'uuid';

const CardList = ({products}) => {
    const productListJSX = products.map(product => {
            return <div key={uuidv4()}>
                <CardItem
                    src={product.images[0]}
                    titles={[product.name, product.nameEng]}
                    price={product.price}
                    inStock={product.inStock}
                />
            </div>
        })

    return (
        <div className={classes.cardList}>
            {productListJSX}
        </div>
    );
};

export default CardList;