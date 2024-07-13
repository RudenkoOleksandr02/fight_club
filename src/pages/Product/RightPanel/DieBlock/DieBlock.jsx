import React from 'react';
import classes from './DieBlock.module.css';
import { v4 as uuidv4 } from 'uuid';

// --DATA--
import { ReactComponent as Ico1 } from "./../../../../assets/images/delivery/ico_del1.svg";
import { ReactComponent as Ico2 } from "./../../../../assets/images/delivery/ico_del2.svg";
import { ReactComponent as Ico3 } from "./../../../../assets/images/delivery/ico_del3.svg";
import { ReactComponent as Ico4 } from "./../../../../assets/images/delivery/ico_del4.svg";
import { ReactComponent as Ico5 } from "./../../../../assets/images/delivery/ico_del5.svg";

const data = [
    { id: 1, image: <Ico1 />, text: 'Бесплатная доставка от 100 UAH' },
    { id: 2, image: <Ico2 />, text: 'Бесплатный возврат - 14 дней' },
    { id: 3, image: <Ico3 />, text: 'Доставка от 9,99 UAN' },
    { id: 4, image: <Ico4 />, text: 'Ориентировочная доставка: послезавтра на точку' },
    { id: 5, image: <Ico5 />, text: 'При покупке этого товара получите бонусные гривны на счет' },
];

const DieBlock = ({ dieNumbers }) => {
    const filteredData = data.filter(el => dieNumbers.includes(el.id));

    return (
        <div className={classes.wrapper}>
            {filteredData.map(el => (
                <div className={classes.container} key={uuidv4()}>
                    {el.image}
                    <p>{el.text}</p>
                </div>
            ))}
        </div>
    );
};

export default DieBlock;
