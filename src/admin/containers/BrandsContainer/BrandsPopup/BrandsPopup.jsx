import React from 'react';
import EditContainer from "../../../EditContainer/EditContainer";
import classes from "./BrandsPopup.module.css";
import InputAdmin from "../../../Inputs/InputAdmin";
import TextAreaAdmin from "../../../Inputs/TextAreaAdmin";
import SeoBlock from "../../../SeoBlock/SeoBlock";
import Image from "./Image/Image";

const BrandsPopup = ({handleClose, data, setData, handleSave, isSaveButtonActive}) => {
    const handleChangeInput = (key, value) => {
        setData(prevState => ({...prevState, [key]: value}));
    }
    const handleAddImage = (url) => {
        setData(prevState => ({...prevState, imageUrl: url}))
    }
    const handleRemoveImage = () => {
        setData(prevState => ({...prevState, imageUrl: ''}))
    }
    const handleAddImageLogo = (url) => {
        setData(prevState => ({...prevState, logoImageUrl: url}))
    }
    const handleRemoveImageLogo = () => {
        setData(prevState => ({...prevState, logoImageUrl: ''}))
    }
    return (
        <EditContainer handleSave={() => handleSave()} isDisabledSave={!isSaveButtonActive} handleClose={handleClose}>
            <div className={classes.wrapper}>
                <InputAdmin placeholder='Назва' value={data.title}
                            onChange={(e) => handleChangeInput('title', e.target.value)}/>
                <TextAreaAdmin placeholder='Опис' value={data.description}
                               onChange={(e) => handleChangeInput('description', e.target.value)}/>
                <div className={classes.images}>
                    <Image title='Логотип' titleForBtn='Додати зображення' image={data.imageUrl} handleAddImage={handleAddImage} handleRemoveImage={handleRemoveImage}/>
                    <Image title='Зображення' titleForBtn='Додати зображення' image={data.logoImageUrl} handleAddImage={handleAddImageLogo} handleRemoveImage={handleRemoveImageLogo}/>
                </div>
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

export default BrandsPopup;