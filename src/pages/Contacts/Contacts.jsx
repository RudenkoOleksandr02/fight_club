import React from 'react';
import classes from './Contacts.module.css'
import MapComponent from "./MapComponent/MapComponent";
import RightPanel from "./RightPanel/RightPanel";
import Contact from "./Contact/Contact";



const Contacts = () => {
    return (
        <section className={classes.wrapper}>
            <RightPanel/>
            <MapComponent/>
            <Contact/>
        </section>
    );
};

export default Contacts;