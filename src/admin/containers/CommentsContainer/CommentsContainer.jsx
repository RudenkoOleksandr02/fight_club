import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteAllReviewsByUserId, deleteReviewById, searchReviews} from "../../../store/adminSlices/adminReviewsSlice";
import classes from './CommentsContainer.module.css';
import TopPanel from "../../TopPanel/TopPanel";
import BottomPanel from "../../BottomPanel/BottomPanel";
import CommentsTable from "./CommentsTable/CommentsTable";
import Preloader from "../../../components/ui/Preloader/Preloader";

const CommentsContainer = ({currentPage, setCurrentPage, amount, setAmount}) => {
    const {reviews: {data: reviewsData}} = useSelector(state => state.admin.adminReviews);
    const dispatch = useDispatch();

    const [searchProduct, setSearchProduct] = useState("");
    const [searchUser, setSearchUser] = useState("");
    const [sortOption, setSortOption] = useState("");
    const handleSortOption = (option) => {
        if (sortOption === `${option}_asc`) {
            setSortOption(`${option}_desc`);
        } else {
            setSortOption(`${option}_asc`);
        }
    };

    useEffect(() => {
        dispatch(searchReviews({
            page: currentPage - 1,
            pageSize: amount,
            productName: searchProduct,
            username: searchUser,
            sortBy: sortOption
        }))
    }, [currentPage, amount, searchProduct, searchUser, sortOption]);

    const handleDeleteReviewById = (reviewId) => {
        dispatch(deleteReviewById(reviewId, {
            page: currentPage - 1,
            pageSize: amount,
            productName: searchProduct,
            username: searchUser,
            sortBy: sortOption
        }))
    }

    const handleDeleteAllReviewsByUserId = (userId) => {
        dispatch(deleteAllReviewsByUserId(userId, {
            page: currentPage - 1,
            pageSize: amount,
            productName: searchProduct,
            username: searchUser,
            sortBy: sortOption
        }))
    }

    return (
        <div className={classes.wrapper}>
            <TopPanel
                currentPage={currentPage}
                amount={amount}
                totalCount={reviewsData?.pagination?.totalReviews || 0}
                setCurrentPage={setCurrentPage}
            >
                <div className={classes.topPanel}>
                    <div className={classes.fields}>
                        <input placeholder='Пошук продукту' value={searchProduct}
                               onChange={(e) => setSearchProduct(e.target.value)}/>
                        <div/>
                        <input placeholder='Пошук користувача' value={searchUser}
                               onChange={(e) => setSearchUser(e.target.value)}/>
                    </div>
                </div>
            </TopPanel>
            <CommentsTable
                reviewsData={reviewsData.reviews}
                handleDeleteReviewById={handleDeleteReviewById}
                handleDeleteAllReviewsByUserId={handleDeleteAllReviewsByUserId}
                handleSortOption={handleSortOption}
                sortOption={sortOption}
            />
            <BottomPanel
                currentPage={currentPage}
                amount={amount}
                setAmount={setAmount}
                totalCount={reviewsData?.pagination?.totalReviews || 0}
                setCurrentPage={setCurrentPage}
                amountTitle='Кількість показаних відгуків'
            />
        </div>
    );
};

export default CommentsContainer;