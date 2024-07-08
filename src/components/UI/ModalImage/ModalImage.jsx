import React, {useEffect, useState} from 'react';
import classes from './ModalImage.module.css';
import CloseBtn from "../Buttons/CloseBtn/CloseBtn";


const ModalImage = ({onClose, selectedImage}) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const img = new Image();
        img.src = selectedImage;
        img.onload = () => {
            setLoading(false);
        };
        img.onerror = () => {
            setLoading(false);
        };

        return () => {
            img.onload = null;
            img.onerror = null;
        };
    }, [selectedImage]);

    return (
        <div className={classes.modalBackdrop} onClick={onClose}>
            <div className={classes.modalContent } onClick={(e) => e.stopPropagation()}>
                <CloseBtn
                    setIsOpen={onClose}
                    styles={{width1: '40px', height: '40px', width2: '40px', color: '#b5b8bd'}}
                />
                {!loading
                    ? <img src={selectedImage} alt='Selected' className={classes.selectedImage}/>
                    : <div>preloader</div>
                }
            </div>
        </div>
    );
};

export default ModalImage;