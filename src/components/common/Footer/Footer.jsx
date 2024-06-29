import React from 'react';
import classes from './Footer.module.css';
import {v4 as uuidv4} from 'uuid';
import {Link} from "react-router-dom";
import Subscribe from "./Subscribe/Subscribe";

import ico_instagram from './../../../assets/images/ico_instagram.png';
import ico_facebook from './../../../assets/images/ico_facebook.png';
import ico_telegram from './../../../assets/images/ico_telegram.png';

import linksToCategories from '../../../data/linksToCategories.json';
import linksToInformation from './../../../data/linksToInformation.json';
import linksToUs from './../../../data/linksToUs.json';
import linksToRights from './../../../data/linksToRights.json';
import linksToSocials from './../../../data/linksToSocials.json';


const Footer = () => {
    const linksToCategoriesJSX = <div className={classes.links}>
        {linksToCategories.map(link => {
            return <Link key={uuidv4()} to={link.id}>{link.name}</Link>
        })}
    </div>
    const linksToInformationJSX = <div className={classes.links}>
        {linksToInformation.map(link => {
            return <Link key={uuidv4()} to={link.id}>{link.name}</Link>
        })}
    </div>
    const linksToUsJSX = <div className={classes.links}>
        {linksToUs.map(link => {
            return <Link key={uuidv4()} to={link.id}>{link.name}</Link>
        })}
    </div>
    const linksToRightsJSX = <div className={classes.rights}>
        {linksToRights.map(link => {
            return <Link key={uuidv4()} to={link.id}>{link.name}</Link>
        })}
    </div>

    return (
        <footer>
            <div className={classes.wrapper}>
                <div className={classes.mainContent}>
                    <div className={classes.subscribe}>
                        <Subscribe/>
                    </div>
                    <div className={classes.catalog}>
                        <h3>Каталог</h3>
                        {linksToCategoriesJSX}
                    </div>
                    <div className={classes.info}>
                        <h3>Информация</h3>
                        {linksToInformationJSX}
                    </div>
                    <div className={classes.company}>
                        <h3>Мы</h3>
                        {linksToUsJSX}
                    </div>
                </div>
                <div className={classes.secondaryContent}>
                    <h2 className={classes.logo}>BLOSSOM</h2>
                    {linksToRightsJSX}
                    <div className={classes.socials}>
                        <Link to={linksToSocials[0].id}>
                            <img src={ico_instagram} alt='instagram'/>
                        </Link>
                        <Link to={linksToSocials[1].id}>
                            <img src={ico_facebook} alt='facebook'/>
                        </Link>
                        <Link to={linksToSocials[2].id}>
                            <img src={ico_telegram} alt='telegram'/>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
