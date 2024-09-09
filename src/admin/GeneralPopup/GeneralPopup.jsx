import React from 'react';
import classes from './GeneralPopup.module.css';
import Products from "./Products/Products";
import Images from "./Images/Images";
import EditContainer from "../EditContainer/EditContainer";
import InputAdmin from "../Inputs/InputAdmin";
import TextAreaAdmin from "../Inputs/TextAreaAdmin";
import SeoBlock from "../SeoBlock/SeoBlock";

const GeneralPopup = ({handleClose, data, setData, handleSave, isSaveButtonActive}) => {
    console.log(data)
    const handleChangeInput = (key, value) => {
        setData(prevState => ({...prevState, [key]: value}));
    }
    const setProductsIds = (productsSearch, productId) => {
        const handleProduct = productsSearch.find(product => product.id === productId)
        setData(prevState => ({
            ...prevState,
            products: [...prevState.products, handleProduct]
        }));
    }
    const delProductsIds = (productId) => {
        setData(prevData => ({
            ...prevData,
            products: prevData.products.filter(product => product.id !== productId),
        }))
    }
    const handleAddImage = (imageKey, url) => {
        setData(prevState => ({...prevState, [imageKey]: url}))
    }
    const handleRemoveImage = (imageKey) => {
        setData(prevState => ({...prevState, [imageKey]: ''}))
    }
    return (
        <EditContainer handleSave={() => handleSave()} isDisabledSave={!isSaveButtonActive} handleClose={handleClose}>
            <div className={classes.wrapper}>
                <InputAdmin placeholder='Назва' value={data.title}
                            onChange={(e) => handleChangeInput('title', e.target.value)}/>
                <TextAreaAdmin placeholder='Опис' value={data.description}
                               onChange={(e) => handleChangeInput('description', e.target.value)}/>
                <Images images={{
                    desktopImageUrl: data.desktopImageUrl,
                    laptopImageUrl: data.laptopImageUrl,
                    tabletImageUrl: data.tabletImageUrl,
                    phoneImageUrl: data.phoneImageUrl
                }} handleAddImage={handleAddImage} handleRemoveImage={handleRemoveImage}/>
                <InputAdmin placeholder='Alt' value={data.altText}
                            onChange={(e) => handleChangeInput('altText', e.target.value)}/>
                <Products products={data.products} setProductsIds={setProductsIds} delProductsIds={delProductsIds}/>
                <SeoBlock
                    metaKey={data.metaKeywords}
                    handleChangeMetaKey={(e) => handleChangeInput('metaKeywords', e.target.value)}
                    metaDesc={data.metaDescription}
                    handleChangeMetaDesc={(e) => handleChangeInput('metaDescription', e.target.value)}
                />
            </div>
        </EditContainer>
    );
};

export default GeneralPopup;