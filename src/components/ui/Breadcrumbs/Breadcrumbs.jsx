import React from 'react';
import {Link} from "react-router-dom";
import classes from './Breadcrumbs.module.css';

const Breadcrumbs = ({links}) => {
    return (
        <div className={classes.wrapper}>
            <Link to='/'>BLOSSOM</Link>
            {links && links.length > 0 && links.map((link, index) => (
                <React.Fragment key={link.id || index}>
                    <span className={classes.separator}> / </span>
                    {links.length - 1 === index ? (
                        <span className={classes.active}>{link.name}</span>
                    ) : (
                        <Link to={`${link.id}`}>
                            {link.name}
                        </Link>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Breadcrumbs;
