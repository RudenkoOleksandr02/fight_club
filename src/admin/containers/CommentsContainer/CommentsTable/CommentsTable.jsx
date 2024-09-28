import React, {useState} from 'react';
import Tr from "../../../Table/Tr";
import Td from "../../../Table/Td";
import classes from "./CommentsTable.module.css";
import IcoButton from "../../../buttons/IcoButton/IcoButton";
import Table from "../../../Table/Table";
import {formatDate} from "../../../../common/utils/formatDate";
import {ReactComponent as IcoDelete} from './../../../images/icoDelete.svg';
import {ReactComponent as IcoBlocking} from './../../../images/icoBlocking.svg';
import ToggleButton from "../../../buttons/ToggleButton/ToggleButton";
import {useSelector} from "react-redux";
import Preloader from "../../../../components/ui/Preloader/Preloader";
import PopupForDelete from "../../../PopupForDelete/PopupForDelete";

const CommentsTable = ({
                           reviewsData,
                           handleDeleteReviewById,
                           handleDeleteAllReviewsByUserId,
                           handleSortOption,
                           sortOption
                       }) => {
    const {reviews: {loading: reviewsLoading}} = useSelector(state => state.admin.adminReviews);
    const getRotatedFromSortOption = (sortOption, name) => {
        return sortOption.endsWith('_desc') && sortOption.startsWith(name);
    };
    const getBooleanForArrow = (name) => {
        return sortOption.startsWith(name);
    };

    const [openPopupDeleteAllReviewsById, setOpenPopupDeleteAllReviewsById] = useState(null);
    const [openPopupDeleteReviewById, setOpenPopupDeleteReviewById] = useState(null);
    return (
        <Table>
            <Tr templateColumns='1fr 175px 140px 160px 130px 130px'>
                <Td fontWeight='600' justifyContent='left'>
                    <ToggleButton
                        handleClick={() => handleSortOption('commenttext')}
                        text='Коментар'
                        rotated={getRotatedFromSortOption(sortOption, 'commenttext')}
                        isShowArrow={getBooleanForArrow('commenttext')}
                    />
                </Td>
                <Td fontWeight='600' justifyContent='left'>
                    <ToggleButton
                        handleClick={() => handleSortOption('productname')}
                        text='Назва товару'
                        rotated={getRotatedFromSortOption(sortOption, 'productname')}
                        isShowArrow={getBooleanForArrow('productname')}
                    />
                </Td>
                <Td fontWeight='600'>
                    <ToggleButton
                        handleClick={() => handleSortOption('rating')}
                        text='Рейтинг'
                        rotated={getRotatedFromSortOption(sortOption, 'rating')}
                        isShowArrow={getBooleanForArrow('rating')}
                    />
                </Td>
                <Td fontWeight='600'>
                    <ToggleButton
                        handleClick={() => handleSortOption('username')}
                        text='Користувач'
                        rotated={getRotatedFromSortOption(sortOption, 'username')}
                        isShowArrow={getBooleanForArrow('username')}
                    />
                </Td>
                <Td fontWeight='600'>
                    <ToggleButton
                        handleClick={() => handleSortOption('date')}
                        text='Дата'
                        rotated={getRotatedFromSortOption(sortOption, 'date')}
                        isShowArrow={getBooleanForArrow('date')}
                    />
                </Td>
                <Td fontWeight='600'>Дії</Td>
            </Tr>
            {reviewsLoading ? <Preloader color='primary'/> : (
                reviewsData.map(review => (
                    <div key={review.reviewId}>
                        <Tr templateColumns='1fr 175px 140px 160px 130px 130px'>
                            <Td justifyContent='left'>{review.reviewText}</Td>
                            <Td justifyContent='left'>{review.productName}</Td>
                            <Td>{review.rating}</Td>
                            <Td>{review.username}</Td>
                            <Td>{formatDate(review.date)}</Td>
                            <Td>
                                <div className={classes.icoBtns}>
                                    <IcoButton svgIco={<IcoDelete/>}
                                               onClick={() => setOpenPopupDeleteReviewById(review.reviewId)}/>
                                    <IcoButton svgIco={<IcoBlocking/>}
                                               onClick={() => setOpenPopupDeleteAllReviewsById(review.reviewId)}/>
                                </div>
                            </Td>
                        </Tr>
                        {openPopupDeleteReviewById === review.reviewId && (
                            <PopupForDelete
                                message={`Ви впевнені, що хочете видалити відгук користувача ${review.username}?`}
                                onDelete={() => {
                                    handleDeleteReviewById(review.reviewId)
                                    setOpenPopupDeleteReviewById(null);
                                }}
                                onCancel={() => setOpenPopupDeleteReviewById(null)}
                            />
                        )}
                        {openPopupDeleteAllReviewsById === review.reviewId && (
                            <PopupForDelete
                                message={`Ви впевнені, що хочете видалити ВСІ відгуки користувача ${review.username}?`}
                                onDelete={() => {
                                    handleDeleteAllReviewsByUserId(review.siteUserId)
                                    setOpenPopupDeleteAllReviewsById(null);
                                }}
                                onCancel={() => setOpenPopupDeleteAllReviewsById(null)}
                            />
                        )}
                    </div>
                ))
            )}
        </Table>
    );
};

export default CommentsTable;