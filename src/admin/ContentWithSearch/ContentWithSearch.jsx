import React from 'react';
import classes from './ContentWithSearch.module.css';
import Preloader from "../../components/ui/Preloader/Preloader";

const ContentWithSearch = ({
                               search,
                               handleSearch,
                               content,
                               loading,
                               onClickValue,
                               modificationStyle = {
                                   maxHeightContent: '310px'
                               }
                           }) => {
    return (
        <div className={classes.wrapper} style={{maxHeight: modificationStyle.maxHeightContent}}>
            <input type='text' value={search} onChange={handleSearch} placeholder='Пошук'/>
            {loading ? <Preloader overflowHidden={false} color='primary'/> : (
                <div className={classes.content}>
                    {content.map(data => (
                        <p key={data.id} onClick={() => {
                            onClickValue(data.id);
                        }}>{data.value}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ContentWithSearch;
