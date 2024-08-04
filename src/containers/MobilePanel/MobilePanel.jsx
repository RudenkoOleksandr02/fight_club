import React, {useEffect, useState} from 'react';
import {BottomSheet} from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import classes from './MobilePanel.module.css';
import {ReactComponent as IcoSearch} from '../../assets/images/mobilePanel/ico_search.svg';
import {ReactComponent as IcoHome} from '../../assets/images/mobilePanel/ico_home.svg';
import {ReactComponent as IcoCart} from '../../assets/images/mobilePanel/ico_cart.svg';
import {ReactComponent as IcoMenu} from '../../assets/images/mobilePanel/ico_menu.svg';
import SecondaryButton from "../../ui/components/Buttons/SecondaryButton/SecondaryButton";
import SearchMobile from "../Search/Mobile/SearchMobile";
import {v4 as uuidv4} from 'uuid';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

// --DATA--
import linksToCategories from './../../data/linksToCategories.json'
import useScreen from "../../common/hooks/useScreen/useScreen";


const MobilePanel = ({setOpenLoginPanel, openLoginPanel}) => {
    const [open, setOpen] = useState(false);
    const [contentKey, setContentKey] = useState(null);
    const [contentSheet, setContentSheet] = useState(null);
    const cartForGuest = useSelector(state => state.cart.productsInCart);
    const isAuth = useSelector(state => state.auth.isAuth);
    const navigate = useNavigate()
    const isSmallScreen = useScreen(999)

    const handleMainCategoryClick = (categoryId) => {
        navigate(`/category/${categoryId}`);
        setOpen(false);
    }
    const contentLinks = linksToCategories.map(link => {
        return <SecondaryButton
            handleClick={() => handleMainCategoryClick(link.id)}
            putIcoArrow={true}
            key={uuidv4()}
        >
            {link.name}
        </SecondaryButton>
    })

    const linksWithSearch = (
        <>
            <SearchMobile setOpen={setOpen}/>
            {contentLinks}
        </>
    )
    const contentMenu = (
        <>
            <SecondaryButton handleClick={() => {
                setOpen(false);
                if (isAuth) {
                    navigate('/user');
                } else if (!openLoginPanel) {
                    setOpenLoginPanel(true);
                } else {
                    setOpenLoginPanel(false);
                }
            }}>Мій Кабінет</SecondaryButton>
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
                    <button onClick={() => handleClickPanel('search', linksWithSearch)}>
                        <IcoSearch/>
                    </button>
                    <button disabled={cartForGuest.length === 0} className={`${classes.cart} ${cartForGuest.length !== 0 ? classes.active : ''}`} onClick={() => {
                        if (cartForGuest.length !== 0) {
                            navigate('/cart');
                            setOpen(false);
                        } else {
                            setOpen(false);
                        }
                    }}><IcoCart/></button>
                    <button onClick={() => {
                        setOpen(false);
                        navigate('/')}}
                    ><IcoHome/></button>
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
