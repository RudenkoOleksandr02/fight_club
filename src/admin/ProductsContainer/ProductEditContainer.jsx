import React, {useEffect, useState} from 'react';
import classes from './ProductsContainer.module.css';
import PrimaryButton from "../buttons/PrimaryButton/PrimaryButton";
import {ReactComponent as IcoPlus} from './../images/icoPlus.svg';
import {ReactComponent as IcoDelete} from './../images/icoDelete.svg';
import {ReactComponent as IcoClose} from './../images/icoClose.svg';
import Table from "../Table/Table";
import Tr from "../Table/Tr";
import Td from "../Table/Td";
import InputAdmin from "../Inputs/InputAdmin";
import TextAreaAdmin from "../Inputs/TextAreaAdmin";
import {checkSameObject} from "../../common/utils/checkSameObject";
import {useDispatch} from "react-redux";
import {getProductById, getProductsByAdminFilter, postImagesByProductId, putProductById} from "../../store/adminSlice";
import Popup from "../../components/ui/Popup/Popup";
import FileDropzone from "../FileDropzone/FileDropzone";
import IcoButton from "../buttons/IcoButton/IcoButton";

const ProductEditContainer = ({handleClose, productData, forDispatchProducts: {amount, start}}) => {
    const dispatch = useDispatch();
    const initialProductData = {
        id: productData.id,
        name: productData.name,
        nameEng: productData.nameEng,
        price: productData.price,
        discount: productData.discount,
        amount: productData.amount,
        article: productData.article,
        description: productData.description,
        characteristics: productData.characteristics,
        images: productData.images,
        mainCategory: productData.mainCategory,
        additionalCategories: productData.additionalCategories,
    }
    const [localProductData, setLocalProductData] = useState(initialProductData);
    useEffect(() => {
        setLocalProductData(initialProductData)
    }, [productData])

    const handleChangeInput = (key, value) => {
        setLocalProductData(prevState => ({...prevState, [key]: value}));
    }
    console.log(localProductData.name)
    const getModifiedFields = (initialData, currentData) => {
        const modifiedFields = {};
        for (const key in initialData) {
            if (initialData[key] !== currentData[key]) {
                modifiedFields[key] = currentData[key];
            }
        }
        return modifiedFields;
    };
    const [isOpenPopupPutProduct, setIsOpenPopupPutProduct] = useState(false)
    const handlePutProduct = () => {
        const modifiedData = getModifiedFields(initialProductData, localProductData);
        dispatch(putProductById(initialProductData.id, modifiedData))
            .then(dispatch(getProductById(initialProductData.id)))
            .then(dispatch(getProductsByAdminFilter({amount, start})));
    }

    const [isOpenPopupImportImages, setIsOpenPopupImportImages] = useState(false);
    const [isErrorImport, setIsErrorImport] = useState(false);
    const [isSuccessImport, setIsSuccessImport] = useState(false);
    const handlePostImages = (files) => {
        if (files.length !== 0) {
            dispatch(postImagesByProductId(initialProductData.id, files))
                .then(response => {
                    if (response.meta.requestStatus === 'fulfilled') {
                        setIsSuccessImport(true);
                        setIsErrorImport(false);
                    } else {
                        setIsErrorImport(true);
                        setIsSuccessImport(false);
                    }
                });
        } else {
            setIsErrorImport(true);
            setIsSuccessImport(false);
        }
    }

    return (
        <div className={classes.editWrapper}>
            <div className={classes.top}>
                <span className={classes.productId}>№{localProductData.id}</span>
                <div className={classes.close}>
                    <IcoButton svgIco={<IcoClose/>} onClick={handleClose}/>
                </div>
            </div>
            <div className={classes.mainInformation}>
                <InputAdmin onChange={e => handleChangeInput('name', e.target.value)} value={localProductData.name}
                            type='text' errors={[]} placeholder='Назва товару'/>
                <InputAdmin onChange={e => handleChangeInput('nameEng', e.target.value)}
                            value={localProductData.nameEng} type='text' errors={[]} placeholder='Найменування товару'/>
                <InputAdmin onChange={() => {
                }} value={localProductData.mainCategory.name + ` (id:${localProductData.mainCategory.categoryId})`} type='text' errors={[]} placeholder='Категорія'/>
                <InputAdmin onChange={e => handleChangeInput('article', e.target.value)}
                            value={localProductData.article} type='text' errors={[]} placeholder='Артикул'/>
            </div>
            <div className={classes.secondaryInformation}>
                <InputAdmin onChange={e => handleChangeInput('price', e.target.value)}
                            value={localProductData.price} type='number' errors={[]} placeholder='Ціна'/>
                <InputAdmin onChange={e => handleChangeInput('discount', e.target.value)}
                            value={localProductData.discount} type='number' errors={[]}
                            placeholder='Відсоток акції'/>
                <InputAdmin onChange={e => handleChangeInput('amount', e.target.value)}
                            value={localProductData.amount} type='number' errors={[]} placeholder='Залишок'/>
            </div>
            <div className={classes.description}>
                <TextAreaAdmin placeholder='Опис товару' value={localProductData.description}
                               onChange={e => handleChangeInput('description', e.target.value)}/>
            </div>
            <div className={classes.warehouse}>
                <TextAreaAdmin placeholder='Склад' value=''
                               onChange={() => {}}/>
            </div>
            <div className={classes.characteristics + ' ' + classes.die}>
                <span>Характеристики</span>
                <div className={classes.inner}>
                    <div className={classes.btns}>
                        <PrimaryButton>Додати характеристику <IcoPlus/></PrimaryButton>
                        <PrimaryButton>Додати існуючу <IcoPlus/></PrimaryButton>
                    </div>
                    <Table>
                        {localProductData.characteristics.map((characteristic, index) => (
                            <Tr key={index} templateColumns='360px 1fr 44px'>
                                <Td justifyContent='left'>{characteristic.title}</Td>
                                <Td justifyContent='left'>{characteristic.desc}</Td>
                                <Td>
                                    <IcoButton svgIco={<IcoDelete/>}/>
                                </Td>
                            </Tr>
                        ))}
                    </Table>
                </div>
            </div>
            <div className={classes.alsoBuy + ' ' + classes.die}>
                <span>Під категорії</span>
                <div className={classes.inner}>
                    <div className={classes.btns}>
                        <PrimaryButton>Додати категорію <IcoPlus/></PrimaryButton>
                        <PrimaryButton>Додати існуючу <IcoPlus/></PrimaryButton>
                    </div>
                    <Table>
                        {localProductData.additionalCategories.map((category, index) => (
                            <Tr key={index} templateColumns='1fr 44px'>
                                <Td justifyContent='left'>{category.name + ` (id:${category.categoryId})`}</Td>
                                <Td>
                                    <IcoButton svgIco={<IcoDelete/>}/>
                                </Td>
                            </Tr>
                        ))}
                    </Table>
                </div>
            </div>
            <div className={classes.alsoBuy + ' ' + classes.die}>
                <span>Зображення</span>
                <div className={classes.inner}>
                    <div className={classes.btns}>
                        <PrimaryButton handleClick={() => setIsOpenPopupImportImages(true)}>Додати Зображення <IcoPlus/></PrimaryButton>
                    </div>
                    <div className={classes.images}>
                        {localProductData.images.map((image, index) => (
                            <div className={classes.imageContainer} key={index}>
                                <img src={image} alt='img'/>
                            </div>
                        ))}
                    </div>
                    {isOpenPopupImportImages && (
                        <Popup onClose={() => setIsOpenPopupImportImages(false)}>
                            <FileDropzone
                                accepts={[
                                    'image/png',
                                    'image/jpeg',
                                    'image/jpg',
                                    'image/gif'
                                ]}
                                handleSend={handlePostImages}
                                maxFiles={5}
                                isError={isErrorImport}
                                isSuccess={isSuccessImport}
                                setIsError={setIsErrorImport}
                                setIsSuccess={setIsSuccessImport}
                            />
                        </Popup>
                    )}
                </div>
            </div>
            <div className={classes.seo + ' ' + classes.die}>
                <span>SEO</span>
                <div className={classes.inner}>
                    <Table>
                        <Tr templateColumns='168px 1fr 60px'>
                            <Td justifyContent='left'>Keywords</Td>
                            <Td><input/></Td>
                            <Td>0/5</Td>
                        </Tr>
                        <Tr templateColumns='168px 1fr 60px'>
                            <Td justifyContent='left'>Description</Td>
                            <Td><input/></Td>
                            <Td>0/160</Td>
                        </Tr>
                    </Table>
                </div>
            </div>
            <div className={classes.save}>
                <PrimaryButton
                    handleClick={() => setIsOpenPopupPutProduct(true)}
                    disabled={checkSameObject(localProductData, initialProductData)}
                >Зберегти зміни</PrimaryButton>
                {isOpenPopupPutProduct && (
                    <Popup>
                        <div className={classes.putProduct}>
                            <PrimaryButton handleClick={handlePutProduct}>Зберегти зміни</PrimaryButton>
                            <PrimaryButton handleClick={() => setIsOpenPopupPutProduct(false)}>Редагувати
                                далі</PrimaryButton>
                        </div>
                    </Popup>
                )}
            </div>
        </div>
    );
};

export default ProductEditContainer;