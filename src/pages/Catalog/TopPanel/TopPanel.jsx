import React from 'react';
import classes from './TopPanel.module.css'
import TertiaryButton from "../../../ui/components/Buttons/TertiaryButton/TertiaryButton";
import Pagination from "../../../ui/components/Pagination/Pagination";

const TopPanel = ({totalCount, currentPage, amount, handleChangePage, setSortBy}) => {
    return (
        <div className={classes.wrapper}>
            <TertiaryButton
                onChange={setSortBy}
                params={[
                    {name: "Популярністю", value: "popularity"},
                    {name: "ціна за зростанням", value: "price_asc"},
                    {name: "ціна за зниженням", value: "price_desc"},
                ]}
            >
                Сортувати за
            </TertiaryButton>
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