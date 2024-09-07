import React from 'react';
import classes from './TopPanel.module.css'
import Pagination from '../../components/ui/Pagination/Pagination';

const TopPanel = ({children, setCurrentPage, currentPage, amount, totalCount}) => {
    const handlePageChange = page => setCurrentPage(page)

    return (
        <div className={classes.wrapper}>
            <div className={classes.inner}>
                {children}
            </div>
            <div className={classes.pagination}>
                <Pagination currentPage={currentPage} amount={amount} totalCount={totalCount} onPageChange={handlePageChange}/>
            </div>
        </div>
    );
};

export default TopPanel;
