import React from 'react';
import {Link} from "react-router-dom";

const Breadcrumbs = ({links}) => {
    return (
        <div>
            <Link to='/'>BLOSSOM</Link>
            {links.map(link => {
                return <Link to={link.id}>
                    {link.name}
                </Link>
            })}
        </div>
    );
};

export default Breadcrumbs;