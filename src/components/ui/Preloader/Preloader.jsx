import React from 'react';
import Lottie from 'lottie-react';
import preloaderAnimation from './preloaderAnimation.json';
import classes from './Preloader.module.css';
import useBodyOverflowHidden from "../../../common/hooks/useBodyOverflowHidden/useBodyOverflowHidden";

const Preloader = ({ color, cover = false, overflowHidden = true }) => {
    const modifiedAnimation = JSON.parse(JSON.stringify(preloaderAnimation));
    useBodyOverflowHidden(overflowHidden)

    const colorMap = {
        primary: [78/255, 118/255, 92/255, 1],
        secondary: [249/255, 249/255, 249/255, 1],
        tertiary: [255/255, 153/255, 0/255, 1],
        default: [43/255, 43/255, 43/255, 1]
    };

    const selectedColor = colorMap[color] || colorMap['default'];

    modifiedAnimation.layers.forEach(layer => {
        layer.shapes?.forEach(shape => {
            shape.it?.forEach(item => {
                if (item.ty === 'st') {
                    item.c.k = selectedColor;
                }
            });
        });
    });

    return (
        <div className={classes.wrapper} style={cover ? {
            position: "fixed",
            top: '0', left: '0', bottom: '0', right: '0',
            background: 'rgba(0, 0, 0, 0.7)'
        } : {}}>
            <Lottie
                animationData={modifiedAnimation}
                loop={true}
                style={{ width: 300, height: 150 }}
            />
        </div>
    );
};

export default Preloader;
