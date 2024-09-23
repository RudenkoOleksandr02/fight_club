import React, { useState } from 'react';
import classes from "./RatingForComment.module.css";
import { ReactComponent as StarFill } from "../../../../assets/images/rating/BigStar1.svg";
import { ReactComponent as StarEmpty } from "../../../../assets/images/rating/BigStar2.svg";

const RatingForComment = ({ rating, setRating }) => {
    const [temporaryRating, setTemporaryRating] = useState(0);

    const handleMouseEnter = (value) => {
        setTemporaryRating(value);
    };
    const handleMouseLeave = () => {
        setTemporaryRating(0);
    };
    const handleClick = (value) => {
        setRating(value);
    };


    return (
        <div className={classes.wrapper}>
            {Array.from({ length: 5 }, (_, index) => {
                const starIndex = index + 1;
                return (
                    <button
                        key={starIndex}
                        className={classes.starButton}
                        onMouseEnter={() => handleMouseEnter(starIndex)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(starIndex)}
                    >
                        {starIndex <= (temporaryRating || rating) ? (
                            <StarFill />
                        ) : (
                            <StarEmpty />
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default RatingForComment;
