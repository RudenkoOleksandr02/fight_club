import React from 'react';
import classes from './Reviews.module.css';
import {ReactComponent as Like} from '../../../assets/images/ico_like.svg';
import {v4 as uuidv4} from 'uuid'
import Rating from "../../../components/UI/Rating/Rating";

const Reviews = ({reviews}) => {
    const reviewsJSX = reviews.map(el => {
        return <div key={uuidv4()} className={classes.content}>
            <div className={classes.inner}>
                <Rating rating={el.rating}/>
                <span>{el.name}</span>
            </div>
            <p className={classes.review}>{el.review}</p>
            <div className={classes.inner}>
                <button><Like/></button>
                <span>{el.date}</span>
            </div>
        </div>
    })
    return (
        <div className={classes.wrapper}>
            <h3>Відгуки</h3>
            {reviewsJSX}
        </div>
    );
};

export default Reviews;