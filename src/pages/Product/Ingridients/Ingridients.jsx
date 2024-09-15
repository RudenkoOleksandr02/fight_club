import React from 'react';
import ShowMoreBlock from "../../../components/ui/blocks/ShowMoreBlock/ShowMoreBlock";

const Ingridients = ({ingridients}) => {
    return <ShowMoreBlock title='Інгредієнти'>
        <p>{ingridients}</p>
    </ShowMoreBlock>
};

export default Ingridients;