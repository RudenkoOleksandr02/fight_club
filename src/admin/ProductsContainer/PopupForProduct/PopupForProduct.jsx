import React, {useEffect, useState} from 'react';
import classes from './PopupForProduct.module.css'
import IcoButton from "../../buttons/IcoButton/IcoButton";
import {ReactComponent as IcoClose} from './../../images/icoClose.svg'
import {ReactComponent as IcoPlus} from './../../images/icoPlus.svg'
import {ReactComponent as IcoDelete} from './../../images/icoDelete.svg'
import InputAdmin from "../../Inputs/InputAdmin";
import TextAreaAdmin from "../../Inputs/TextAreaAdmin";
import PrimaryButton from "../../buttons/PrimaryButton/PrimaryButton";
import Table from "../../Table/Table";
import Tr from "../../Table/Tr";
import Td from "../../Table/Td";
import Popup from "../../../components/ui/Popup/Popup";
import FileDropzone from "../../FileDropzone/FileDropzone";
import {
    postImagesByProductId,
} from "../../../store/adminSlice";
import {useDispatch} from "react-redux";
import Characteristics from "./Characteristics";
import MainCategory from "./MainCategory";
import AdditionalCategories from "./AdditionalCategories";

const PopupForProduct = ({productData, setProductData, handleClosePopup, handleSaveProduct, mode = 'edit'}) => {
    const dispatch = useDispatch()

    const handleChangeInput = (key, value) => {
        setProductData(prevState => ({...prevState, [key]: value}));
    }

    const [isOpenPopupImportImages, setIsOpenPopupImportImages] = useState(false);
    const [isErrorImport, setIsErrorImport] = useState(false);
    const [isSuccessImport, setIsSuccessImport] = useState(false);
    const handlePostImages = (files) => {
        if (files.length !== 0) {
            dispatch(postImagesByProductId(productData.id, files))
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

    const [isOpenPopupSaveProduct, setIsOpenPopupSaveProduct] = useState(false);
    const onClickSave = () => {
        handleSaveProduct(productData, productData)
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.top}>
                <span className={classes.productId}>№{productData.id}</span>
                <div className={classes.close}>
                    <IcoButton svgIco={<IcoClose/>} onClick={handleClosePopup}/>
                </div>
            </div>
            <div className={classes.mainInformation}>
                <InputAdmin onChange={e => handleChangeInput('name', e.target.value)} value={productData.name}
                            type='text' errors={[]} placeholder='Назва товару'/>
                <InputAdmin onChange={e => handleChangeInput('nameEng', e.target.value)}
                            value={productData.nameEng} type='text' errors={[]} placeholder='Найменування товару'/>
                <MainCategory productData={productData} setProductData={setProductData}/>
                <InputAdmin onChange={e => handleChangeInput('article', e.target.value)}
                            value={productData.article} type='text' errors={[]} placeholder='Артикул'/>
            </div>
            <div className={classes.secondaryInformation}>
                <InputAdmin onChange={e => handleChangeInput('price', e.target.value)}
                            value={productData.price} type='number' errors={[]} placeholder='Ціна'/>
                <InputAdmin onChange={e => handleChangeInput('discount', e.target.value)}
                            value={productData.discount} type='number' errors={[]}
                            placeholder='Відсоток акції'/>
                <InputAdmin onChange={e => handleChangeInput('amount', e.target.value)}
                            value={productData.amount} type='number' errors={[]} placeholder='Залишок'/>
            </div>
            <div className={classes.descriptionWrapper}>
                <TextAreaAdmin placeholder='Опис товару' value={productData.description}
                               onChange={e => handleChangeInput('description', e.target.value)}/>
            </div>
            <div className={classes.warehouseWrapper}>
                <TextAreaAdmin placeholder='Склад' value=''
                               onChange={() => {
                               }}/>
            </div>
            <Characteristics productData={productData} setProductData={setProductData}/>
            <AdditionalCategories productData={productData} setProductData={setProductData}/>
            {mode === 'edit' ? <div className={classes.imagesWrapper + ' ' + classes.die}>
                <span>Зображення</span>
                <div className={classes.inner}>
                    <div className={classes.btns}>
                        <PrimaryButton handleClick={() => setIsOpenPopupImportImages(true)}>Додати Зображення <IcoPlus/></PrimaryButton>
                    </div>
                    <div className={classes.images}>
                        {!!productData.images.length ? productData.images.map((image, index) => (
                            <div className={classes.imageContainer} key={index}>
                                <img src={image} alt='img'/>
                            </div>
                        )) : null}
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
            </div> : ''}
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
                    handleClick={() => setIsOpenPopupSaveProduct(true)}
                    disabled={false}
                >Зберегти зміни</PrimaryButton>
                {isOpenPopupSaveProduct && (
                    <Popup>
                        <div className={classes.putProduct}>
                            <PrimaryButton handleClick={onClickSave}>Зберегти зміни</PrimaryButton>
                            <PrimaryButton handleClick={() => setIsOpenPopupSaveProduct(false)}>Редагувати
                                далі</PrimaryButton>
                        </div>
                    </Popup>
                )}
            </div>
        </div>
    );
};

export default PopupForProduct;