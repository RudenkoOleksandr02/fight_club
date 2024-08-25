import React from 'react';
import Popup from "../../components/ui/Popup/Popup";
import classes from './SearchPopup.module.css';
import Preloader from "../../components/ui/Preloader/Preloader";

const SearchPopup = ({search, handleSearch, content, loading, onClosePopup, onClickValue}) => {
    return (
        <Popup onClose={() => onClosePopup(false)}>
            <div className={classes.searchPopup}>
                <input type='text' value={search} onChange={handleSearch} />
                {loading ? <Preloader overflowHidden={false} color='primary' /> : (
                    <div className={classes.content}>
                        {content.map((value, index) => (
                            <p key={index} onClick={() => {
                                onClickValue(value);
                            }}>{value}</p>
                        ))}
                    </div>
                )}
            </div>
        </Popup>
    );
};

export default SearchPopup;
