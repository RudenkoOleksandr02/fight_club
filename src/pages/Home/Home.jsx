import React from 'react';
import Banner from "../../components/UI/Banner/Banner";
import CardList from "../../containers/CardList/CardList";
import classes from './Home.module.css'
import background from './../../assets/images/BG.png'



const Home = () => {
    return (
        <main className={classes.main}>
            <div className={classes.background}>
                <img src={background}/>
            </div>
            <Banner/>
            <CardList title='Новинки' id="first-card-list"/>
            <CardList title='Акции и скидки'/>
            <CardList title='Популярные товары'/>
        </main>
    );
};

export default Home;