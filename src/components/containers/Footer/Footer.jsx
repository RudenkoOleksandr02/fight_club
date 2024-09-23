import React from 'react';
import classes from './Footer.module.css';
import {v4 as uuidv4} from 'uuid';
import {Link} from "react-router-dom";
import Subscribe from "./Subscribe/Subscribe";
// --ICONS--
import {ReactComponent as IcoInstagram} from "../../../assets/images/socials_footer/ico_instagram.svg";
import {ReactComponent as IcoFacebook} from "../../../assets/images/socials_footer/ico_facebook.svg";
import {ReactComponent as IcoTelegram} from "../../../assets/images/socials_footer/ico_telegram.svg";
// --DATA--
import linksToInformation from '../../../data/linksToInformation.json';
import linksToUs from '../../../data/linksToUs.json';
import linksToRights from '../../../data/linksToRights.json';
import linksToSocials from '../../../data/linksToSocials.json';
import {getParentCategories} from "../../../common/utils/getParentCategory";
import {useSelector} from "react-redux";
import logo from './../../../assets/images/logo_blossom.png'


const Footer = () => {
    const {data: categories} = useSelector((state) => state.navigation.categories);

    const linksParentCategoriesJSX = <div className={classes.topLinks}>
        {getParentCategories(categories).map(link => {
            return <div key={uuidv4()} className={classes.linkContainer}>
                <Link to={'/category/' + link.categoryId}>{link.name}</Link>
            </div>
        })}
    </div>
    const linksToInformationJSX = <div className={classes.topLinks}>
        {linksToInformation.map(link => {
            return <div key={uuidv4()} className={classes.linkContainer}>
                <Link to={link.id}>{link.name}</Link>
            </div>
        })}
    </div>
    const linksToUsJSX = <div className={classes.topLinks}>
        {linksToUs.map(link => {
            return <div key={uuidv4()} className={classes.linkContainer}>
                <Link to={link.id}>{link.name}</Link>
            </div>
        })}
    </div>
    const linksToRightsJSX = <div className={classes.rights}>
        {linksToRights.map(link => {
            return <div key={uuidv4()} className={classes.linkContainer}>
                <Link to={link.id}>{link.name}</Link>
            </div>
        })}
    </div>

    return (
        <footer>
            <div className={classes.footer}>
                <div className={classes.top}>
                    <div className={classes.subscribe}>
                        <Subscribe/>
                    </div>
                    <div className={classes.catalog}>
                        <h3>Каталог</h3>
                        {linksParentCategoriesJSX}
                    </div>
                    <div className={classes.info}>
                        <h3>Інформація</h3>
                        {linksToInformationJSX}
                    </div>
                    <div className={classes.company}>
                        <h3>Ми</h3>
                        {linksToUsJSX}
                    </div>
                </div>
                <div className={classes.bottom}>
                    <div className={classes.logo}>
                        <img src={logo} alt='logotype'/>
                    </div>
                    {linksToRightsJSX}
                    <div className={classes.socials}>
                        <Link to={linksToSocials[0].path}>
                            <IcoInstagram/>
                        </Link>
                        <Link to={linksToSocials[1].path}>
                            <IcoFacebook/>
                        </Link>
                        <Link to={linksToSocials[2].path}>
                            <IcoTelegram/>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
