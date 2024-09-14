import React, {useState} from 'react';
import {useImportState} from "../../../../../common/hooks/useImportState";
import classes from "./Image.module.css";
import IcoButton from "../../../../buttons/IcoButton/IcoButton";
import Popup from "../../../../../components/ui/Popup/Popup";
import FileDropzone from "../../../../FileDropzone/FileDropzone";
import DieBlock from "../../../../DieBlock/DieBlock";
import {ReactComponent as IcoRemove} from './../../../../images/icoDelete.svg';

const Image = ({title, titleForBtn, image, handleAddImage, handleRemoveImage}) => {
    const [isOpenPopupImportImages, setIsOpenPopupImportImages] = useState(false);
    const {
        isErrorImport,
        isSuccessImport,
        setIsErrorImport,
        setIsSuccessImport,
        resetImportState
    } = useImportState();

    const setupImage = (files) => {
        handleAddImage(files[0]);
        setIsOpenPopupImportImages(false);
    }
    const deleteImage = () => {
        handleRemoveImage()
    }
    return (
        <DieBlock title={title} titleForBtn={titleForBtn} handleClick={() => setIsOpenPopupImportImages(true)}>
            {image ? (
                <div className={classes.imageContainer}>
                    <div className={classes.remove}>
                        <IcoButton svgIco={<IcoRemove/>} onClick={deleteImage}/>
                    </div>
                    <img src={typeof image === 'object' ? image.preview.url : image} alt=''/>
                </div>
            ) : "Беззмістовний"}
            {isOpenPopupImportImages && (
                <Popup onClose={() => setIsOpenPopupImportImages(false)}>
                    <FileDropzone
                        accepts={[
                            'image/png',
                            'image/jpeg',
                            'image/jpg',
                            'image/gif'
                        ]}
                        handleSend={setupImage}
                        maxFiles={1}
                        isError={isErrorImport}
                        isSuccess={isSuccessImport}
                        setIsError={setIsErrorImport}
                        setIsSuccess={setIsSuccessImport}
                    />
                </Popup>
            )}
        </DieBlock>
    );
};

export default Image;