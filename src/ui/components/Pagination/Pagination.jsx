import React from 'react';
import classes from './Pagination.module.css';
import { ReactComponent as IcoArrow } from '../../../assets/images/arrows/ico_arrow3.svg';

const Pagination = ({ currentPage, amount, totalCount, onPageChange }) => {
    const totalPages = Math.ceil(totalCount / amount);

    const handleClick = (page) => {
        onPageChange(page);
    };

    const renderPageNumbers = () => {
        let showPages = [];

        if (totalPages <= 5) {
            // If total pages are 5 or less, show all page numbers
            for (let i = 1; i <= totalPages; i++) {
                showPages.push(
                    <button
                        key={i}
                        onClick={() => handleClick(i)}
                        disabled={currentPage === i}
                        className={i === currentPage ? `${classes.page} ${classes.active}` : classes.page}
                    >
                        {i}
                    </button>
                );
            }
        } else if (currentPage < 4) {
            // If current page is less than 4, show first 5 pages
            for (let i = 1; i <= 5; i++) {
                showPages.push(
                    <button
                        key={i}
                        onClick={() => handleClick(i)}
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
                    onClick={() => handleClick(totalPages)}
                    disabled={currentPage === totalPages}
                    className={totalPages === currentPage ? `${classes.page} ${classes.active}` : classes.page}
                >
                    {totalPages}
                </button>
            );
        } else if (currentPage >= 4 && currentPage <= totalPages - 3) {
            // If current page is in the middle, show 2 pages before and after the current page
            showPages.push(
                <button
                    key={1}
                    onClick={() => handleClick(1)}
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
                        onClick={() => handleClick(i)}
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
                    onClick={() => handleClick(totalPages)}
                    disabled={currentPage === totalPages}
                    className={totalPages === currentPage ? `${classes.page} ${classes.active}` : classes.page}
                >
                    {totalPages}
                </button>
            );
        } else {
            // If current page is at the end, show the last 5 pages
            showPages.push(
                <button
                    key={1}
                    onClick={() => handleClick(1)}
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
                        onClick={() => handleClick(i)}
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
                onClick={() => handleClick(currentPage - 1)}
                disabled={currentPage === 1}
                className={classes.prev}
            >
                <IcoArrow />
            </button>
            {renderPageNumbers()}
            <button
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={classes.next}
            >
                <IcoArrow />
            </button>
        </div>
    );
};

export default Pagination;
