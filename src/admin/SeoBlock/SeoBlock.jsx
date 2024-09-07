import React from 'react';
import DieBlock from "../DieBlock/DieBlock";
import Table from "../Table/Table";
import Tr from "../Table/Tr";
import Td from "../Table/Td";
import classes from './SeoBlock.module.css';

const SeoBlock = ({ metaKey, handleChangeMetaKey, metaDesc, handleChangeMetaDesc }) => {
    const countKeywords = (metaKey) => {
        return metaKey.split(',').map(keyword => keyword.trim()).filter(Boolean).length;
    };

    const countCharacters = (text) => {
        return text.length;
    };

    return (
        <div className={classes.wrapper}>
            <DieBlock title='SEO' withoutButton={true}>
                <Table>
                    <Tr templateColumns='170px 1fr 150px'>
                        <Td justifyContent='left'>Keywords</Td>
                        <Td>
                            <input type='text' value={metaKey} onChange={handleChangeMetaKey} />
                        </Td>
                        <Td>
                            <div className={classes.inner}>
                                <span
                                    className={`
                                        ${classes.count}
                                        ${countKeywords(metaKey) >= 3 && countKeywords(metaKey) <= 5 ? classes.good : ''}
                                        ${countKeywords(metaKey) > 5 ? classes.bad : ''}
                                    `}>
                                    {countKeywords(metaKey)}/5
                                </span>
                                <span>(3-5)</span>
                            </div>
                        </Td>
                    </Tr>
                    <Tr templateColumns='170px 1fr 150px'>
                        <Td justifyContent='left'>Description</Td>
                        <Td>
                            <textarea value={metaDesc} onChange={handleChangeMetaDesc}/>
                        </Td>
                        <Td>
                            <div className={classes.inner}>
                                <span
                                    className={`
                                        ${classes.count}
                                        ${countCharacters(metaDesc) >= 150 && countCharacters(metaDesc) <= 160 ? classes.good : ''}
                                        ${countCharacters(metaDesc) > 160 ? classes.bad : ''}
                                    `}>
                                    {countCharacters(metaDesc)}/160
                                </span>
                                <span>(150-160)</span>
                            </div>
                        </Td>
                    </Tr>
                </Table>
            </DieBlock>
        </div>
    );
};

export default SeoBlock;
