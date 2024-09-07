import React, {useEffect} from 'react';
import classes from './Pagination.module.css';
import { ReactComponent as IcoArrow } from '../../../assets/images/arrows/ico_arrow3.svg';

const Pagination = ({ currentPage, amount, totalCount, onPageChange }) => {
    const totalPages = Math.ceil(totalCount / amount);

    useEffect(() => {
        if (currentPage !== 1) {
            onPageChange(1);
        }
    }, [amount, totalCount]);

    const renderPageNumbers = () => {
        let showPages = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                showPages.push(
                    <button
                        key={i}
                        onClick={() => onPageChange(i)}
                        disabled={currentPage === i}
                        className={i === currentPage ? `${classes.page} ${classes.active}` : classes.page}
                    >
                        {i}
                    </button>
                );
            }
        } else if (currentPage < 4) {
            for (let i = 1; i <= 5; i++) {
                showPages.push(
                    <button
                        key={i}
                        onClick={() => onPageChange(i)}
                        disabled={currentPage === i}
                        className={i === currentPage ? `${classes.page} ${classes.active}` : classes.page}
                    >
                        {i}
                    </button>
                );
            }
            showPages.push(
                <span key="ellipsis" className={classes.ellipsis}>...</span>
            );
            showPages.push(
                <button
                    key={totalPages}
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className={totalPages === currentPage ? `${classes.page} ${classes.active}` : classes.page}
                >
                    {totalPages}
                </button>
            );
        } else if (currentPage >= 4 && currentPage <= totalPages - 3) {
            showPages.push(
                <button
                    key={1}
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    className={1 === currentPage ? `${classes.page} ${classes.active}` : classes.page}
                >
                    1
                </button>
            );
            showPages.push(
                <span key="ellipsis-start" className={classes.ellipsis}>...</span>
            );

            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                showPages.push(
                    <button
                        key={i}
                        onClick={() => onPageChange(i)}
                        disabled={currentPage === i}
                        className={i === currentPage ? `${classes.page} ${classes.active}` : classes.page}
                    >
                        {i}
                    </button>
                );
            }

            showPages.push(
                <span key="ellipsis-end" className={classes.ellipsis}>...</span>
            );
            showPages.push(
                <button
                    key={totalPages}
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className={totalPages === currentPage ? `${classes.page} ${classes.active}` : classes.page}
                >
                    {totalPages}
                </button>
            );
        } else {
            showPages.push(
                <button
                    key={1}
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    className={1 === currentPage ? `${classes.page} ${classes.active}` : classes.page}
                >
                    1
                </button>
            );
            showPages.push(
                <span key="ellipsis" className={classes.ellipsis}>...</span>
            );

            for (let i = totalPages - 4; i <= totalPages; i++) {
                showPages.push(
                    <button
                        key={i}
                        onClick={() => onPageChange(i)}
                        disabled={currentPage === i}
                        className={i === currentPage ? `${classes.page} ${classes.active}` : classes.page}
                    >
                        {i}
                    </button>
                );
            }
        }

        return showPages;
    };

    return (
        <div className="pagination">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={classes.prev}
            >
                <IcoArrow />
            </button>
            {renderPageNumbers()}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={classes.next}
            >
                <IcoArrow />
            </button>
        </div>
    );
};

export default Pagination;
