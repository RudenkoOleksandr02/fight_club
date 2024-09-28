import React, {useState} from 'react';
import Tr from '../../../Table/Tr';
import Td from '../../../Table/Td';
import classes from './PromocodesTable.module.css';
import IcoButton from '../../../buttons/IcoButton/IcoButton';
import Table from '../../../Table/Table';
import {ReactComponent as IcoEdit} from './../../../images/icoEdit.svg';
import {ReactComponent as IcoDelete} from './../../../images/icoDelete.svg';
import PopupForDelete from "../../../PopupForDelete/PopupForDelete";
import {useSelector} from "react-redux";
import Preloader from "../../../../components/ui/Preloader/Preloader";

const PromocodesTable = ({promocodesData, handleClickEdit, handleDeletePromocodeById}) => {
    const {promocodes: {loading: promocodesLoading}} = useSelector(state => state.admin.adminPromocode);
    const [deletePromocodeId, setDeletePromocodeId] = useState(null);

    return (
        <Table>
            <Tr templateColumns="1fr 130px">
                <Td fontWeight="600" justifyContent="left">Промокод</Td>
                <Td fontWeight="600">Дії</Td>
            </Tr>
            {promocodesLoading ? <Preloader color="primary"/> : (
                promocodesData.map(promocode => (
                    <Tr key={promocode.promocodeId} templateColumns="1fr 130px">
                        <Td justifyContent="left">{promocode.code}</Td>
                        <Td>
                            <div className={classes.icoBtns}>
                                <IcoButton svgIco={<IcoEdit/>} onClick={() => handleClickEdit(promocode.promocodeId)}/>
                                <IcoButton svgIco={<IcoDelete/>}
                                           onClick={() => setDeletePromocodeId(promocode.promocodeId)}/>
                            </div>
                        </Td>
                        {deletePromocodeId === promocode.promocodeId && (
                            <PopupForDelete
                                message={`Видалити промокод: ${promocode.code}`}
                                onDelete={() => {
                                    handleDeletePromocodeById(promocode.promocodeId);
                                    setDeletePromocodeId(null);
                                }}
                                onCancel={() => setDeletePromocodeId(null)}
                            />
                        )}
                    </Tr>
                ))
            )}
        </Table>
    );
};

export default PromocodesTable;
