import React from 'react';
import classes from './TopPanel.module.css';
import TertiaryButton from "../Buttons/TertiaryButton/TertiaryButton";
import Pagination from "../Pagination/Pagination";
import {ReactComponent as IcoFilter} from './../../../assets/images/ico_filter.svg';

const TopPanel = ({ totalCount, currentPage, amount, handleChangePage, setSortBy, onOpenFilterPanelInMobile}) => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.btns}>
                <TertiaryButton
                    onChange={setSortBy}
                    params={[
                        { name: "За замовчуванням", value: "" },
                        { name: "Популярністю", value: "popularity" },
                        { name: "Ціна за зростанням", value: "price_asc" },
                        { name: "Ціна за зниженням", value: "price_desc" },
                    ]}
                >
                    Сортувати за
                </TertiaryButton>
                <button className={classes.filters} onClick={onOpenFilterPanelInMobile}>
                    <IcoFilter/>
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
