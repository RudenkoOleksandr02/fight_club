import React from 'react';
import classes from './Table.module.css';

const Table = ({th1, th2, th3, th4, data, keys}) => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.tr}>
                <div className={classes.checkbox}>
                    <input type='checkbox'/>
                </div>
                <div className={classes.th1}>
                    {th1}
                </div>
                <div className={classes.th2}>
                    {th2}
                </div>
                <div className={classes.th3}>
                    {th3}
                </div>
                <div className={classes.th4}>
                    {th4}
                </div>
            </div>
            {data?.map((el, index) => {
                return <div className={classes.tr} key={index}>
                    <div className={classes.checkbox}>
                        <input type='checkbox'/>
                    </div>
                    <div className={classes.td1}>
                        {el[keys.key1]}
                    </div>
                    <div className={classes.td2}>
                        {el[keys.key2]}
                    </div>
                    <div className={classes.td3}>
                        {el[keys.key3]}
                    </div>
                    <div className={classes.td4}>
                        {el[keys.key4] || '-'}
                    </div>
                </div>
            })}
        </div>
    );
};

export default Table;
