import React from 'react';
import classes from "./AdditionalCategories.module.css";
import {ReactComponent as IcoDelete} from '../../../../images/icoDelete.svg';
import AddCategories from "./AddCategories";
import Tr from "../../../../Table/Tr";
import Table from "../../../../Table/Table";
import Td from "../../../../Table/Td";
import IcoButton from "../../../../buttons/IcoButton/IcoButton";
import DieBlock from "../../../../DieBlock/DieBlock";

const AdditionalCategories = ({productData, setProductData}) => {
    const handleDeleteCategory = (categoryId) => {
        setProductData(prevData => ({
            ...prevData,
            additionalCategories: prevData.additionalCategories.filter(category => category.categoryId !== categoryId),
        }));
    };

    return (
        <div className={classes.wrapper}>
            <DieBlock title='Додаткові категорії' withoutButton={true}>
                <AddCategories setProductData={setProductData} mainCategoryId={productData.mainCategory?.categoryId}/>
                <Table>
                    {!!productData.additionalCategories.length ? productData.additionalCategories.map((category, index) => (
                        <Tr key={index} templateColumns='1fr 44px'>
                            <Td justifyContent='left'>{category.name}</Td>
                            <Td>
                                <IcoButton
                                    svgIco={<IcoDelete/>}
                                    onClick={() => handleDeleteCategory(category.categoryId)}
                                />
                            </Td>
                        </Tr>
                    )) : 'Беззмістовний'}
                </Table>
            </DieBlock>
        </div>
    );
};

export default AdditionalCategories;
