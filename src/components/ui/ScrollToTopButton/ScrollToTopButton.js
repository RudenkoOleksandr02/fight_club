import React, {useState, useEffect} from 'react';
import classes from './ScrollToTopButton.module.css'
import {ReactComponent as IcoArrow} from '../../../assets/images/arrows/arrow-up.svg'

const ScrollToTopButton = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button onClick={scrollToTop}
                className={`${classes.button} ${showButton ? classes.show : ''}`}
        >
            <IcoArrow/>
        </button>
    );
};

export default ScrollToTopButton;
