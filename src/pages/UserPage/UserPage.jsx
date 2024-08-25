import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import SecondaryButton from "../../components/ui/Buttons/SecondaryButton/SecondaryButton";
import {logout} from "../../store/authSlice";
import classes from "./UserPage.module.css";
import {deleteFavorite, getFavorite, getUser} from "../../store/userPageSlice";
import Preloader from "../../components/ui/Preloader/Preloader";
import {ReactComponent as IcoTrash} from './../../assets/images/ico_trash.svg'
import PrimaryButton from "../../components/ui/Buttons/PrimaryButton/PrimaryButton";
import {addProduct} from "../../store/cartPageSlice";

const UserPage = () => {
    const { isAuth, loading } = useSelector((state) => state.auth);
    const {data: favoriteData, loading: favoriteLoading} = useSelector(state => state.userPage.favorite);
    const {data: userInformation, loading: userLoading} = useSelector(state => state.userPage.userInformation)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isAuth) {
            navigate('/');
        }
    }, [isAuth, loading]);
    useEffect(() => {
        dispatch(getFavorite())
    }, [JSON.stringify(favoriteData)])
    const handleDeleteFavorite = (productId) => {
        dispatch(deleteFavorite(productId))
    }
    const productsInCart = useSelector(state => state.cartPage.productsInCart)
    const handleAddToCart = (id, src, name, price) => {
        dispatch(addProduct({
            productId: id,
            image: src,
            name: name,
            price
        }));
    };
    useEffect(() => {
        dispatch(getUser())
    }, [])
    if (userLoading) {
        return <Preloader color='secondary' cover={true}/>;
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.leftPanel}>
                <div className={classes.myDetails}>
                    <h3>Мої дані</h3>
                    <form className={classes.form}>
                        <input type='text' placeholder="Ваше ім'я" value={userInformation.username}/>
                        <input type='text' placeholder="Ваше прізвище" value={userInformation.surname}/>
                        <input type='text' placeholder="Телефон" value={userInformation.phoneNumber}/>
                        <input type='email' placeholder="E-mail" value={userInformation.email}/>
                    </form>
                </div>
                <div className={classes.purchaseHistory}>
                    <h3>Історія покупок</h3>
                </div>
                <div className={classes.logout}>
                    <SecondaryButton handleClick={() => {
                        dispatch(logout())
                    }}>Вийти з облікового запису</SecondaryButton>
                </div>
            </div>
            <div className={classes.rightPanel}>
                <div className={classes.loyaltyProgram}>
                    <h3>Програма лояльності</h3>
                </div>
                <div className={classes.favoriteContainer}>
                    <h3>Вибране</h3>
                    <div className={classes.favorite}>
                        {favoriteLoading ? <Preloader color='tertiary' overflowHidden={false}/> : (
                            favoriteData.map(product => {
                                return <div key={product.id} className={classes.product}>
                                    <div className={classes.information} onClick={() => navigate(`/product/${product.id}`)}>
                                        <img src={product.images[0]} alt='favorite product'/>
                                        <p>{product.name}</p>
                                    </div>
                                    <div className={classes.btns}>
                                        <button onClick={() => handleDeleteFavorite(product.id)}><IcoTrash/></button>
                                        <PrimaryButton disabled={!product.inStock} onClick={() => {
                                            if (productsInCart.some(inCart => inCart.productId === product.id)) {
                                                navigate('/cart')
                                            } else {
                                                handleAddToCart(product.id, product.images, product.name, product.price)
                                            }
                                        }}>
                                            {productsInCart.some(inCart => inCart.productId === product.id) ? 'Перейти до кошика' : 'Додати до кошика'}
                                        </PrimaryButton>
                                    </div>
                                </div>
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPage;
