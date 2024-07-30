import React, {useEffect, useState} from 'react';
import CitySelector from './Selectors/CitySelector';
import DepartmentSelector from './Selectors/DepartmentSelector';
import classes from './NovaPoshta.module.css'

const NovaPoshta = ({handleSetDeliveryInfo, errorsCity, errorsDepartment}) => {
    const [city, setCity] = useState(null);

    useEffect(() => {
        if (city !== null && city !== undefined) {
            handleSetDeliveryInfo(city.name, 'city')
        }
    }, [city])

    return (
        <div className={classes.wrapper}>
            <CitySelector setCity={setCity} errorsCity={errorsCity}/>
            <DepartmentSelector cityRef={city !== null ? city.id : null} handleSetDeliveryInfo={handleSetDeliveryInfo} errorsDepartment={errorsDepartment}/>
        </div>
    );
};

export default NovaPoshta;
