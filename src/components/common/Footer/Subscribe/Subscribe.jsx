import React from 'react';
import classes from './Subscribe.module.css';
import ico_arrow from './../../../../assets/images/ico_arrow.png'

const Subscribe = () => {
    return (
        <section>
            <div className={classes.wrapper}>
                <h2>Subscribe</h2>
                <form className={classes.sendEmail}>
                    <input type='email' placeholder='Email'/>
                    <button>
                        <img src={ico_arrow} alt='send email'/>
                    </button>
                </form>
                <p>Подпишитесь и получите скидку 10% на первый заказ</p>
            </div>
        </section>
    );
};

export default Subscribe;