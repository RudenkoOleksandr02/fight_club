import React from 'react';
import classes from "./Contact.module.css";
import Die from "../../../ui/components/Die/Die";
import Input from "../../../ui/components/inputs/Input/Input";
import InputMobile from "../../../ui/components/inputs/Input/InputMobile";
import PrimaryButton from "../../../ui/components/Buttons/PrimaryButton/PrimaryButton";
import {ReactComponent as IcoFacebook} from '../../../assets/images/socials_contacts/ico_facebook.svg';
import {ReactComponent as IcoTelegram} from '../../../assets/images/socials_contacts/ico_telegram.svg';
import {ReactComponent as IcoInstagram} from '../../../assets/images/socials_contacts/ico_instagram.svg';
import linksToSocials from './../../../data/linksToSocials.json';
import {Link} from "react-router-dom";

const Contact = () => {
    return (
        <div className={classes.wrapper}>
            <Die>
                <h3>Зворотній зв'язок</h3>
                <form onSubmit={e => e.preventDefault()} className={classes.form}>
                    <Input value='' onChange={() => {}} type='text' placeholder="Ім'я*" errors={[]}/>
                    <Input value='' onChange={() => {}} type='text' placeholder="Прізвище*" errors={[]}/>
                    <InputMobile placeholder='Телефон*' handleSetPhoneInUserInfo={() => {}} errors={[]}/>
                    <Input value='' onChange={() => {}} type='email' placeholder="E-mail*" errors={[]}/>
                </form>
                <div className={classes.submit}>
                    <PrimaryButton>Відправити</PrimaryButton>
                    <span>або</span>
                    <div className={classes.socials}>
                        <Link to={linksToSocials[0].id}>
                            <IcoInstagram/>
                        </Link>
                        <Link to={linksToSocials[1].id}>
                            <IcoFacebook/>
                        </Link>
                        <Link to={linksToSocials[2].id}>
                            <IcoTelegram/>
                        </Link>
                    </div>
                </div>
            </Die>
        </div>
    );
};

export default Contact;