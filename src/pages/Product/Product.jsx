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
    "images": [img1,img2,img3,img4,img5, img5, img5],
    "brand": "Brand D",
    "price": 599.99,
    "discount": 20,
    "isNew": true,
    "rating": 4.3,
    "inStock": true,
    "numberOfReviews": 12000,
    "numberOfPurchases": 156,
    "numberOfViews": 1300,
    "article": '283837',
    "options": [
        "Варіант 1",
        "Варіант 2"
    ],
    "categories": [
        "Парфумерія",
        "Чоловіча парфумерія"
    ],
    "reviews": [
        {"name": "Denis", "review": "Высокоэффективная сыворотка для сияния кожи"},
        {"name": "Maksim", "review": "Высокоэффективная сыворотка для сияния кожи"}
    ],
    "characteristics": [
        {"title": "Стан", "desc": "Нове"},
        {"title": "Код виробництва", "desc": "12345678"},
        {"title": "Колір вставки", "desc": "Різнокольоровий"},
        {"title": "value", "desc": "value"},
        {"title": "value", "desc": "value"},
        {"title": "value", "desc": "value"},
    ],
    "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultrices justo ac ante pretium, et aliquam ipsum pharetra. Fusce urna quam, semper at odio quis, finibus vulputate diam. Sed mattis ornare nulla ac malesuada. Quisque sagittis est ex, at faucibus enim aliquam eu. Aenean mi felis, mollis at molestie vitae, ultricies ac ipsum. Aliquam erat volutpat. Proin commodo hendrerit libero a blandit. Donec vehicula est vitae sagittis congue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum luctus urna elit, eget lacinia."
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