import React, {useState} from 'react';
import classes from './TopPanel.module.css'
import TertiaryButton from "../../../components/UI/Buttons/TertiaryButton/TertiaryButton";
import Pagination from "../../../components/UI/Pagination/Pagination";

const TopPanel = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className={classes.wrapper}>
            <TertiaryButton>За популярністю</TertiaryButton>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default TopPanel;