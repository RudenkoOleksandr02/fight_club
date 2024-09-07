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

const PopupForProduct = ({productData, setProductData, handleClosePopup, handleSaveProduct, isSaveButtonActive = true, mode = 'edit'}) => {
    const handleChangeInput = (key, value) => {
        setProductData(prevState => ({...prevState, [key]: value}));
    }
    console.log(productData)

    return (
        <EditContainer handleSave={() => handleSaveProduct()}
                       isDisabledSave={!isSaveButtonActive} handleClose={handleClosePopup}>
            <div className={classes.wrapper}>
                <div className={classes.top}>
                    <span className={classes.productId}>№{productData.id}</span>
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
                    <TextAreaAdmin placeholder='Склад' value={productData.ingridients}
                                   onChange={e => handleChangeInput('ingridients', e.target.value)}/>
                </div>
                <Characteristics productData={productData} setProductData={setProductData}/>
                <AdditionalCategories productData={productData} setProductData={setProductData}/>
                <Images productData={productData} setProductData={setProductData}/>
                <SeoBlock
                    metaKey={productData.metaKeys}
                    handleChangeMetaKey={(e) => handleChangeInput('metaKeys', e.target.value)}
                    metaDesc={productData.metaDescription}
                    handleChangeMetaDesc={(e) => handleChangeInput('metaDescription', e.target.value)}
                />
            </div>
        </EditContainer>
    );
};

export default PopupForProduct;