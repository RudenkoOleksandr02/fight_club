import React from 'react';
import classes from "./LoyaltyProgram.module.css";
import DieBlock from "../../../../ui/blocks/DieBlock/DieBlock";

const loyaltyProgram = [
    {id: 1, content: 'Промокод на знижку 7%'},
    {id: 2, content: 'Безкоштовна доставка від 1500 грн'},
    {id: 3, content: 'Кешбек 3%'},
    {id: 4, content: 'Подарунок за покупку'}
]

const LoyaltyProgram = () => {
    return (
        <DieBlock title='Програма лояльності'>
            {loyaltyProgram.map(item => {
                return <div className={classes.item} key={item.id}>
                    {item.content}
                </div>
            })}
        </DieBlock>
    );
};

export default LoyaltyProgram;