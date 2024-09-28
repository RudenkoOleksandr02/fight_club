import React, {useState} from 'react';
import Tr from "../../../Table/Tr";
import Td from "../../../Table/Td";
import classes from "./BannersTable.module.css";
import IcoButton from "../../../buttons/IcoButton/IcoButton";
import Table from "../../../Table/Table";
import {ReactComponent as IcoEdit} from './../../../images/icoEdit.svg';
import {ReactComponent as IcoDelete} from './../../../images/icoDelete.svg';
import {useSelector} from "react-redux";
import Preloader from "../../../../components/ui/Preloader/Preloader";
import PopupForDelete from "../../../PopupForDelete/PopupForDelete";

const BannersTable = ({bannersData, handleClickEdit, handleDeleteBannerById}) => {
    const {banners: {loading: bannersLoading}} = useSelector(state => state.admin.adminBanner);
    const [deleteBannerId, setDeleteBannerId] = useState(null);

    return (
        <Table>
            <Tr templateColumns='1fr 130px'>
                <Td fontWeight='600' justifyContent='left'>Заголовок баннера</Td>
                <Td fontWeight='600'>Дії</Td>
            </Tr>
            {bannersLoading ? <Preloader color='primary'/> : (
                bannersData.map(banner => (
                    <Tr key={banner.bannerId} templateColumns='1fr 130px'>
                        <Td justifyContent='left'>{banner.title}</Td>
                        <Td>
                            <div className={classes.icoBtns}>
                                <IcoButton svgIco={<IcoEdit/>} onClick={() => handleClickEdit(banner.bannerId)}/>
                                <IcoButton svgIco={<IcoDelete/>} onClick={() => setDeleteBannerId(banner.bannerId)}/>
                            </div>
                        </Td>
                        {deleteBannerId === banner.bannerId && (
                            <PopupForDelete
                                message={`Видалити баннер: ${banner.title}`}
                                onDelete={() => {
                                    handleDeleteBannerById(banner.bannerId);
                                    setDeleteBannerId(null);
                                }}
                                onCancel={() => setDeleteBannerId(null)}
                            />
                        )}
                    </Tr>
                ))
            )}
        </Table>
    );
};

export default BannersTable;