import React from 'react';
import ShowMore from "../../../ui/ShowMore/ShowMore";

const Description = ({description}) => {
    return <ShowMore title='Опис'>
        <p>{description}</p>
    </ShowMore>
};

export default Description;