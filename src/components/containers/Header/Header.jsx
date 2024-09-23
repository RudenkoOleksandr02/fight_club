import React from 'react';
import classes from './Header.module.css';
import {Link, useNavigate} from "react-router-dom";
import User from "./User/User";
import logo from "../../../assets/images/logo_blossom.png";
import Basket from "./Basket/Basket";

const Header = ({openLoginPanel, setOpenLoginPanel, userButtonRef}) => {
    const navigate = useNavigate();

    return (
        <header>
            <div className={classes.header}>
                <div className={classes.logo} onClick={() => navigate('/')}>
                    <img src={logo} alt='logotype'/>
                </div>
                <div className={classes.container}>
                    <div className={classes.navigate}>
                        <div className={classes.links}>
                            <Link to='/blogs'>Блог</Link>
                            <Link to='/contacts'>Контакти</Link>
                            <Link to='/brands'>Бренди</Link>
                        </div>
                    </div>
                    <div className={classes.basket}>
                        <Basket/>
                    </div>
                    <User
                        openLoginPanel={openLoginPanel}
                        setOpenLoginPanel={setOpenLoginPanel}
                        userButtonRef={userButtonRef}
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;