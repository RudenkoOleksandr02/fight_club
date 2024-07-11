import React from 'react';
import {Pagination} from "swiper/modules";
import classes from './AlsoBuy.module.css'

// --DATA--
import img1 from '../../assets/images/other/product/1.png'
import img2 from '../../assets/images/other/product/2.png'
import img3 from '../../assets/images/other/product/3.png'
import img4 from '../../assets/images/other/product/4.png'
import img5 from '../../assets/images/other/product/5.png'
import SwiperList from "../SwiperList/SwiperList";
const productsArr = [
    {
        "id": 8,
        "name": "Чоловічий парфум 2",
        "nameEng": "Men's Perfume 2",
        "images": [
            img1,
            img2,
            img3,
            img4,
            img5,
        ],
        "brand": "Brand D",
        "price": 599.99,
        "discount": 20,
        "isNew": true,
        "rating": 4.3,
        "inStock": true,
        "numberOfReviews": 12000,
        "numberOfPurchases": 156,
        "numberOfViews": 1300,
        "article": "283837",
        "options": [
            "Варіант 1",
            "Варіант 2"
        ],
        "categories": [
            "Парфумерія",
            "Чоловіча парфумерія"
        ],
        "dieNumbers": [
            1,
            3,
            5
        ],
        "reviews": [
            {
                "name": "Denis",
                "review": "Высокоэффективная сыворотка для сияния кожи",
                "rating": 5,
                "date": "12.11.2002"
            },
            {
                "name": "Denis",
                "review": "Высокоэффективная сыворотка для сияния кожи",
                "rating": 5,
                "date": "12.11.2002"
            },
            {
                "name": "Denis",
                "review": "Высокоэффективная сыворотка для сияния кожи",
                "rating": 5,
                "date": "12.11.2002"
            }
        ],
        "characteristics": [
            {
                "title": "Стан",
                "desc": "Нове"
            },
            {
                "title": "Код виробництва",
                "desc": "12345678"
            },
            {
                "title": "Колір вставки",
                "desc": "Різнокольоровий"
            },
            {
                "title": "value",
                "desc": "value"
            },
            {
                "title": "value",
                "desc": "value"
            },
            {
                "title": "value",
                "desc": "value"
            }
        ],
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultrices justo ac ante pretium, et aliquam ipsum pharetra. Fusce urna quam, semper at odio quis, finibus vulputate diam. Sed mattis ornare nulla ac malesuada. Quisque sagittis est ex, at faucibus enim aliquam eu. Aenean mi felis, mollis at molestie vitae, ultricies ac ipsum. Aliquam erat volutpat. Proin commodo hendrerit libero a blandit. Donec vehicula est vitae sagittis congue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum luctus urna elit, eget lacinia."
    },
    {
        "id": 8,
        "name": "Чоловічий парфум 2",
        "nameEng": "Men's Perfume 2",
        "images": [
            img1,
            img2,
            img3,
            img4,
            img5,
        ],
        "brand": "Brand D",
        "price": 599.99,
        "discount": 20,
        "isNew": true,
        "rating": 4.3,
        "inStock": true,
        "numberOfReviews": 12000,
        "numberOfPurchases": 156,
        "numberOfViews": 1300,
        "article": "283837",
        "options": [
            "Варіант 1",
            "Варіант 2"
        ],
        "categories": [
            "Парфумерія",
            "Чоловіча парфумерія"
        ],
        "dieNumbers": [
            1,
            3,
            5
        ],
        "reviews": [
            {
                "name": "Denis",
                "review": "Высокоэффективная сыворотка для сияния кожи",
                "rating": 5,
                "date": "12.11.2002"
            },
            {
                "name": "Denis",
                "review": "Высокоэффективная сыворотка для сияния кожи",
                "rating": 5,
                "date": "12.11.2002"
            },
            {
                "name": "Denis",
                "review": "Высокоэффективная сыворотка для сияния кожи",
                "rating": 5,
                "date": "12.11.2002"
            }
        ],
        "characteristics": [
            {
                "title": "Стан",
                "desc": "Нове"
            },
            {
                "title": "Код виробництва",
                "desc": "12345678"
            },
            {
                "title": "Колір вставки",
                "desc": "Різнокольоровий"
            },
            {
                "title": "value",
                "desc": "value"
            },
            {
                "title": "value",
                "desc": "value"
            },
            {
                "title": "value",
                "desc": "value"
            }
        ],
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultrices justo ac ante pretium, et aliquam ipsum pharetra. Fusce urna quam, semper at odio quis, finibus vulputate diam. Sed mattis ornare nulla ac malesuada. Quisque sagittis est ex, at faucibus enim aliquam eu. Aenean mi felis, mollis at molestie vitae, ultricies ac ipsum. Aliquam erat volutpat. Proin commodo hendrerit libero a blandit. Donec vehicula est vitae sagittis congue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum luctus urna elit, eget lacinia."
    },
    {
        "id": 8,
        "name": "Чоловічий парфум 2",
        "nameEng": "Men's Perfume 2",
        "images": [
            img1,
            img2,
            img3,
            img4,
            img5,
        ],
        "brand": "Brand D",
        "price": 599.99,
        "discount": 20,
        "isNew": true,
        "rating": 4.3,
        "inStock": true,
        "numberOfReviews": 12000,
        "numberOfPurchases": 156,
        "numberOfViews": 1300,
        "article": "283837",
        "options": [
            "Варіант 1",
            "Варіант 2"
        ],
        "categories": [
            "Парфумерія",
            "Чоловіча парфумерія"
        ],
        "dieNumbers": [
            1,
            3,
            5
        ],
        "reviews": [
            {
                "name": "Denis",
                "review": "Высокоэффективная сыворотка для сияния кожи",
                "rating": 5,
                "date": "12.11.2002"
            },
            {
                "name": "Denis",
                "review": "Высокоэффективная сыворотка для сияния кожи",
                "rating": 5,
                "date": "12.11.2002"
            },
            {
                "name": "Denis",
                "review": "Высокоэффективная сыворотка для сияния кожи",
                "rating": 5,
                "date": "12.11.2002"
            }
        ],
        "characteristics": [
            {
                "title": "Стан",
                "desc": "Нове"
            },
            {
                "title": "Код виробництва",
                "desc": "12345678"
            },
            {
                "title": "Колір вставки",
                "desc": "Різнокольоровий"
            },
            {
                "title": "value",
                "desc": "value"
            },
            {
                "title": "value",
                "desc": "value"
            },
            {
                "title": "value",
                "desc": "value"
            }
        ],
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultrices justo ac ante pretium, et aliquam ipsum pharetra. Fusce urna quam, semper at odio quis, finibus vulputate diam. Sed mattis ornare nulla ac malesuada. Quisque sagittis est ex, at faucibus enim aliquam eu. Aenean mi felis, mollis at molestie vitae, ultricies ac ipsum. Aliquam erat volutpat. Proin commodo hendrerit libero a blandit. Donec vehicula est vitae sagittis congue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum luctus urna elit, eget lacinia."
    },
    {
        "id": 8,
        "name": "Чоловічий парфум 2",
        "nameEng": "Men's Perfume 2",
        "images": [
            img1,
            img2,
            img3,
            img4,
            img5,
        ],
        "brand": "Brand D",
        "price": 599.99,
        "discount": 20,
        "isNew": true,
        "rating": 4.3,
        "inStock": true,
        "numberOfReviews": 12000,
        "numberOfPurchases": 156,
        "numberOfViews": 1300,
        "article": "283837",
        "options": [
            "Варіант 1",
            "Варіант 2"
        ],
        "categories": [
            "Парфумерія",
            "Чоловіча парфумерія"
        ],
        "dieNumbers": [
            1,
            3,
            5
        ],
        "reviews": [
            {
                "name": "Denis",
                "review": "Высокоэффективная сыворотка для сияния кожи",
                "rating": 5,
                "date": "12.11.2002"
            },
            {
                "name": "Denis",
                "review": "Высокоэффективная сыворотка для сияния кожи",
                "rating": 5,
                "date": "12.11.2002"
            },
            {
                "name": "Denis",
                "review": "Высокоэффективная сыворотка для сияния кожи",
                "rating": 5,
                "date": "12.11.2002"
            }
        ],
        "characteristics": [
            {
                "title": "Стан",
                "desc": "Нове"
            },
            {
                "title": "Код виробництва",
                "desc": "12345678"
            },
            {
                "title": "Колір вставки",
                "desc": "Різнокольоровий"
            },
            {
                "title": "value",
                "desc": "value"
            },
            {
                "title": "value",
                "desc": "value"
            },
            {
                "title": "value",
                "desc": "value"
            }
        ],
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultrices justo ac ante pretium, et aliquam ipsum pharetra. Fusce urna quam, semper at odio quis, finibus vulputate diam. Sed mattis ornare nulla ac malesuada. Quisque sagittis est ex, at faucibus enim aliquam eu. Aenean mi felis, mollis at molestie vitae, ultricies ac ipsum. Aliquam erat volutpat. Proin commodo hendrerit libero a blandit. Donec vehicula est vitae sagittis congue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum luctus urna elit, eget lacinia."
    },
    {
        "id": 8,
        "name": "Чоловічий парфум 2",
        "nameEng": "Men's Perfume 2",
        "images": [
            img1,
            img2,
            img3,
            img4,
            img5,
        ],
        "brand": "Brand D",
        "price": 599.99,
        "discount": 20,
        "isNew": true,
        "rating": 4.3,
        "inStock": true,
        "numberOfReviews": 12000,
        "numberOfPurchases": 156,
        "numberOfViews": 1300,
        "article": "283837",
        "options": [
            "Варіант 1",
            "Варіант 2"
        ],
        "categories": [
            "Парфумерія",
            "Чоловіча парфумерія"
        ],
        "dieNumbers": [
            1,
            3,
            5
        ],
        "reviews": [
            {
                "name": "Denis",
                "review": "Высокоэффективная сыворотка для сияния кожи",
                "rating": 5,
                "date": "12.11.2002"
            },
            {
                "name": "Denis",
                "review": "Высокоэффективная сыворотка для сияния кожи",
                "rating": 5,
                "date": "12.11.2002"
            },
            {
                "name": "Denis",
                "review": "Высокоэффективная сыворотка для сияния кожи",
                "rating": 5,
                "date": "12.11.2002"
            }
        ],
        "characteristics": [
            {
                "title": "Стан",
                "desc": "Нове"
            },
            {
                "title": "Код виробництва",
                "desc": "12345678"
            },
            {
                "title": "Колір вставки",
                "desc": "Різнокольоровий"
            },
            {
                "title": "value",
                "desc": "value"
            },
            {
                "title": "value",
                "desc": "value"
            },
            {
                "title": "value",
                "desc": "value"
            }
        ],
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultrices justo ac ante pretium, et aliquam ipsum pharetra. Fusce urna quam, semper at odio quis, finibus vulputate diam. Sed mattis ornare nulla ac malesuada. Quisque sagittis est ex, at faucibus enim aliquam eu. Aenean mi felis, mollis at molestie vitae, ultricies ac ipsum. Aliquam erat volutpat. Proin commodo hendrerit libero a blandit. Donec vehicula est vitae sagittis congue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum luctus urna elit, eget lacinia."
    },
    {
        "id": 8,
        "name": "Чоловічий парфум 2",
        "nameEng": "Men's Perfume 2",
        "images": [
            img1,
            img2,
            img3,
            img4,
            img5,
        ],
        "brand": "Brand D",
        "price": 599.99,
        "discount": 20,
        "isNew": true,
        "rating": 4.3,
        "inStock": true,
        "numberOfReviews": 12000,
        "numberOfPurchases": 156,
        "numberOfViews": 1300,
        "article": "283837",
        "options": [
            "Варіант 1",
            "Варіант 2"
        ],
        "categories": [
            "Парфумерія",
            "Чоловіча парфумерія"
        ],
        "dieNumbers": [
            1,
            3,
            5
        ],
        "reviews": [
            {
                "name": "Denis",
                "review": "Высокоэффективная сыворотка для сияния кожи",
                "rating": 5,
                "date": "12.11.2002"
            },
            {
                "name": "Denis",
                "review": "Высокоэффективная сыворотка для сияния кожи",
                "rating": 5,
                "date": "12.11.2002"
            },
            {
                "name": "Denis",
                "review": "Высокоэффективная сыворотка для сияния кожи",
                "rating": 5,
                "date": "12.11.2002"
            }
        ],
        "characteristics": [
            {
                "title": "Стан",
                "desc": "Нове"
            },
            {
                "title": "Код виробництва",
                "desc": "12345678"
            },
            {
                "title": "Колір вставки",
                "desc": "Різнокольоровий"
            },
            {
                "title": "value",
                "desc": "value"
            },
            {
                "title": "value",
                "desc": "value"
            },
            {
                "title": "value",
                "desc": "value"
            }
        ],
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultrices justo ac ante pretium, et aliquam ipsum pharetra. Fusce urna quam, semper at odio quis, finibus vulputate diam. Sed mattis ornare nulla ac malesuada. Quisque sagittis est ex, at faucibus enim aliquam eu. Aenean mi felis, mollis at molestie vitae, ultricies ac ipsum. Aliquam erat volutpat. Proin commodo hendrerit libero a blandit. Donec vehicula est vitae sagittis congue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum luctus urna elit, eget lacinia."
    },
    {
        "id": 8,
        "name": "Чоловічий парфум 2",
        "nameEng": "Men's Perfume 2",
        "images": [
            img1,
            img2,
            img3,
            img4,
            img5,
        ],
        "brand": "Brand D",
        "price": 599.99,
        "discount": 20,
        "isNew": true,
        "rating": 4.3,
        "inStock": true,
        "numberOfReviews": 12000,
        "numberOfPurchases": 156,
        "numberOfViews": 1300,
        "article": "283837",
        "options": [
            "Варіант 1",
            "Варіант 2"
        ],
        "categories": [
            "Парфумерія",
            "Чоловіча парфумерія"
        ],
        "dieNumbers": [
            1,
            3,
            5
        ],
        "reviews": [
            {
                "name": "Denis",
                "review": "Высокоэффективная сыворотка для сияния кожи",
                "rating": 5,
                "date": "12.11.2002"
            },
            {
                "name": "Denis",
                "review": "Высокоэффективная сыворотка для сияния кожи",
                "rating": 5,
                "date": "12.11.2002"
            },
            {
                "name": "Denis",
                "review": "Высокоэффективная сыворотка для сияния кожи",
                "rating": 5,
                "date": "12.11.2002"
            }
        ],
        "characteristics": [
            {
                "title": "Стан",
                "desc": "Нове"
            },
            {
                "title": "Код виробництва",
                "desc": "12345678"
            },
            {
                "title": "Колір вставки",
                "desc": "Різнокольоровий"
            },
            {
                "title": "value",
                "desc": "value"
            },
            {
                "title": "value",
                "desc": "value"
            },
            {
                "title": "value",
                "desc": "value"
            }
        ],
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultrices justo ac ante pretium, et aliquam ipsum pharetra. Fusce urna quam, semper at odio quis, finibus vulputate diam. Sed mattis ornare nulla ac malesuada. Quisque sagittis est ex, at faucibus enim aliquam eu. Aenean mi felis, mollis at molestie vitae, ultricies ac ipsum. Aliquam erat volutpat. Proin commodo hendrerit libero a blandit. Donec vehicula est vitae sagittis congue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum luctus urna elit, eget lacinia."
    },
    {
        "id": 8,
        "name": "Чоловічий парфум 2",
        "nameEng": "Men's Perfume 2",
        "images": [
            img1,
            img2,
            img3,
            img4,
            img5,
        ],
        "brand": "Brand D",
        "price": 599.99,
        "discount": 20,
        "isNew": true,
        "rating": 4.3,
        "inStock": true,
        "numberOfReviews": 12000,
        "numberOfPurchases": 156,
        "numberOfViews": 1300,
        "article": "283837",
        "options": [
            "Варіант 1",
            "Варіант 2"
        ],
        "categories": [
            "Парфумерія",
            "Чоловіча парфумерія"
        ],
        "dieNumbers": [
            1,
            3,
            5
        ],
        "reviews": [
            {
                "name": "Denis",
                "review": "Высокоэффективная сыворотка для сияния кожи",
                "rating": 5,
                "date": "12.11.2002"
            },
            {
                "name": "Denis",
                "review": "Высокоэффективная сыворотка для сияния кожи",
                "rating": 5,
                "date": "12.11.2002"
            },
            {
                "name": "Denis",
                "review": "Высокоэффективная сыворотка для сияния кожи",
                "rating": 5,
                "date": "12.11.2002"
            }
        ],
        "characteristics": [
            {
                "title": "Стан",
                "desc": "Нове"
            },
            {
                "title": "Код виробництва",
                "desc": "12345678"
            },
            {
                "title": "Колір вставки",
                "desc": "Різнокольоровий"
            },
            {
                "title": "value",
                "desc": "value"
            },
            {
                "title": "value",
                "desc": "value"
            },
            {
                "title": "value",
                "desc": "value"
            }
        ],
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultrices justo ac ante pretium, et aliquam ipsum pharetra. Fusce urna quam, semper at odio quis, finibus vulputate diam. Sed mattis ornare nulla ac malesuada. Quisque sagittis est ex, at faucibus enim aliquam eu. Aenean mi felis, mollis at molestie vitae, ultricies ac ipsum. Aliquam erat volutpat. Proin commodo hendrerit libero a blandit. Donec vehicula est vitae sagittis congue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum luctus urna elit, eget lacinia."
    },
    {
        "id": 8,
        "name": "Чоловічий парфум 2",
        "nameEng": "Men's Perfume 2",
        "images": [
            img1,
            img2,
            img3,
            img4,
            img5,
        ],
        "brand": "Brand D",
        "price": 599.99,
        "discount": 20,
        "isNew": true,
        "rating": 4.3,
        "inStock": true,
        "numberOfReviews": 12000,
        "numberOfPurchases": 156,
        "numberOfViews": 1300,
        "article": "283837",
        "options": [
            "Варіант 1",
            "Варіант 2"
        ],
        "categories": [
            "Парфумерія",
            "Чоловіча парфумерія"
        ],
        "dieNumbers": [
            1,
            3,
            5
        ],
        "reviews": [
            {
                "name": "Denis",
                "review": "Высокоэффективная сыворотка для сияния кожи",
                "rating": 5,
                "date": "12.11.2002"
            },
            {
                "name": "Denis",
                "review": "Высокоэффективная сыворотка для сияния кожи",
                "rating": 5,
                "date": "12.11.2002"
            },
            {
                "name": "Denis",
                "review": "Высокоэффективная сыворотка для сияния кожи",
                "rating": 5,
                "date": "12.11.2002"
            }
        ],
        "characteristics": [
            {
                "title": "Стан",
                "desc": "Нове"
            },
            {
                "title": "Код виробництва",
                "desc": "12345678"
            },
            {
                "title": "Колір вставки",
                "desc": "Різнокольоровий"
            },
            {
                "title": "value",
                "desc": "value"
            },
            {
                "title": "value",
                "desc": "value"
            },
            {
                "title": "value",
                "desc": "value"
            }
        ],
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultrices justo ac ante pretium, et aliquam ipsum pharetra. Fusce urna quam, semper at odio quis, finibus vulputate diam. Sed mattis ornare nulla ac malesuada. Quisque sagittis est ex, at faucibus enim aliquam eu. Aenean mi felis, mollis at molestie vitae, ultricies ac ipsum. Aliquam erat volutpat. Proin commodo hendrerit libero a blandit. Donec vehicula est vitae sagittis congue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum luctus urna elit, eget lacinia."
    },
    {
        "id": 8,
        "name": "Чоловічий парфум 2",
        "nameEng": "Men's Perfume 2",
        "images": [
            img1,
            img2,
            img3,
            img4,
            img5,
        ],
        "brand": "Brand D",
        "price": 599.99,
        "discount": 20,
        "isNew": true,
        "rating": 4.3,
        "inStock": true,
        "numberOfReviews": 12000,
        "numberOfPurchases": 156,
        "numberOfViews": 1300,
        "article": "283837",
        "options": [
            "Варіант 1",
            "Варіант 2"
        ],
        "categories": [
            "Парфумерія",
            "Чоловіча парфумерія"
        ],
        "dieNumbers": [
            1,
            3,
            5
        ],
        "reviews": [
            {
                "name": "Denis",
                "review": "Высокоэффективная сыворотка для сияния кожи",
                "rating": 5,
                "date": "12.11.2002"
            },
            {
                "name": "Denis",
                "review": "Высокоэффективная сыворотка для сияния кожи",
                "rating": 5,
                "date": "12.11.2002"
            },
            {
                "name": "Denis",
                "review": "Высокоэффективная сыворотка для сияния кожи",
                "rating": 5,
                "date": "12.11.2002"
            }
        ],
        "characteristics": [
            {
                "title": "Стан",
                "desc": "Нове"
            },
            {
                "title": "Код виробництва",
                "desc": "12345678"
            },
            {
                "title": "Колір вставки",
                "desc": "Різнокольоровий"
            },
            {
                "title": "value",
                "desc": "value"
            },
            {
                "title": "value",
                "desc": "value"
            },
            {
                "title": "value",
                "desc": "value"
            }
        ],
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultrices justo ac ante pretium, et aliquam ipsum pharetra. Fusce urna quam, semper at odio quis, finibus vulputate diam. Sed mattis ornare nulla ac malesuada. Quisque sagittis est ex, at faucibus enim aliquam eu. Aenean mi felis, mollis at molestie vitae, ultricies ac ipsum. Aliquam erat volutpat. Proin commodo hendrerit libero a blandit. Donec vehicula est vitae sagittis congue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum luctus urna elit, eget lacinia."
    }
]

const AlsoBuy = ({ products = productsArr }) => {
    const swiperParams = {
        modules: [Pagination],
        spaceBetween: 20,
        grabCursor: true,
        speed: 800,
        slidesPerView: 3,
        slidesPerGroup: 3,
        pagination: { clickable: true },
    };

    return (
        <SwiperList
            title='Також купують'
            products={products}
            swiperParams={swiperParams}
            extraClassCardItem={classes.extraClassCardItem}
            extraClassSwiperList={classes.extraClassSwiperList}
        />
    );
};

export default AlsoBuy;