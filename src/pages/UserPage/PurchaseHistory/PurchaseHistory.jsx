import React, {useState} from 'react';
import classes from "./PurchaseHistory.module.css";
import {useDispatch, useSelector} from "react-redux";
import PrimaryButton from "../../../components/ui/Buttons/PrimaryButton/PrimaryButton";
import {formatDate} from "../../../common/utils/formatDate";
import {roundNumber} from "../../../common/utils/roundNumber";
import {getProductByIdInOrdersHistory} from "../../../store/pageSlices/userPageSlice";
import Popup from "../../../components/ui/Popup/Popup";
import Preloader from "../../../components/ui/Preloader/Preloader";
import NoImageBlock from "../../../components/ui/blocks/NoImageBlock/NoImageBlock";
import Breadcrumbs from "../../../components/ui/Breadcrumbs/Breadcrumbs";
import {useNavigate} from "react-router-dom";

const PurchaseHistory = () => {
    const {data: ordersHistoryData} = useSelector(state => state.userPage.ordersHistory);
    const {data: productData, loading: productLoading} = useSelector(state => state.userPage.product);
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickInvestigate = (productId) => {
        setIsOpenPopup(true);
        dispatch(getProductByIdInOrdersHistory(productId));
    }

    const productInformationJSX = (product) => {
        const linksForBreadCrumbs = [];

        if (product.mainCategory !== null) {
            linksForBreadCrumbs.push({
                name: product.mainCategory.name,
                id: `/category/${product.mainCategory.categoryId}`
            });
        }

        return <div className={classes.productInformation} key={product.productId}
                    onClick={() => navigate(`/product/${product.productId}`)}>
            <div className={classes.box}>
                {product.imageUrl !== null ? (
                    <img src={product.imageUrl} alt={product.name}/>
                ) : (
                    <div className={classes.noImageBlock}>
                        <NoImageBlock/>
                    </div>
                )}
                <div className={classes.titleAndBreadcrumbs}>
                    <p>{product.name}</p>
                    <div className={classes.breadcrumbs}>
                        <Breadcrumbs
                            links={[...linksForBreadCrumbs, {name: product.name, id: `/product/${product.productId}`}]}
                        />
                    </div>
                </div>
            </div>
            <div className={`${classes.box} ${classes.amountAndPrice}`}>
                <span>{product.amount}шт.</span>
                <span>{product.productByAmountPrice}₴</span>
            </div>
        </div>
    }

    return (
        <div className={classes.wrapper}>
            <h3>Історія покупок</h3>
            <div className={classes.history}>
                {!ordersHistoryData.length ? (
                    <p className={classes.absence}>Ви ще не здійснили жодної покупки.</p>
                ) : (
                    <div className={classes.ordersHistory}>
                        {ordersHistoryData.map(order => {
                            return <div className={classes.order} key={order.orderId}>
                                <div className={classes.box}>
                                    <span>№{order.orderId}</span>
                                    <span>{formatDate(order.orderDate)}</span>
                                </div>
                                <div className={classes.box}>
                                    <span>Сума замовлення: {roundNumber(order.totalPriceWithDiscount)}₴</span>
                                    <PrimaryButton
                                        onClick={() => handleClickInvestigate(order.orderId)}>Дослідити</PrimaryButton>
                                </div>
                            </div>
                        })}
                    </div>
                )}
            </div>
            {isOpenPopup && <Popup onClose={() => setIsOpenPopup(false)} closeBtn={true}>
                {productLoading ? <Preloader color='tertiary'/> : (
                    <div className={classes.productsInformation}>
                        {productData.map(product => {
                            return productInformationJSX(product)
                        })}
                    </div>
                )}
            </Popup>}
        </div>
    );
};

export default PurchaseHistory;