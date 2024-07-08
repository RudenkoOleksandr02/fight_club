import React from 'react';
import classes from './AboutMoreBrand.module.css';

// --DATA--
import image from './../../../assets/images/chanel.png';
import SecondaryButton from "../../../components/UI/Buttons/SecondaryButton/SecondaryButton";

const data = {
    image,
    title: 'Узнайте больше О бренде',
    text: 'Шла саша по шоссе и сосал сушку а потом пришел олень и скушал колотушку колотушка непростая спер у бабы ее бабая',
    links: ['/', '/']
}

const AboutMoreBrand = () => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.content}>
                <div className={classes.inner}>
                    <h3>{data.title}</h3>
                    <p>{data.text}</p>
                </div>
                <img src={data.image} alt='company' />
            </div>
            <div className={classes.bnts}>
                <SecondaryButton>Подробнее</SecondaryButton>
                <SecondaryButton>Другие товары</SecondaryButton>
            </div>
        </div>
    );
};

export default AboutMoreBrand;