import React from 'react';
import { ReactComponent as StarFill } from './../../../assets/images/rating/Star1.svg';
import { ReactComponent as StarEmpty } from './../../../assets/images/rating/Star2.svg';
import { ReactComponent as StarHalfFill } from './../../../assets/images/rating/Star3.svg';
import classes from './Rating.module.css';

const getStars = (rating) => {
    if (rating >= 4.6) {
        return <div className={classes.stars}>
            <StarFill/>
            <StarFill/>
            <StarFill/>
            <StarFill/>
            <StarFill/>
        </div>
    } else if (rating >= 4.1) {
        return <div className={classes.stars}>
            <StarFill/>
            <StarFill/>
            <StarFill/>
            <StarFill/>
            <StarHalfFill/>
        </div>
    } else if (rating >= 3.6) {
        return <div className={classes.stars}>
            <StarFill/>
            <StarFill/>
            <StarFill/>
            <StarFill/>
            <StarEmpty/>
        </div>
    } else if (rating >= 3.1) {
        return <div className={classes.stars}>
            <StarFill/>
            <StarFill/>
            <StarFill/>
            <StarHalfFill/>
            <StarEmpty/>
        </div>
    } else if (rating >= 2.6) {
        return <div className={classes.stars}>
            <StarFill/>
            <StarFill/>
            <StarFill/>
            <StarEmpty/>
            <StarEmpty/>
        </div>
    } else if (rating >= 2.1) {
        return <div className={classes.stars}>
            <StarFill/>
            <StarFill/>
            <StarHalfFill/>
            <StarEmpty/>
            <StarEmpty/>
        </div>
    } else if (rating >= 1.6) {
        return <div className={classes.stars}>
            <StarFill/>
            <StarFill/>
            <StarEmpty/>
            <StarEmpty/>
            <StarEmpty/>
        </div>
    } else if (rating >= 1.1) {
        return <div className={classes.stars}>
            <StarFill/>
            <StarHalfFill/>
            <StarEmpty/>
            <StarEmpty/>
            <StarEmpty/>
        </div>
    } else if (rating >= 0.6) {
        return <div className={classes.stars}>
            <StarFill/>
            <StarEmpty/>
            <StarEmpty/>
            <StarEmpty/>
            <StarEmpty/>
        </div>
    } else {
        return <div className={classes.stars}>
            <StarHalfFill/>
            <StarEmpty/>
            <StarEmpty/>
            <StarEmpty/>
            <StarEmpty/>
        </div>
    }
};

const Rating = ({rating }) => {
    return (
        <div className="rating">
            {getStars(rating)}
        </div>
    );
};

export default Rating;
