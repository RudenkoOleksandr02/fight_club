import React from 'react';
import classes from './CardList.module.css';
import clForCardItem from './CardItem.module.css'
import CardItem from "../../components/common/CardItem/CardItem";
import {v4 as uuidv4} from 'uuid';

const CardList = ({products}) => {
    const productListJSX = products.map(product => {
            return <div key={uuidv4()}>
                <CardItem
                    src={product.image}
                    titles={[product.name, product.nameEng]}
                    price={product.price}
                    inStock={product.inStock}
                    classes={clForCardItem}
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