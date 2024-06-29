import React from 'react';
import classes from "../Product.module.css";
import ImagesBlock from "../imagesBlock/imagesBlock";

const ProductMobile = ({data}) => {
    return (
        <div>
            <div className={classes.images}>
                <ImagesBlock images={data.images}/>
            </div>
            <div className={classes.rightPanel}>rightPanel</div>
            <div className={classes.characteristics}>characteristics</div>
            <div className={classes.aboutMoreBrand}>aboutMoreBrand</div>
            <div className={classes.description}>description</div>
            <div className={classes.buyTogether}>buyTogether</div>
            <div className={classes.reviews}>reviews</div>
        </div>
    );
};

export default ProductMobile;