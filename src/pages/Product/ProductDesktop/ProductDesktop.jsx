import React from 'react';
import classes from "../Product.module.css";
import ImagesBlock from "../imagesBlock/imagesBlock";

const ProductDesktop = ({data}) => {
    return (
        <div>
            <div className="rightPanel">
                <ImagesBlock images={data.images}/>
            </div>
            <div className="leftPanel">
                leftpanel
            </div>
            <div className={classes.alsoBuy}>alsoBuy</div>
            <div className={classes.reviews}>reviews</div>
        </div>
    );
};

export default ProductDesktop;