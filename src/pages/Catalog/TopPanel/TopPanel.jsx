import React, {useState} from 'react';
import classes from './TopPanel.module.css'
import TertiaryButton from "./../../../ui/Buttons/TertiaryButton/TertiaryButton";
import Pagination from "./../../../ui/Pagination/Pagination";

const TopPanel = ({totalPages, currentPage, amount, handleChangePage}) => {
    return (
        <div className={classes.wrapper}>
            <TertiaryButton>За популярністю</TertiaryButton>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={() => handleChangePage(currentPage + amount)}
            />
        </div>
    );
};

export default TopPanel;