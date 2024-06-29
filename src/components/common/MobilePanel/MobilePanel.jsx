import React, {useEffect, useState} from 'react';
import {BottomSheet} from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import classes from './MobilePanel.module.css';
import {ReactComponent as IcoSearch} from './../../../assets/images/mobilePanel/ico_search.svg';
import {ReactComponent as IcoHome} from './../../../assets/images/mobilePanel/ico_home.svg';
import {ReactComponent as IcoCart} from './../../../assets/images/mobilePanel/ico_cart.svg';
import {ReactComponent as IcoMenu} from './../../../assets/images/mobilePanel/ico_menu.svg';
import ButtonWithIcoRow from "../../UI/Buttons/ButtonWithIcoRow/ButtonWithIcoRow";
import SearchMobile from "../Search/Mobile/SearchMobile";

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
            <ButtonWithIcoRow>Парфумерія</ButtonWithIcoRow>
            <ButtonWithIcoRow>Макіяж</ButtonWithIcoRow>
            <ButtonWithIcoRow>Для майстрів</ButtonWithIcoRow>
            <ButtonWithIcoRow>Волосся</ButtonWithIcoRow>
            <ButtonWithIcoRow>Обличчя</ButtonWithIcoRow>
            <ButtonWithIcoRow>Тіло і ванна</ButtonWithIcoRow>
            <ButtonWithIcoRow>Чоловікам</ButtonWithIcoRow>
            <ButtonWithIcoRow>Аксесуари</ButtonWithIcoRow>
            <ButtonWithIcoRow>Подарунки</ButtonWithIcoRow>
        </>
    )
    const contentMenu = (
        <>
            <ButtonWithIcoRow>Мой кабинет</ButtonWithIcoRow>
            <ButtonWithIcoRow>Избранное</ButtonWithIcoRow>
            <ButtonWithIcoRow>Контакты</ButtonWithIcoRow>
            <ButtonWithIcoRow>Информация</ButtonWithIcoRow>
            <ButtonWithIcoRow>О нас</ButtonWithIcoRow>
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
