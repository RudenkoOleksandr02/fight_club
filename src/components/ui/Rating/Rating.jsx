import React from 'react';
import { ReactComponent as StarFill } from '../../../assets/images/rating/Star1.svg';
import { ReactComponent as StarEmpty } from '../../../assets/images/rating/Star2.svg';
import { ReactComponent as StarHalfFill } from '../../../assets/images/rating/Star3.svg';
import classes from './Rating.module.css';
import {getStars} from "../../../common/utils/getStars";

const Rating = ({rating}) => {
    return (
        <div>
            {getStars(rating, StarFill, StarHalfFill, StarEmpty, classes.stars)}
        </div>
    );
};

export default Rating;
