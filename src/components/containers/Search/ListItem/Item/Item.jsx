import React from 'react';
import classes from './Item.module.css'
import {useNavigate} from "react-router-dom";
import {ReactComponent as Arrow} from '../../../../../assets/images/arrows/ico_arrow2.svg';

const Item = ({data, onClose}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/product/${data.id}`);
        onClose();
    }

    return (
        <div className={classes.wrapper} onClick={handleClick}>
            <div className={classes.inner}>
                <img className={classes.image} src={data.image} alt={`product${data.id}`}/>
                <p className={classes.name}>{data.name}</p>
            </div>
            <Arrow/>
        </div>
    );
};

export default Item;