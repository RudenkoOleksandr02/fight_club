import React from 'react';
import classes from "../Reviews.module.css";
import RatingForComment from "../RatingForComment/RatingForComment";
import PrimaryButton from "../../../../components/ui/Buttons/PrimaryButton/PrimaryButton";

const LeaveReview = ({ reviewText, setReviewText, alreadyReview, leftReview, sendReview, rating, setRating, isAuth }) => {
    const textForNotIsAuth = 'Авторизуйтесь або створіть акаунт, щоб залишити відгук.';

    return (
        <div className={classes.leaveReview}>
            <h3>Залишити відгук</h3>
            <textarea
                placeholder='Ваш коментар'
                value={isAuth ? reviewText : undefined}
                defaultValue={!isAuth ? textForNotIsAuth : undefined}
                onChange={isAuth ? (e) => setReviewText(e.target.value) : undefined}
                className={`
                    ${alreadyReview ? classes.alreadyReview : ''}
                    ${leftReview ? classes.leftReview : ''}
                `}
                disabled={alreadyReview || leftReview || !isAuth}
                maxLength={500}
            />
            <div className={classes.inner}>
                <div className={classes.rating}>
                    <RatingForComment rating={rating} setRating={setRating} />
                </div>
                <PrimaryButton
                    disabled={!reviewText.length || alreadyReview || leftReview || !isAuth}
                    onClick={sendReview}
                >
                    Надіслати
                </PrimaryButton>
            </div>
        </div>
    );
};

export default LeaveReview;
