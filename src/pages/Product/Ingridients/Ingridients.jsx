import React from 'react';
import ShowMoreBlock from "../../../components/ui/blocks/ShowMoreBlock/ShowMoreBlock";

const Ingridients = ({ingridients}) => {
    if (ingridients === null) return null;

    return <ShowMoreBlock title='Інгредієнти'>
        <p>{ingridients}</p>
    </ShowMoreBlock>
};

export default Ingridients;