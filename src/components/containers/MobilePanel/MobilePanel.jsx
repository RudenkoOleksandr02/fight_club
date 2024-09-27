import React, {useState} from 'react';
import {BottomSheet} from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import classes from './MobilePanel.module.css';
import {ReactComponent as IcoSearch} from '../../../assets/images/mobilePanel/ico_search.svg';
import {ReactComponent as IcoHome} from '../../../assets/images/mobilePanel/ico_home.svg';
import {ReactComponent as IcoCart} from '../../../assets/images/mobilePanel/ico_cart.svg';
import {ReactComponent as IcoMenu} from '../../../assets/images/mobilePanel/ico_menu.svg';
import SecondaryButton from "../../ui/Buttons/SecondaryButton/SecondaryButton";
import SearchMobile from "../Search/Mobile/SearchMobile";
import {v4 as uuidv4} from 'uuid';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import useScreen from "../../../common/hooks/useScreen";
import {getParentCategories} from "../../../common/utils/getParentCategory";
import useBodyOverflowHidden from "../../../common/hooks/useBodyOverflowHidden";


const MobilePanel = ({setOpenLoginPanel, openLoginPanel}) => {
    const {data: categories} = useSelector((state) => state.navigation.categories);
    const [open, setOpen] = useState(false);
    const [contentKey, setContentKey] = useState(null);
    const [contentSheet, setContentSheet] = useState(null);
    const cartForGuest = useSelector(state => state.cartPage.productsInCart);
    const isAuth = useSelector(state => state.auth.isAuth);
    const navigate = useNavigate();
    const isSmallScreen = useScreen(999);

    const [closing, setClosing] = useState(false);

    const handleClose = () => {
        setClosing(true);
        setOpen(false);
        setClosing(false);
    };

    const handleMainCategoryClick = (categoryId) => {
        navigate(`/category/${categoryId}`);
        setOpen(false);
    }

    const contentLinks = getParentCategories(categories).map(link => {
        return <SecondaryButton
            handleClick={() => handleMainCategoryClick(link.categoryId)}
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
            <SecondaryButton handleClick={() => {
                navigate('/blogs');
                setOpen(false);
            }}>
                Блог
            </SecondaryButton>
            <SecondaryButton handleClick={() => {
                navigate('/contacts');
                setOpen(false);
            }}>
                Контакти
            </SecondaryButton>
            <SecondaryButton handleClick={() => {
                navigate('/brands');
                setOpen(false);
            }}>
                Бренди
            </SecondaryButton>
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


    const buttonsInPanelJSX = (
        <div className={classes.buttonsInPanel}>
            <button onClick={() => handleClickPanel('search', linksWithSearch)}>
                <IcoSearch/>
            </button>
            <button disabled={cartForGuest.length === 0}
                    className={`${classes.cart} ${cartForGuest.length !== 0 ? classes.active : ''}`} onClick={() => {
                if (cartForGuest.length !== 0) {
                    navigate('/cart');
                    setOpen(false);
                } else {
                    setOpen(false);
                }
            }}><IcoCart/></button>
            <button onClick={() => {
                setOpen(false);
                navigate('/')
            }}
            ><IcoHome/></button>
            <button onClick={() => handleClickPanel('menu', contentMenu)}>
                <IcoMenu/>
            </button>
        </div>
    )

    return (
        <div className={classes.wrapper}>
            <div className={classes.panel}>
                {buttonsInPanelJSX}
            </div>
            {isSmallScreen && (
                <>
                    {open && (
                        <div
                            className={`${classes.overlay} ${closing ? 'closing' : ''}`}
                            onClick={handleClose}
                        ></div>
                    )}
                    <BottomSheet
                        blocking={false}
                        open={open}
                        onDismiss={handleClose}
                        header={<div></div>}
                        snapPoints={({minHeight, maxHeight}) => [minHeight, maxHeight / 2, maxHeight]}
                    >
                        <div className={classes.contentSheet}>
                            {contentSheet}
                        </div>
                    </BottomSheet>
                </>
            )}
        </div>
    );
};

export default MobilePanel;
