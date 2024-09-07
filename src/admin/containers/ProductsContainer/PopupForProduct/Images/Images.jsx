import React, {useEffect, useState} from 'react';
import classes from "./Images.module.css";
import {ReactComponent as IcoPlus} from './../../../../images/icoPlus.svg';
import {ReactComponent as IcoRemove} from './../../../../images/icoDelete.svg'
import {useHandlePostImages} from "../../../../../common/hooks/useHandlePostImages";
import {postImagesByProductId} from "../../../../../store/adminSlices/adminProductSlice";
import PrimaryButton from "../../../../buttons/PrimaryButton/PrimaryButton";
import IcoButton from "../../../../buttons/IcoButton/IcoButton";
import Popup from "../../../../../components/ui/Popup/Popup";
import FileDropzone from "../../../../FileDropzone/FileDropzone";
import {useImportState} from "../../../../../common/hooks/useImportState";
import DieBlock from "../../../../DieBlock/DieBlock";

const Images = ({productData, setProductData}) => {
    const [images, setImages] = useState([]);
    useEffect(() => {
        if (productData.images) {
            const urls = productData.images.urls ? productData.images.urls.map(url => url) : [];
            const files = productData.images.files ? productData.images.files.map(file => file.preview.url) : [];

            setImages([...urls, ...files]);
        }
    }, [productData.images]);


    const [isOpenPopupImportImages, setIsOpenPopupImportImages] = useState(false);
    const {
        isErrorImport,
        isSuccessImport,
        setIsErrorImport,
        setIsSuccessImport,
        resetImportState
    } = useImportState();

    const handlePostImages = useHandlePostImages(productData.id, setIsErrorImport, setIsSuccessImport, postImagesByProductId);
    const handleAddImages = (files) => {
        setProductData(prevState => ({...prevState, images: {urls: prevState.images.urls, files: [...prevState.images.files, ...files]}}))
        setIsOpenPopupImportImages(false)
    }
    const handleRemoveImage = (url) => {
        setProductData(prevState => ({
            ...prevState,
            images: {
                urls: prevState.images.urls.filter(data => data !== url),
                files: prevState.images.files.filter(data => data.preview.url !== url)
            },
        }))
    }

    return (
        <div className={classes.imagesWrapper}>
            <DieBlock title='Зображення' titleForBtn='Додати зображення' handleClick={() => setIsOpenPopupImportImages(true)}>
                <div className={classes.images}>
                    {!!images.length ? images.map((image, index) => (
                        <div className={classes.imageContainer} key={index}>
                            <div className={classes.remove}>
                                <IcoButton svgIco={<IcoRemove/>} onClick={() => handleRemoveImage(image)}/>
                            </div>
                            <img src={image} alt='img'/>
                        </div>
                    )) : 'Беззмістовний'}
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
                            handleSend={handleAddImages}
                            maxFiles={5}
                            isError={isErrorImport}
                            isSuccess={isSuccessImport}
                            setIsError={setIsErrorImport}
                            setIsSuccess={setIsSuccessImport}
                        />
                    </Popup>
                )}
            </DieBlock>
        </div>
    );
};

export default Images;