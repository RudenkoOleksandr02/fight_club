import React from 'react';
import classes from './PopupForProduct.module.css'
import Characteristics from "./Characterictics/Characteristics";
import MainCategory from "./MainCategory/MainCategory";
import AdditionalCategories from "./AdditionalCategories/AdditionalCategories";
import Images from "./Images/Images";
import EditContainer from "../../../EditContainer/EditContainer";
import InputAdmin from "../../../Inputs/InputAdmin";
import TextAreaAdmin from "../../../Inputs/TextAreaAdmin";
import SeoBlock from "../../../SeoBlock/SeoBlock";

const PopupForProduct = ({handleClose, data, setData, handleSave, isSaveButtonActive}) => {
    const handleChangeInput = (key, value) => {
        setData(prevState => ({...prevState, [key]: value}));
    }

    return (
        <EditContainer handleSave={() => handleSave()}
                       isDisabledSave={!isSaveButtonActive} handleClose={handleClose}>
            <div className={classes.wrapper}>
                <div className={classes.top}>
                    {data.id && (
                        <span className={classes.productId}>№{data.id}</span>
                    )}
                </div>
                <div className={classes.mainInformation}>
                    <InputAdmin onChange={e => handleChangeInput('name', e.target.value)} value={data.name}
                                placeholder='Назва товару'/>
                    <InputAdmin onChange={e => handleChangeInput('nameEng', e.target.value)}
                                value={data.nameEng} placeholder='Найменування товару'/>
                    <MainCategory productData={data} setProductData={setData}/>
                    <InputAdmin onChange={e => handleChangeInput('article', e.target.value)}
                                value={data.article} placeholder='Артикул'/>
                </div>
                <div className={classes.secondaryInformation}>
                    <InputAdmin onChange={e => handleChangeInput('price', e.target.value)}
                                value={data.price} type='number' placeholder='Ціна'/>
                    <InputAdmin onChange={e => handleChangeInput('discount', e.target.value)}
                                value={data.discount} type='number' placeholder='Відсоток акції'/>
                    <InputAdmin onChange={e => handleChangeInput('amount', e.target.value)}
                                value={data.amount} type='number' placeholder='Залишок'/>
                </div>
                <div className={classes.descriptionWrapper}>
                    <TextAreaAdmin placeholder='Опис товару' value={data.description}
                                   onChange={e => handleChangeInput('description', e.target.value)}/>
                </div>
                <div className={classes.warehouseWrapper}>
                    <TextAreaAdmin placeholder='Склад' value={data.ingridients}
                                   onChange={e => handleChangeInput('ingridients', e.target.value)}/>
                </div>
                <Characteristics productData={data} setProductData={setData}/>
                <AdditionalCategories productData={data} setProductData={setData}/>
                <Images productData={data} setProductData={setData}/>
                <SeoBlock
                    metaKey={data.metaKeys}
                    handleChangeMetaKey={(e) => handleChangeInput('metaKeys', e.target.value)}
                    metaDesc={data.metaDescription}
                    handleChangeMetaDesc={(e) => handleChangeInput('metaDescription', e.target.value)}
                />
            </div>
        </EditContainer>
    );
};

export default PopupForProduct;