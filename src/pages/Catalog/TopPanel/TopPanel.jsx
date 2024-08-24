import React from 'react';
import classes from './TopPanel.module.css';
import TertiaryButton from "../../../components/ui/Buttons/TertiaryButton/TertiaryButton";
import Pagination from "../../../components/ui/Pagination/Pagination";

const TopPanel = ({ totalCount, currentPage, amount, handleChangePage, setSortBy, onOpenFilterPanelInMobile}) => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.btns}>
                <TertiaryButton
                    onChange={setSortBy}
                    params={[
                        { name: "За замовчуванням", value: "" },
                        { name: "Популярністю", value: "popularity" },
                        { name: "ціна за зростанням", value: "price_asc" },
                        { name: "ціна за зниженням", value: "price_desc" },
                    ]}
                >
                    Сортувати за
                </TertiaryButton>
                <button className={classes.filters} onClick={onOpenFilterPanelInMobile}>
                    Фільтри
                </button>
            </div>
            <div className={classes.pagination}>
                {totalCount > amount &&
                    <Pagination
                        currentPage={currentPage}
                        totalCount={totalCount}
                        amount={amount}
                        onPageChange={handleChangePage}
                    />
                }
            </div>
        </div>
    );
};

export default TopPanel;
