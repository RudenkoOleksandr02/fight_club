import React from 'react';
import classes from './TopPanel.module.css'
import TertiaryButton from "../../../ui/components/Buttons/TertiaryButton/TertiaryButton";
import Pagination from "../../../ui/components/Pagination/Pagination";

const TopPanel = ({totalCount, currentPage, amount, handleChangePage}) => {
    return (
        <div className={classes.wrapper}>
            <TertiaryButton>За популярністю</TertiaryButton>
            <Pagination
                currentPage={currentPage}
                totalCount={totalCount}
                amount={amount}
                onPageChange={handleChangePage}
            />
        </div>
    );
};

export default TopPanel;