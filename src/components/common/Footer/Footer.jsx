import React from 'react';
import classes from './Footer.module.css';
import {v4 as uuidv4} from 'uuid';
import {Link} from "react-router-dom";
import Subscribe from "./Subscribe/Subscribe";

import ico_instagram from './../../../assets/images/ico_instagram.png';
import ico_facebook from './../../../assets/images/ico_facebook.png';
import ico_telegram from './../../../assets/images/ico_telegram.png';

// --DATA--
import categories from './../../../data/categories_product.json';

const Footer = () => {
    const linksForCatalogJSX = (
        <div className={classes.links}>
            {categories.map(category => {
                return <Link key={uuidv4()}>
                    {category.title}
                </Link>
            })}
        </div>
    )
    const linksForInfoJSX = (
        <div className={classes.links}>
            <Link>FAQ</Link>
            <Link>Блог</Link>
            <Link>Поддержка</Link>
            <Link>Доставка и оплата</Link>
        </div>
    )
    const linksForCompanyJSX = (
        <div className={classes.links}>
            <Link>О нас</Link>
            <Link>Контакты</Link>
        </div>
    )

    return (
        <footer>
            <div className={classes.wrapper}>
                <div className={classes.mainContent}>
                    <div className={classes.subscribe}>
                        <Subscribe/>
                    </div>
                    <div className={classes.catalog}>
                        <h3>Каталог</h3>
                        {linksForCatalogJSX}
                    </div>
                    <div className={classes.info}>
                        <h3>Информация</h3>
                        {linksForInfoJSX}
                    </div>
                    <div className={classes.company}>
                        <h3>Мы</h3>
                        {linksForCompanyJSX}
                    </div>
                </div>
                <div className={classes.secondaryContent}>
                    <h2 className={classes.logo}>BLOSSOM</h2>
                    <div className={classes.rights}>
                        <Link>Политика конфиденциальности</Link>
                        <Link>Права пользователя</Link>
                        <Link>Файлы подгрузки</Link>
                    </div>
                    <div className={classes.socials}>
                        <Link>
                            <img src={ico_instagram} alt='instagram'/>
                        </Link>
                        <Link>
                            <img src={ico_facebook} alt='instagram'/>
                        </Link>
                        <Link>
                            <img src={ico_telegram} alt='instagram'/>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;