import React from 'react';
import Table from "../../Table/Table";
import Tr from "../../Table/Tr";
import Td from "../../Table/Td";
import IcoButton from "../../buttons/IcoButton/IcoButton";
import {ReactComponent as IcoDelete} from '../../images/icoDelete.svg';
import DieBlock from "../../DieBlock/DieBlock";
import classes from './Products.module.css'
import AddProduct from "./AddProduct/AddProduct";

const Products = ({products, setProductsIds, delProductsIds}) => {
    return (
        <div className={classes.wrapper}>
            <DieBlock title='Товари' withoutButton={true}>
                <AddProduct setProductsIds={setProductsIds}/>
                <Table>
                    {!!products.length ? products.map(product => (
                        <Tr templateColumns='1fr 44px' key={product.id}>
                            <Td justifyContent='left'>{product.name}</Td>
                            <Td><IcoButton svgIco={<IcoDelete/>} onClick={() => delProductsIds(product.id)}/></Td>
                        </Tr>
                    )) : 'Беззмістовний'}
                </Table>
            </DieBlock>
        </div>
    );
};

export default Products;