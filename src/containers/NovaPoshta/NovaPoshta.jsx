import React, { useState } from 'react';
import CitySelector from './Selectors/CitySelector';
import DepartmentSelector from './Selectors/DepartmentSelector';
import classes from './NovaPoshta.module.css'

const NovaPoshta = () => {
    const [city, setCity] = useState(null);

    return (
        <div className={classes.wrapper}>
            <CitySelector setCity={setCity} />
            <DepartmentSelector cityRef={city !== null ? city.id : null} />
        </div>
    );
};

export default NovaPoshta;
