import React from 'react';
import classes from './Subscribe.module.css';
import FormSelect from "../../../ui/inputs/FormSelect/FormSelect";

const Subscribe = () => {
    return (
        <section>
            <div className={classes.wrapper}>
                <h2>Підпишіться</h2>
                <div className={classes.form}>
                    <FormSelect type='email' text='Email' color='primary'/>
                </div>
                <p>Підпишіться та отримайте знижку 10% на перше замовлення!</p>
            </div>
        </section>
    );
};

export default Subscribe;