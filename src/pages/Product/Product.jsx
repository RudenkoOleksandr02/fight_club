import React, {useEffect, useState} from 'react';
import classes from './Product.module.css'

// --DATA--
import img1 from '../../assets/images/product/1.png'
import img2 from '../../assets/images/product/2.png'
import img3 from '../../assets/images/product/3.png'
import img4 from '../../assets/images/product/4.png'
import img5 from '../../assets/images/product/5.png'
import ProductDesktop from "./ProductDesktop/ProductDesktop";
import ProductMobile from "./ProductMobile/ProductMobile";
const data = {
    "id": 8,
    "name": "Чоловічий парфум 2",
    "nameEng": "Men's Perfume 2",
    "images": [img1,img2,img3,img4,img5],
    "brand": "Brand D",
    "price": 599.99,
    "discount": 20,
    "isNew": true,
    "rating": 4.3,
    "inStock": true,
    "categories": [
        "Парфумерія",
        "Чоловіча парфумерія"
    ],
    "reviews": [
        {"name": "Denis", "review": "Высокоэффективная сыворотка для сияния кожи"},
        {"name": "Maksim", "review": "Высокоэффективная сыворотка для сияния кожи"}
    ]
}

const Product = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 999);
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 999);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section>
            <div className={classes.wrapper}>
                {isSmallScreen
                    ? <ProductMobile data={data}/>
                    : <ProductDesktop data={data}/>
                }
            </div>
        </section>
    );
};

export default Product;