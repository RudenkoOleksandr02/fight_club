import React, { useState, useEffect } from 'react';
import classes from './Skeleton.module.css';

const Skeleton = ({ src, alt, classNameSkeleton, classNameImage, onClick = () => {}}) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setLoading(false);
        };
        img.onerror = () => {
            setLoading(false);
        };

        return () => {
            img.onload = null;
            img.onerror = null;
        };
    }, [src]);

    if (loading) {
        return <div className={classes.skeleton + ' ' + classNameSkeleton}/>
    }

    return <img src={src} alt={alt} className={classNameImage} onClick={onClick}/>

};

export default Skeleton;