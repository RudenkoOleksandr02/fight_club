import React, {useState} from 'react';
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
import {checkSameObject} from "../../../common/utils/checkSameObject";

const PopupForProduct = ({productData, handleClosePopup, mode = 'edit'}) => {
    const dispatch = useDispatch()
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
    const handleChangeInput = (key, value) => {
        setLocalProductData(prevState => ({...prevState, [key]: value}));
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

    const [isOpenPopupPutProduct, setIsOpenPopupPutProduct] = useState(false);
    const handlePutProduct = () => {

    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.top}>
                <span className={classes.productId}>№{localProductData.id}</span>
                <div className={classes.close}>
                    <IcoButton svgIco={<IcoClose/>} onClick={handleClosePopup}/>
                </div>
            </div>
            <div className={classes.mainInformation}>
                <InputAdmin onChange={e => handleChangeInput('name', e.target.value)} value={localProductData.name}
                            type='text' errors={[]} placeholder='Назва товару'/>
                <InputAdmin onChange={e => handleChangeInput('nameEng', e.target.value)}
                            value={localProductData.nameEng} type='text' errors={[]} placeholder='Найменування товару'/>
                <InputAdmin onChange={() => {
                }} value={localProductData.mainCategory}
                            type='text' errors={[]} placeholder='Категорія'/>
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
            <div className={classes.descriptionWrapper}>
                <TextAreaAdmin placeholder='Опис товару' value={localProductData.description}
                               onChange={e => handleChangeInput('description', e.target.value)}/>
            </div>
            <div className={classes.warehouseWrapper}>
                <TextAreaAdmin placeholder='Склад' value=''
                               onChange={() => {
                               }}/>
            </div>
            <div className={classes.characteristicsWrapper + ' ' + classes.die}>
                <span>Характеристики</span>
                <div className={classes.inner}>
                    <div className={classes.btns}>
                        <PrimaryButton>Додати характеристику <IcoPlus/></PrimaryButton>
                        <PrimaryButton>Додати існуючу <IcoPlus/></PrimaryButton>
                    </div>
                    <Table>
                        {!!localProductData.characteristics ? localProductData.characteristics.map((characteristic, index) => (
                            <Tr key={index} templateColumns='360px 1fr 44px'>
                                <Td justifyContent='left'>{characteristic.title}</Td>
                                <Td justifyContent='left'>{characteristic.desc}</Td>
                                <Td>
                                    <IcoButton svgIco={<IcoDelete/>}/>
                                </Td>
                            </Tr>
                        )) : null}
                    </Table>
                </div>
            </div>
            <div className={classes.additionalCategoriesWrapper + ' ' + classes.die}>
                <span>Під категорії</span>
                <div className={classes.inner}>
                    <div className={classes.btns}>
                        <PrimaryButton>Додати категорію <IcoPlus/></PrimaryButton>
                        <PrimaryButton>Додати існуючу <IcoPlus/></PrimaryButton>
                    </div>
                    <Table>
                        {!!localProductData.additionalCategories ? localProductData.additionalCategories.map((category, index) => (
                            <Tr key={index} templateColumns='1fr 44px'>
                                <Td justifyContent='left'>{category.name + ` (id:${category.categoryId})`}</Td>
                                <Td>
                                    <IcoButton svgIco={<IcoDelete/>}/>
                                </Td>
                            </Tr>
                        )) : null}
                    </Table>
                </div>
            </div>
            {mode === 'edit' ? <div className={classes.imagesWrapper + ' ' + classes.die}>
                <span>Зображення</span>
                <div className={classes.inner}>
                    <div className={classes.btns}>
                        <PrimaryButton handleClick={() => setIsOpenPopupImportImages(true)}>Додати Зображення <IcoPlus/></PrimaryButton>
                    </div>
                    <div className={classes.images}>
                        {!!localProductData.images ? localProductData.images.map((image, index) => (
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

export default PopupForProduct;