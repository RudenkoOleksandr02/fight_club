import React from 'react';
import classes from './Subscribe.module.css';
import {ReactComponent as IcoArrow} from "../../../../assets/images/arrows/ico_arrow1.svg";

const Subscribe = () => {
    return (
        <section>
            <div className={classes.wrapper}>
                <h2>Subscribe</h2>
                <form className={classes.sendEmail}>
                    <input type='email' placeholder='Email'/>
                    <button>
                        <IcoArrow/>
                    </button>
                </form>
                <p>Подпишитесь и получите скидку 10% на первый заказ</p>
            </div>
        </section>
    );
};

export default Subscribe;