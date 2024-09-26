import React from 'react';
import PrimaryButton from "../../ui/Buttons/PrimaryButton/PrimaryButton";
import classes from './CardItem.module.css'
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addProductToCart} from "../../../store/pageSlices/cartPageSlice";
import {roundNumber} from "../../../common/utils/roundNumber";
import {priceWithDiscount} from "../../../common/utils/priceWithDiscount";
import Rating from "../../ui/Rating/Rating";
import NoImageBlock from "../../ui/blocks/NoImageBlock/NoImageBlock";

const CardItem = (props) => {
    const {
        id,
        path,
        src,
        titles,
        price,
        discount,
        inStock,
        isNew = true,
        isHit = true,
        rating = 5,
        extraClass = ''
    } = props;
    const productsInCart = useSelector(state => state.cartPage.productsInCart)
    const inCart = productsInCart.some(product => product.productId === id);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddToCart = () => {
        dispatch(addProductToCart({
            productId: id,
            image: src,
            name: titles[0],
            price,
            discount
        }));
    };

    const imageContainerJSX = (
        <div className={classes.imageContainer}>
            {src ? (
                <img src={src} alt={titles[0]}/>
            ) : (
                <NoImageBlock/>
            )}
        </div>
    );
    const dieContainerJSX = (
        <div className={classes.dieContainer}>
            {isNew && <span className={classes.isNew}>NEW</span>}
            {isHit && <span className={classes.isHit}>HIT</span>}
            {!!discount && <span className={classes.isDiscount}>Акція</span>}
        </div>
    )
    const titlesContainerJSX = (
        <div className={classes.titlesContainer}>
            <Link to={path} className={classes.title}>{titles[0]}</Link>
            <p className={classes.titleEng}>{titles[1]}</p>
        </div>
    );
    const priceStockRatingContainerJSX = (
        <div className={classes.priceStockRatingContainer}>
            <div className={classes.prices}>
                {!!discount ? <p className={classes.priceWithoutDiscount}>{roundNumber(price)}₴</p> : <span></span>}
                <p>{roundNumber(priceWithDiscount(price, discount))}₴</p>
            </div>
            <div className={classes.ratingAndStock}>
                <Rating rating={rating}/>
                <p className={`${classes.inStock} ${!inStock ? classes.absence : ''}`}>{inStock ? 'В наявності' : 'Відсутній'}</p>
            </div>
        </div>
    );
    const buttonContainerJSX = (
        <div className={classes.buttonContainer}>
            <PrimaryButton disabled={!inStock} onClick={() => {
                if (inCart) {
                    navigate('/cart')
                } else {
                    handleAddToCart()
                }
            }}>
                {inCart ? 'Перейти до кошика' : 'Додати до кошика'}
            </PrimaryButton>
        </div>
    );

    return (
        <div className={`${classes.wrapper} ${extraClass}`}>
            <div className={classes.pointer}>
                {imageContainerJSX}
                {dieContainerJSX}
            </div>
            <div className={classes.inner}>
                {titlesContainerJSX}
                <div>
                    {priceStockRatingContainerJSX}
                    {buttonContainerJSX}
                </div>
            </div>
        </div>
    );
};

export default CardItem;