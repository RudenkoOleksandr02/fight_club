import React from 'react';
import classes from './Subscribe.module.css';
import FormSelect from "../../FormSelect/FormSelect";

const Subscribe = () => {
    return (
        <section>
            <div className={classes.wrapper}>
                <h2>Subscribe</h2>
                <div className={classes.form}>
                    <FormSelect type='email' text='Email' color='primary'/>
                </div>
                <p>Подпишитесь и получите скидку 10% на первый заказ</p>
            </div>
        </section>
    );
};

export default Subscribe;