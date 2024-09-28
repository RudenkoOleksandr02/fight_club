import React, {useEffect, useState} from 'react';
import Placing from "./Placing/Placing";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import classes from './Checkout.module.css';
import {checkout, setDeliveryInfo, setUserInfo} from "../../store/pageSlices/checkoutPageSlice";
import InformationPanel from "../../components/containers/Order/InformationPanel/InformationPanel";
import TopPanel from "../../components/containers/Order/TopPanel/TopPanel";
import {getUser} from "../../store/pageSlices/userPageSlice";
import Breadcrumbs from "../../components/ui/Breadcrumbs/Breadcrumbs";
import PopupForCheckout from "./PopupForCheckout/PopupForCheckout";

const Checkout = () => {
    const {isAuthAdmin} = useSelector(state => state.admin.adminAuth);
    const isAuth = useSelector(state => state.auth.isAuth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Popup
    const [openPopup, setOpenPopup] = useState(false);
    const [email, setEmail] = useState('');
    const [orderId, setOrderId] = useState(null);

    // navigate to home
    const productsInCart = useSelector(state => state.cartPage.productsInCart);
    useEffect(() => {
        if (!productsInCart.length) {
            navigate('/');
        }
    }, [productsInCart.length, navigate]);

    // Checkout
    const params = useSelector(state => state.checkoutPage.params);
    const [errors, setErrors] = useState({
        city: [],
        department: [],
        name: [],
        surname: [],
        phone: [],
        email: []
    });

    useEffect(() => {
        if (isAuth && (!isAuthAdmin )) {
            dispatch(getUser())
        }
    }, [isAuth, isAuthAdmin]);

    const handleSetUserInfo = (value, key) => {
        dispatch(setUserInfo({key, value}));
    };
    const handleSetDeliveryInfo = (value, key) => {
        dispatch(setDeliveryInfo({key, value}));
    };

    const handleCompleteContract = () => {
        dispatch(checkout(params))
            .then(response => {
                if (response.meta.requestStatus === 'fulfilled') {
                    setEmail(params.userInfo.email);
                    setOrderId(response.payload.orderId);
                    setOpenPopup(true);
                } else if (response.meta.requestStatus === 'rejected') {
                    const errors = response.payload.errors;
                    setErrors({
                        city: errors["DeliveryInfo.City"] || [],
                        department: errors["DeliveryInfo.Department"] || [],
                        name: errors["UserInfo.Name"] || [],
                        surname: errors["UserInfo.Surname"] || [],
                        phone: errors["UserInfo.Phone"] || [],
                        email: errors["UserInfo.Email"] || []
                    });
                }
            });
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.breadcrumbs}>
                <Breadcrumbs links={[{id: '/checkout', name: 'Оформлення'}]}/>
            </div>
            <div className={classes.main}>
                <div className={classes.topPanel}>
                    <TopPanel/>
                </div>
                <div className={classes.placing}>
                    <Placing
                        userInfo={params.userInfo}
                        handleSetUserInfo={handleSetUserInfo}
                        handleSetDeliveryInfo={handleSetDeliveryInfo}
                        errors={errors}
                        isAuthAdmin={isAuthAdmin}
                    />
                </div>
                <div className={classes.informationPanel}>
                    <InformationPanel
                        orderParams={{
                            text: 'Купити',
                            handleClick: () => {
                                handleCompleteContract();
                            }
                        }}
                    />
                </div>
            </div>
            {openPopup && <PopupForCheckout
                setOpenPopup={setOpenPopup}
                email={email}
                orderId={orderId}
                setOrderId={setOrderId}
            />}
        </div>
    );
};

export default Checkout;
