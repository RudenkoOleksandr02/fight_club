import React from 'react';
import classes from './Pagination.module.css';
import {ReactComponent as IcoArrow} from './../../../assets/images/ico_arrow3.svg';

const Pagination = ({currentPage, totalPages, onPageChange}) => {
    const handleClick = (page) => {
        onPageChange(page);
    };

    const renderPageNumbers = () => {
        let showPages = [];

        if (currentPage < 4) {
            for (let i = 1; i <= Math.min(5, totalPages); i++) {
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
            if (totalPages > 4) {
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
            }
        } else if (currentPage >= 4 && currentPage < totalPages - 3) {
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

            for (let i = currentPage - 1; i <= currentPage + 2; i++) {
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
                <IcoArrow/>
            </button>
            {renderPageNumbers()}
            <button
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={classes.next}
            >
                <IcoArrow/>
            </button>
        </div>
    );
};

export default Pagination;
