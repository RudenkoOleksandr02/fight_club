import React from 'react';
import classes from './AboutMoreBrand.module.css';
import SecondaryButton from "../../../components/ui/Buttons/SecondaryButton/SecondaryButton";
import {useNavigate} from "react-router-dom";

const AboutMoreBrand = ({brand}) => {
    const navigate = useNavigate();

    if (brand === null) return null

    return (
        <div className={classes.wrapper}>
            <div className={classes.content}>
                <div className={classes.inner}>
                    <h3>{brand.title}</h3>
                    <p>{brand.description}</p>
                </div>
                <img src={brand.logoImageUrl} alt='company'/>
            </div>
            <div className={classes.btn}>
                <SecondaryButton handleClick={() => navigate(`/brands/${brand.brandId}`)}>
                    Інші товари
                </SecondaryButton>
            </div>
        </div>
    );
};

export default AboutMoreBrand;