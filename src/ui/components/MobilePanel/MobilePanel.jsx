import React, {useEffect, useState} from 'react';
import {BottomSheet} from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import classes from './MobilePanel.module.css';
import {ReactComponent as IcoSearch} from '../../../assets/images/mobilePanel/ico_search.svg';
import {ReactComponent as IcoHome} from '../../../assets/images/mobilePanel/ico_home.svg';
import {ReactComponent as IcoCart} from '../../../assets/images/mobilePanel/ico_cart.svg';
import {ReactComponent as IcoMenu} from '../../../assets/images/mobilePanel/ico_menu.svg';
import SecondaryButton from "../Buttons/SecondaryButton/SecondaryButton";
import SearchMobile from "../../../containers/Search/Mobile/SearchMobile";

const MobilePanel = () => {
    const [open, setOpen] = useState(false);
    const [contentKey, setContentKey] = useState(null);
    const [contentSheet, setContentSheet] = useState(null);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 999);
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 999);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const contentSearch = (
        <>
            <SearchMobile/>
            <SecondaryButton>Парфумерія</SecondaryButton>
            <SecondaryButton>Макіяж</SecondaryButton>
            <SecondaryButton>Для майстрів</SecondaryButton>
            <SecondaryButton>Волосся</SecondaryButton>
            <SecondaryButton>Обличчя</SecondaryButton>
            <SecondaryButton>Тіло і ванна</SecondaryButton>
            <SecondaryButton>Чоловікам</SecondaryButton>
            <SecondaryButton>Аксесуари</SecondaryButton>
            <SecondaryButton>Подарунки</SecondaryButton>
        </>
    )
    const contentMenu = (
        <>
            <SecondaryButton>Мой кабинет</SecondaryButton>
            <SecondaryButton>Избранное</SecondaryButton>
            <SecondaryButton>Контакты</SecondaryButton>
            <SecondaryButton>Информация</SecondaryButton>
            <SecondaryButton>О нас</SecondaryButton>
        </>
    )

    const handleClickPanel = (key, content) => {
        if (!contentKey || !open) {
            setContentKey(key);
            setContentSheet(content);
            setOpen(true);
        } else if (key !== contentKey) {
            setOpen(false)
            setTimeout(() => {
                setContentKey(key);
                setContentSheet(content);
                setOpen(true);
            }, 300)
        } else {
            setOpen(!open);
        }
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.panel}>
                <div className={classes.btns}>
                    <button onClick={() => handleClickPanel('search', contentSearch)}>
                        <IcoSearch/>
                    </button>
                    <button><IcoCart/></button>
                    <button><IcoHome/></button>
                    <button onClick={() => handleClickPanel('menu', contentMenu)}>
                        <IcoMenu/>
                    </button>
                </div>
            </div>
            {isSmallScreen && <BottomSheet
                blocking={false}
                open={open}
                onDismiss={() => setOpen(false)}
            >
                <div className={classes.contentSheet}>
                    {contentSheet}
                </div>
            </BottomSheet>}
        </div>
    );
};

export default MobilePanel;
