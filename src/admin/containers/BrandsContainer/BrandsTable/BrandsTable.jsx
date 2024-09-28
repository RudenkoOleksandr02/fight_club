import React, {useState} from 'react';
import Tr from "../../../Table/Tr";
import Td from "../../../Table/Td";
import classes from "./BrandsTable.module.css";
import IcoButton from "../../../buttons/IcoButton/IcoButton";
import Table from "../../../Table/Table";
import {ReactComponent as IcoEdit} from './../../../images/icoEdit.svg';
import {ReactComponent as IcoDelete} from './../../../images/icoDelete.svg';
import {useSelector} from "react-redux";
import Preloader from "../../../../components/ui/Preloader/Preloader";
import PopupForDelete from "../../../PopupForDelete/PopupForDelete";

const BrandsTable = ({brandsData, handleClickEdit, handleDeleteBrandById}) => {
    const {brands: {loading: brandsLoading}} = useSelector(state => state.admin.adminBrands);
    const [deleteBrandId, setDeleteBrandId] = useState(null);

    return (
        <Table>
            <Tr templateColumns='1fr 130px'>
                <Td fontWeight='600' justifyContent='left'>Заголовок бренда</Td>
                <Td fontWeight='600'>Дії</Td>
            </Tr>
            {brandsLoading ? <Preloader color='primary'/> : (
                brandsData.map(brand => (
                    <Tr key={brand.brandId} templateColumns='1fr 130px'>
                        <Td justifyContent='left'>{brand.title}</Td>
                        <Td>
                            <div className={classes.icoBtns}>
                                <IcoButton svgIco={<IcoEdit/>} onClick={() => handleClickEdit(brand.brandId)}/>
                                <IcoButton svgIco={<IcoDelete/>} onClick={() => setDeleteBrandId(brand.brandId)}/>
                            </div>
                        </Td>
                        {deleteBrandId === brand.brandId && (
                            <PopupForDelete
                                message={`Видалити бренд: ${brand.title}`}
                                onDelete={() => {
                                    handleDeleteBrandById((brand.brandId));
                                    setDeleteBrandId(null);
                                }}
                                onCancel={() => setDeleteBrandId(null)}
                            />
                        )}
                    </Tr>
                ))
            )}
        </Table>
    );
};

export default BrandsTable;