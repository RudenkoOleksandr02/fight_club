import React from "react";

export const getStars = (rating, StarFill, StarHalfFill, StarEmpty, classes) => {
    if (rating >= 4.6) {
        return <div className={classes}>
            <StarFill/>
            <StarFill/>
            <StarFill/>
            <StarFill/>
            <StarFill/>
        </div>
    } else if (rating >= 4.1) {
        return <div className={classes}>
            <StarFill/>
            <StarFill/>
            <StarFill/>
            <StarFill/>
            <StarHalfFill/>
        </div>
    } else if (rating >= 3.6) {
        return <div className={classes}>
            <StarFill/>
            <StarFill/>
            <StarFill/>
            <StarFill/>
            <StarEmpty/>
        </div>
    } else if (rating >= 3.1) {
        return <div className={classes}>
            <StarFill/>
            <StarFill/>
            <StarFill/>
            <StarHalfFill/>
            <StarEmpty/>
        </div>
    } else if (rating >= 2.6) {
        return <div className={classes}>
            <StarFill/>
            <StarFill/>
            <StarFill/>
            <StarEmpty/>
            <StarEmpty/>
        </div>
    } else if (rating >= 2.1) {
        return <div className={classes}>
            <StarFill/>
            <StarFill/>
            <StarHalfFill/>
            <StarEmpty/>
            <StarEmpty/>
        </div>
    } else if (rating >= 1.6) {
        return <div className={classes}>
            <StarFill/>
            <StarFill/>
            <StarEmpty/>
            <StarEmpty/>
            <StarEmpty/>
        </div>
    } else if (rating >= 1.1) {
        return <div className={classes}>
            <StarFill/>
            <StarHalfFill/>
            <StarEmpty/>
            <StarEmpty/>
            <StarEmpty/>
        </div>
    } else if (rating >= 0.6) {
        return <div className={classes}>
            <StarFill/>
            <StarEmpty/>
            <StarEmpty/>
            <StarEmpty/>
            <StarEmpty/>
        </div>
    } else {
        return <div className={classes}>
            <StarHalfFill/>
            <StarEmpty/>
            <StarEmpty/>
            <StarEmpty/>
            <StarEmpty/>
        </div>
    }
};