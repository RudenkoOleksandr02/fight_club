import React, {useState} from 'react';
import classes from './TertiaryButton.module.css';
import {ReactComponent as IcoRow} from '../../../../assets/images/arrows/ico_arrow3.svg'

const TertiaryButton = ({children, onChange, params}) => {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(value => !value);
    }

    return <div className={classes.wrapper}>
        <button className={classes.button} onClick={handleClick}>
            <span>{children}</span>
            <IcoRow/>
        </button>
        {open && <div className={classes.sortByWrapper}>
            {params.map(param => {
                return <div onClick={() => onChange(param.value)} style={{cursor: "pointer"}}>
                    {param.name}
                </div>
            })}
        </div>}
    </div>;
};

export default TertiaryButton;