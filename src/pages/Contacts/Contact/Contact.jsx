import React from 'react';
import classes from "./Contact.module.css";
import DieBlock from "../../../components/ui/blocks/DieBlock/DieBlock";
import Input from "../../../components/ui/inputs/Input/Input";
import InputMobile from "../../../components/ui/inputs/Input/InputMobile";
import PrimaryButton from "../../../components/ui/Buttons/PrimaryButton/PrimaryButton";
import {ReactComponent as IcoFacebook} from '../../../assets/images/socials_footer/ico_facebook.svg';
import {ReactComponent as IcoTelegram} from '../../../assets/images/socials_footer/ico_telegram.svg';
import {ReactComponent as IcoInstagram} from '../../../assets/images/socials_footer/ico_instagram.svg';
import linksToSocials from './../../../data/linksToSocials.json';
import {Link} from "react-router-dom";

const Contact = () => {
    return (
        <div className={classes.wrapper}>
            <DieBlock>
                <h3>Зворотній зв'язок</h3>
                <p>(Тимчасово не працює)</p>
                <form onSubmit={e => e.preventDefault()} className={classes.form}>
                    <Input
                        value=''
                        onChange={() => {}}
                        type='text'
                        placeholder="Ім'я*"
                        errors={[]}
                        disabled={true}
                    />
                    <Input
                        value=''
                        onChange={() => {}}
                        type='text'
                        placeholder="Прізвище*" errors={[]}
                        disabled={true}
                    />
                    <InputMobile
                        value=''
                        placeholder='Телефон*'
                        handleChangePhoneNumber={() => {}}
                        errors={[]}
                        disabled={true}
                    />
                    <Input
                        value=''
                        onChange={() => {}}
                        type='email'
                        placeholder="E-mail*"
                        errors={[]}
                        disabled={true}
                    />
                </form>
                <div className={classes.submit}>
                    <PrimaryButton disabled={true} onClick={() => {}}>Відправити</PrimaryButton>
                    <span>або</span>
                    <div className={classes.socials}>
                        <Link to={linksToSocials[0].path}>
                            <IcoInstagram/>
                        </Link>
                        <Link to={linksToSocials[1].path}>
                            <IcoFacebook/>
                        </Link>
                        <Link to={linksToSocials[2].path}>
                            <IcoTelegram/>
                        </Link>
                    </div>
                </div>
            </DieBlock>
        </div>
    );
};

export default Contact;