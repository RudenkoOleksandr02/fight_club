import React, {useEffect, useState} from 'react';
import classes from '../ProductsContainer.module.css';
import {ReactComponent as IcoDelete} from '../../../images/icoDelete.svg';
import {ReactComponent as IcoEdit} from '../../../images/icoEdit.svg';
import {ReactComponent as IcoEye} from '../../../images/icoEye.svg';
import {ReactComponent as IcoHot} from '../../../images/icoHot.svg';
import {ReactComponent as IcoNew} from '../../../images/icoNew.svg'
import {useDispatch, useSelector} from "react-redux";
import {toggleIsHit, toggleIsNew, toggleIsShow} from "../../../../store/adminSlices/adminProductSlice";
import Table from "../../../Table/Table";
import Tr from "../../../Table/Tr";
import Td from "../../../Table/Td";
import ToggleButton from "../../../buttons/ToggleButton/ToggleButton";
import Preloader from "../../../../components/ui/Preloader/Preloader";
import {roundNumber} from "../../../../common/utils/roundNumber";
import IcoButton from "../../../buttons/IcoButton/IcoButton";
import PopupForDelete from "../../../PopupForDelete/PopupForDelete";

const ProductsTable = ({handleClickEdit, sortOption, handleSortOption, handleDeleteProductById}) => {
    const {products: {data, loading}} = useSelector(state => state.admin.adminProduct);
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
            setBtnsData(data.products.map(product => {
                return {
                    id: product.id,
                    isShown: product.isShown,
                    isHit: product.isHit,
                    isNew: product.isNew
                }
            }))
        }
    }, [data])

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
    const handleClickOnNew = (productId) => {
        setBtnsData(btnsData.map(btn => {
            if (productId === btn.id) {
                dispatch(toggleIsNew(productId, !btn.isNew))
                return {
                    ...btn,
                    isNew: !btn.isNew
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
    const returnIsNewByProductId = (productId) => {
        const data = btnsData.filter(btn => productId === btn.id);
        return data[0]?.['isNew'];
    }

    const [deleteProductId, setDeleteProductId] = useState(null);

    return (
        <Table>
            <Tr templateColumns='1fr 109px 157px 109px 151px 175px'>
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
                data.products.map(product => (
                    <Tr key={product.id} templateColumns='1fr 109px 157px 109px 151px 175px'>
                        <Td justifyContent='left'>{product.name}</Td>
                        <Td>{roundNumber(product.discount)}%</Td>
                        <Td>{product.mainCategory?.name || 'Беззмістовний'}</Td>
                        <Td>{roundNumber(product.price)}</Td>
                        <Td>{product.amount}</Td>
                        <Td>
                            <div className={classes.icoBtns}>
                                <IcoButton
                                    svgIco={<IcoEye
                                        className={`${!returnIsShowByProductId(product.id) ? classes.svgGray : ''}`}/>}
                                    onClick={() => handleClickOnShow(product.id)}
                                />
                                <IcoButton
                                    svgIco={<IcoNew
                                        className={`${!returnIsNewByProductId(product.id) ? classes.svgGray : ''}`}/>}
                                    onClick={() => handleClickOnNew(product.id)}
                                />
                                <IcoButton
                                    svgIco={<IcoHot
                                        className={`${!returnIsHitByProductId(product.id) ? classes.svgGray : ''}`}/>}
                                    onClick={() => handleClickOnHit(product.id)}
                                />
                                <IcoButton svgIco={<IcoEdit/>} onClick={() => handleClickEdit(product.id)}/>
                                <IcoButton svgIco={<IcoDelete/>} onClick={() => setDeleteProductId(product.id)}/>
                            </div>
                        </Td>
                        {deleteProductId === product.id && (
                            <PopupForDelete
                                message={`Видалити товар: ${product.name}`}
                                onDelete={() => {
                                    handleDeleteProductById(product.id);
                                    setDeleteProductId(null);
                                }}
                                onCancel={() => setDeleteProductId(null)}
                            />
                        )}
                    </Tr>
                ))
            )}
        </Table>
    );
};

export default ProductsTable;