import Modal from './Modal/Modal';
import React, {useEffect, useState} from 'react';
import classes from './InputSelect.module.css';

const InputSelect = ({value, onInputChange, onOptionClick, placeholder, options, errors, disabled = false}) => {
    const [showModal, setShowModal] = useState(options.length !== 0);
    const [focus, setFocus] = useState(false)

    useEffect(() => {
        setShowModal(options.length !== 0);
    }, [options, focus]);

    const handleInputChange = (e) => {
        onInputChange(e);
        setShowModal(true);
    };

    const handleOptionClick = (option) => {
        onOptionClick(option);
        setShowModal(false);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setShowModal(false);
            setFocus(false);
        }, 200);
    };

    return (
        <div className={classes.wrapper}>
            {errors.length !== 0 && errors.map((error, index) => (
                <p className={classes.error} key={index}>{error}</p>
            ))}
            <input
                type="text"
                value={value}
                onChange={handleInputChange}
                placeholder={placeholder}
                className={`${classes.inputSelect} ${errors.length !== 0 ? classes.errorInput : ''}`}
                disabled={disabled}
                onFocus={() => setFocus(true)}
                onBlur={handleBlur}
            />
            <Modal show={showModal && focus} onClose={() => setShowModal(true)}>
                {options.map((option, index) => (
                    <div
                        key={index}
                        className={classes.option}
                        onClick={() => handleOptionClick(option)}
                    >
                        {option}
                    </div>
                ))}
            </Modal>
        </div>
    );
};

export default InputSelect;
