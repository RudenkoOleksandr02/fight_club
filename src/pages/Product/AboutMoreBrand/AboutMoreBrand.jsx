import React from 'react';
import classes from './AboutMoreBrand.module.css';

// --DATA--
import image from './../../../assets/images/chanel.png';
import ButtonWithIcoRow from "../../../components/UI/Buttons/ButtonWithIcoRow/ButtonWithIcoRow";

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
                <ButtonWithIcoRow>Подробнее</ButtonWithIcoRow>
                <ButtonWithIcoRow>Другие товары</ButtonWithIcoRow>
            </div>
        </div>
    );
};

export default AboutMoreBrand;