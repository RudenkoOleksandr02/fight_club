import React from 'react';
import classes from "../Reviews.module.css";
import Rating from "../../../../components/ui/Rating/Rating";
import {formatDate} from "../../../../common/utils/formatDate";
import {v4 as uuidv4} from 'uuid';

const AbandonedReview = ({reviews}) => {
    return (
        <>
            {reviews.map(review => {
                return (
                    <div key={uuidv4()} className={classes.review}>
                        <div className={classes.inner}>
                            <Rating rating={review.rating} />
                            <div className={classes.date}>
                                {formatDate(review.date)}
                            </div>
                        </div>
                        <p className={classes.reviewText}>{review.reviewText}</p>
                    </div>
                );
            })}
        </>
    );
};

export default AbandonedReview;
