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
import {v4 as uuidv4} from 'uuid'

// --DATA--
import linksToCategories from './../../data/linksToCategories.json'
import {getCategoryTree} from "../../store/categorySlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import LoginPanel from "../LoginPanel/LoginPanel";

const MobilePanel = ({setOpenLoginPanel, openLoginPanel}) => {
    const [open, setOpen] = useState(false);
    const [contentKey, setContentKey] = useState(null);
    const [contentSheet, setContentSheet] = useState(null);
    const cartForGuest = useSelector(state => state.cartForGuest.productsInCart);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const categoryTree = useSelector((state) => state.categoryData.categoryTree);
    const [currentCategoryId, setCurrentCategoryId] = useState(null);
    /*const [contentLinks, setContentLinks] = useState(
        linksToCategories.map(link => {
            return <SecondaryButton
                handleClick={handleMainCategoryClick}
                putIcoArrow={true}
                key={uuidv4()}
            >
                {link.name}
            </SecondaryButton>
        })
    );*/
    const navigate = useNavigate()

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

    /*useEffect(() => {
        if (currentCategoryId) {
            dispatch(getCategoryTree(currentCategoryId))
                .then(() => {
                    if (categoryTree && categoryTree.children) {
                        setContentLinks(categoryTree.children.map(link => {
                            return <SecondaryButton key={uuidv4()} handleClick={() => {}}>
                                {link.name}
                            </SecondaryButton>
                        }));
                    }
                })
        }
    }, [currentCategoryId, categoryTree]);*/
    const handleMainCategoryClick = (categoryId) => {
        navigate(`/category/${categoryId}`);
        setOpen(false);
        /*setCurrentCategoryId(categoryId);*/
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
                if (user !== null) {
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
                    <button onClick={() => {
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
