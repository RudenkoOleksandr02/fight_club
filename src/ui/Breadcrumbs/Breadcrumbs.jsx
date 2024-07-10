import React from 'react';
import {Link} from "react-router-dom";

const Breadcrumbs = ({links}) => {
    return (
        <div>
            <Link to='/'>Головна сторінка</Link>
            {links.map(link => {
                return <Link to={link.id}>
                    {link.name}
                </Link>
            })}
        </div>
    );
};

export default Breadcrumbs;