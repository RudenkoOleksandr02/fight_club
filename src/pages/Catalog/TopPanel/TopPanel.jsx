import React from 'react';
import classes from './TopPanel.module.css'
import TertiaryButton from "../../../ui/components/Buttons/TertiaryButton/TertiaryButton";
import Pagination from "../../../ui/components/Pagination/Pagination";

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