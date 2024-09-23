import React, {useEffect, useState} from 'react';
import classes from './Brands.module.css';
import Folding from "../../Buttons/Folding/Folding";
import Checkbox from "../../inputs/Checkbox/Checkbox";

const Brands = ({
                    brands,
                    setBrandIds,
                    brandIds,
                    isOpen = false,
                    modificationStyle = {
                        color: '_',
                        fontSize: '20px',
                        fontWeight: '500',
                    }
                }) => {
    const [localBrands, setLocalBrands] = useState([]);
    const [isOpenBrands, setIsOpenBrands] = useState(isOpen);

    useEffect(() => {
        setLocalBrands(brands);
    }, [brands]);

    const handleChangeBrand = (e, brandId) => {
        if (e.target.checked) {
            setBrandIds(prevIds => [...prevIds, brandId]);
        } else {
            setBrandIds(prevIds => prevIds.filter(id => id !== brandId));
        }
    };

    return (
        <div className={classes.brands}>
            <Folding
                isOpen={isOpenBrands}
                handleClick={() => setIsOpenBrands(prevState => !prevState)}
                contentBtn='Бренди'
                modificationStyleBtn={{
                    color: modificationStyle.color,
                    fontSize: modificationStyle.fontSize,
                    fontWeight: modificationStyle.fontWeight
                }}
                contentDropdown={localBrands.map(brand => (
                    <div className={classes.brand} key={brand.id}>
                        <Checkbox
                            checked={brandIds.includes(brand.id)}
                            onChange={e => handleChangeBrand(e, brand.id)}
                            style={modificationStyle.color}
                            text={`${brand.option} (${brand.productsAmount})`}
                        />
                    </div>
                ))}
            />
        </div>
    );
};

export default Brands;