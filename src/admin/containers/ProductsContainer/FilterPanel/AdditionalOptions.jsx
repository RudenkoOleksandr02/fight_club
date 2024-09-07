import React from 'react';
import classes from './FilterPanel.module.css'
import Checkbox from "../../../../components/ui/inputs/Checkbox/Checkbox";

const AdditionalOptions = ({isShown, setIsShown, hasDiscount, setHasDiscount, isHit, setIsHit, isNew, setIsNew}) => {
    const handleClickPlus = (state, setState) => {
        if (state === null) {
            setState(false)
        } else {
            setState(null)
        }
    }

    return (
        <div className={classes.additionalOptions}>
            <div className={classes.inner}>
                <div className={`${classes.checkbox} ${isShown === null ? classes.opacity : ''}`}>
                    <Checkbox
                        checked={!!isShown}
                        onChange={() => setIsShown(prevState => !prevState)}
                        text='Відображені'
                        style='_'
                    />
                </div>
                <div className={`${classes.plus} ${isShown !== null ? classes.mutated : ''}`}
                     onClick={() => handleClickPlus(isShown, setIsShown)}>
                    <span className={classes.line}></span>
                    <span className={classes.line}></span>
                </div>
            </div>
            <div className={classes.inner}>
                <div className={`${classes.checkbox} ${isHit === null ? classes.opacity : ''}`}>
                    <Checkbox
                        checked={!!isHit}
                        onChange={() => setIsHit(prevState => !prevState)}
                        text='Хіти'
                        style='_'
                    />
                </div>
                <div className={`${classes.plus} ${isHit !== null ? classes.mutated : ''}`}
                     onClick={() => handleClickPlus(isHit, setIsHit)}>
                    <span className={classes.line}></span>
                    <span className={classes.line}></span>
                </div>
            </div>
            <div className={classes.inner}>
                <div className={`${classes.checkbox} ${hasDiscount === null ? classes.opacity : ''}`}>
                    <Checkbox
                        checked={!!hasDiscount}
                        onChange={() => setHasDiscount(prevState => !prevState)}
                        text='Зі снижкою'
                        style='_'
                    />
                </div>
                <div className={`${classes.plus} ${hasDiscount !== null ? classes.mutated : ''}`}
                     onClick={() => handleClickPlus(hasDiscount, setHasDiscount)}>
                    <span className={classes.line}></span>
                    <span className={classes.line}></span>
                </div>
            </div>
            <div className={classes.inner}>
                <div className={`${classes.checkbox} ${isNew === null ? classes.opacity : ''}`}>
                    <Checkbox
                        checked={!!isNew}
                        onChange={() => setIsNew(prevState => !prevState)}
                        text='Нові'
                        style='_'
                    />
                </div>
                <div className={`${classes.plus} ${isNew !== null ? classes.mutated : ''}`}
                     onClick={() => handleClickPlus(isNew, setIsNew)}>
                    <span className={classes.line}></span>
                    <span className={classes.line}></span>
                </div>
            </div>
        </div>
    );
};

export default AdditionalOptions;