import React, {useEffect, useState} from 'react';
import classes from './Reviews.module.css';
import {useDispatch, useSelector} from "react-redux";
import {addReview, getReviewsInProduct, postReviews} from "../../../store/reviewsSlice";
import Pagination from './../../../components/ui/Pagination/Pagination'
import Preloader from "../../../components/ui/Preloader/Preloader";
import LeaveReview from "./LeaveReview/LeaveReview";
import AbandonedReview from "./AbandonedReview/AbandonedReview";

const Reviews = ({productId}) => {
    const {data, loading} = useSelector(state => state.reviews.reviews);
    const isAuth = useSelector(state => state.auth.isAuth);
    const dispatch = useDispatch();

    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState("");
    const [alreadyReview, setAlreadyReview] = useState(false);
    const [leftReview, setLeftReview] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const amount = 10;
    const handlePageChange = page => setCurrentPage(page)

    useEffect(() => {
        dispatch(getReviewsInProduct(productId, currentPage - 1, amount))
    }, [productId, currentPage, amount]);

    const sendReview = () => {
        dispatch(postReviews({reviewText, rating, productId}))
            .then(response => {
                if (response.payload === undefined) {
                    setAlreadyReview(true);
                    setReviewText("Ви вже залишали відгук на цей товар.");
                } else {
                    setAlreadyReview(false);
                    setLeftReview(true);

                    const date = new Date().toISOString();
                    dispatch(addReview({date, reviewText, rating, productId}));

                    setReviewText("Дякуємо за Ваш відгук!");
                }
            })
    }

    return (
        <div className={classes.wrapper}>
            <LeaveReview
                reviewText={reviewText}
                setReviewText={setReviewText}
                alreadyReview={alreadyReview}
                leftReview={leftReview}
                sendReview={sendReview}
                rating={rating}
                setRating={setRating}
                isAuth={isAuth}
            />
            <h3>Відгуки</h3>
            {loading ? (
                <div className={classes.preloader}>
                    <Preloader color='tertiary'/>
                </div>
            ) : (
                !!data.reviews.length ? (
                    <AbandonedReview reviews={data.reviews}/>
                ) : (
                    <div className={classes.notReview}>Наразі відгуків на цей товар немає.</div>
                )
            )}
            {data?.pagination?.totalPages > 1 && (
                <div className={classes.pagination}>
                    <Pagination
                        currentPage={currentPage}
                        amount={amount}
                        totalCount={data.pagination.totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
};

export default Reviews;