import React from 'react';
import classes from './TopPanel.module.css'
import SecondaryButton from "../SecondaryButton/SecondaryButton";
import Search from "../Search/Search";
import Pagination from './../../ui/components/Pagination/Pagination';

const TopPanel = ({sendFile}) => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            sendFile(file);
        }
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.inner}>
                <Search/>
                <SecondaryButton>За популярністю</SecondaryButton>
                <SecondaryButton>Фільтрувати</SecondaryButton>
                <input
                    type='file'
                    onChange={handleFileChange}
                    className={classes.file}
                    style={{display: 'none'}}
                    id='file-upload'
                />
                <label htmlFor='file-upload' className={classes.customButton}>
                    Загрузить файл
                </label>
            </div>
            <Pagination/>
        </div>
    );
};

export default TopPanel;
