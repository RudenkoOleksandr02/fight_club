import React from 'react';
import classes from './Contacts.module.css'
import MapComponent from "./MapComponent/MapComponent";
import LeftPanel from "./LeftPanel/LeftPanel";
import Contact from "./Contact/Contact";
import Breadcrumbs from "../../components/ui/Breadcrumbs/Breadcrumbs";



const Contacts = () => {
    return (
        <section className={classes.wrapper}>
            <div className={classes.breadCrumbs}>
                <Breadcrumbs links={[{id: '/contacts', name: 'Контакти'}]}/>
            </div>
            <div className={classes.main}>
                <LeftPanel/>
                <MapComponent/>
                <Contact/>
            </div>
        </section>
    );
};

export default Contacts;