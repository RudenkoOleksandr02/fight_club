import React, {useEffect, useState} from 'react';
import Tr from "../Table/Tr";
import Td from "../Table/Td";
import Table from "../Table/Table";
import classes from './ProductsContainer.module.css';
import {ReactComponent as IcoDelete} from './../images/icoDelete.svg';
import {ReactComponent as IcoEdit} from './../images/icoEdit.svg';
import {ReactComponent as IcoEye} from './../images/icoEye.svg';
import {ReactComponent as IcoHot} from './../images/icoHot.svg';
import {roundNumber} from "../../common/utils/roundNumber";
import IcoButton from "../buttons/IcoButton/IcoButton";
import ToggleButton from "../buttons/ToggleButton/ToggleButton";
import {useDispatch, useSelector} from "react-redux";
import Preloader from "../../components/ui/Preloader/Preloader";
import {toggleIsHit, toggleIsShow} from "../../store/adminSlice";

const ProductsTable = ({handleClickEdit, sortOption, handleSortOption}) => {
    const {data: products, loading} = useSelector(state => state.admin.products);
    const dispatch = useDispatch();
    const getRotatedFromSortOption = (sortOption, name) => {
        return sortOption.endsWith('_desc') && sortOption.startsWith(name);
    };
    const getBooleanForArrow = (name) => {
        return sortOption.startsWith(name);
    }

    const [btnsData, setBtnsData] = useState([]);

    useEffect(() => {
        if (!loading) {
            setBtnsData(products.products.map(product => {
                return {
                    id: product.id,
                    isShown: product.isShown,
                    isHit: product.isHit
                }
            }))
        }
    }, [products])

   const handleClickOnShow = (productId) => {
       setBtnsData(btnsData.map(btn => {
           if (productId === btn.id) {
               dispatch(toggleIsShow(productId, !btn.isShown))
               return {
                   ...btn,
                   isShown: !btn.isShown
               }
           } else {
               return btn;
           }
       }))
   }
    const handleClickOnHit = (productId) => {
        setBtnsData(btnsData.map(btn => {
            if (productId === btn.id) {
                dispatch(toggleIsHit(productId, !btn.isHit))
                return {
                    ...btn,
                    isHit: !btn.isHit
                }
            } else {
                return btn;
            }
        }))
    }
    const returnIsShowByProductId = (productId) => {
        const data = btnsData.filter(btn => productId === btn.id);
        return data[0]?.['isShown'];
    }
    const returnIsHitByProductId = (productId) => {
        const data = btnsData.filter(btn => productId === btn.id);
        return data[0]?.['isHit'];
    }

    return (
        <Table>
            <Tr templateColumns='1fr 109px 157px 109px 151px 161px'>
                <Td justifyContent='left'>
                    <ToggleButton
                        handleClick={() => handleSortOption('name')}
                        text='Назва товару'
                        rotated={getRotatedFromSortOption(sortOption, 'name')}
                        isShowArrow={getBooleanForArrow('name')}
                    />
                </Td>
                <Td>
                    <ToggleButton
                        handleClick={() => handleSortOption('discount')}
                        text='Акція'
                        rotated={getRotatedFromSortOption(sortOption, 'discount')}
                        isShowArrow={getBooleanForArrow('discount')}
                    />
                </Td>
                <Td>
                    <ToggleButton
                        handleClick={() => handleSortOption('category')}
                        text='Категорія'
                        rotated={getRotatedFromSortOption(sortOption, 'category')}
                        isShowArrow={getBooleanForArrow('category')}
                    />
                </Td>
                <Td>
                    <ToggleButton
                        handleClick={() => handleSortOption('price')}
                        text='Ціна'
                        rotated={getRotatedFromSortOption(sortOption, 'price')}
                        isShowArrow={getBooleanForArrow('price')}
                    />
                </Td>
                <Td>
                    <ToggleButton
                        handleClick={() => handleSortOption('stock')}
                        text='Залишок'
                        rotated={getRotatedFromSortOption(sortOption, 'stock')}
                        isShowArrow={getBooleanForArrow('stock')}
                    />
                </Td>
                <Td>
                    <span className={classes.bold}>
                        Дії
                    </span>
                </Td>
            </Tr>
            {loading ? <Preloader color='primary'/> : (
                products.products.map(product => (
                    <Tr key={product.id} templateColumns='1fr 109px 157px 109px 151px 161px'>
                        <Td justifyContent='left'>{product.name}</Td>
                        <Td>{roundNumber(product.discount)}%</Td>
                        <Td>Категорії</Td>
                        <Td>{roundNumber(product.price)}</Td>
                        <Td>{product.amount}</Td>
                        <Td>
                            <div className={classes.icoBtns}>
                                <IcoButton
                                    svgIco={<IcoEye className={`${!returnIsShowByProductId(product.id) ? classes.svgGray : ''}`}/>}
                                    onClick={() => handleClickOnShow(product.id)}
                                />
                                <IcoButton
                                    svgIco={<IcoHot className={`${!returnIsHitByProductId(product.id) ? classes.svgGray : ''}`}/>}
                                    onClick={() => handleClickOnHit(product.id)}
                                />
                                <IcoButton svgIco={<IcoEdit/>} onClick={() => handleClickEdit(product.id)}/>
                                <IcoButton svgIco={<IcoDelete/>}/>
                            </div>
                        </Td>
                    </Tr>
                ))
            )}
        </Table>
    );
};

export default ProductsTable;