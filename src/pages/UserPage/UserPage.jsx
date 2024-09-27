import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import classes from "./UserPage.module.css";
import {getFavorite, getOrdersHistory, getUser} from "../../store/pageSlices/userPageSlice";
import Preloader from "../../components/ui/Preloader/Preloader";
import Details from "./Details/Details";
import PurchaseHistory from "./PurchaseHistory/PurchaseHistory";
import Logout from "./Logout/Logout";
import LoyaltyProgram from "../../components/ui/blocks/LoyaltyProgram/LoyaltyProgram";
import Favorite from "./Favorite/Favorite";
import {getBalance} from "../../store/cashbackSlice";
import Cashback from "./Cashback/Cashback";
import Breadcrumbs from "../../components/ui/Breadcrumbs/Breadcrumbs";

const UserPage = () => {
    const {isAuth, loading} = useSelector((state) => state.auth);
    const {loading: favoriteLoading} = useSelector(state => state.userPage.favorite);
    const {loading: userLoading} = useSelector(state => state.userPage.userInformation);
    const {loading: cashbackLoading} = useSelector(state => state.cashback.balance);
    const {loading: ordersHistoryLoading} = useSelector(state => state.userPage.ordersHistory);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isAuth) {
            navigate('/');
        }
    }, [isAuth, loading]);

    useEffect(() => {
        dispatch(getUser());
        dispatch(getFavorite());
        dispatch(getBalance());
        dispatch(getOrdersHistory());
    }, []);

    if (userLoading || favoriteLoading || cashbackLoading || ordersHistoryLoading) {
        return <Preloader color='secondary' cover={true}/>;
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.breadcrumbs}>
                <Breadcrumbs links={[{id: '/user', name: 'Сторінка користувача'}]}/>
            </div>
            <div className={classes.grid}>
                <div className={classes.leftPanel}>
                    <div className={classes.details}><Details/></div>
                    <div className={classes.cashback}><Cashback/></div>
                    <div className={classes.purchaseHistory}><PurchaseHistory/></div>
                    <div className={classes.logout}><Logout/></div>
                </div>
                <div className={classes.rightPanel}>
                    <div className={classes.loyaltyProgram}><LoyaltyProgram/></div>
                    <div className={classes.purchaseHistory}><PurchaseHistory/></div>
                    <div className={classes.favorite}><Favorite/></div>
                </div>
            </div>
            <div className={classes.panelBottom}>
                <div className={classes.favorite}><Favorite/></div>
                <div className={classes.logout}><Logout/></div>
            </div>
        </div>
    );
};

export default UserPage;
