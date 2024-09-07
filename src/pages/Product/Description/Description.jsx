import React from 'react';
import ShowMoreBlock from "../../../components/ui/blocks/ShowMoreBlock/ShowMoreBlock";

const Description = ({description}) => {
    return <ShowMoreBlock title='Опис'>
        <p>{description}</p>
    </ShowMoreBlock>
};

export default Description;