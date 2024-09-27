import React from 'react';
import classes from './Subscribe.module.css';
import FormSelect from "../../../ui/inputs/FormSelect/FormSelect";

const Subscribe = () => {
    return (
        <section>
            <div className={classes.wrapper}>
                <h2>Підпишіться</h2>
                <div className={classes.form}>
                    <FormSelect type='email' text='Email' color='primary' disabled={true}/>
                </div>
                <p>Підписуйтесь та дізнавайтеся про акції та новинки!</p>
            </div>
        </section>
    );
};

export default Subscribe;