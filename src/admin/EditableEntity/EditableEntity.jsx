import React, {useEffect, useRef, useState} from 'react';
import {getModifiedFields} from "../../common/utils/getModifiedFields";
import Preloader from "../../components/ui/Preloader/Preloader";
import PopupAdmin from "../PopupAdmin/PopupAdmin";

const EditableEntity = ({
                            isOpenPopup,
                            setIsOpenPopup,
                            handleSave,
                            initialObject = {},
                            loading,
                            trackerFields = () => {},
                            Component
                        }) => {
    const [dataForOnlyChange, setDataForOnlyChange] = useState({});
    const [dataForOnlyTrack, setDataForOnlyTrack] = useState({});
    const prevDataForOnlyTrack = useRef({});
    const [isSaveButtonActive, setIsSaveButtonActive] = useState(false);

    // Обновление dataForOnlyChange и зачистка prevDataForOnlyTrack.current
    useEffect(() => {
        setDataForOnlyChange({...initialObject})
        prevDataForOnlyTrack.current = {}
    }, [initialObject]);

    // Обновление dataForOnlyTrack
    useEffect(() => {
        setDataForOnlyTrack({...trackerFields(dataForOnlyChange)})
    }, [dataForOnlyChange]);

    // Обновление prevDataForOnlyTrack.current
    useEffect(() => {
        if (!Object.keys(prevDataForOnlyTrack.current).length
            && Object.keys(dataForOnlyTrack).every(key => dataForOnlyTrack[key] !== undefined)) {
            prevDataForOnlyTrack.current = dataForOnlyTrack;
        }
    }, [dataForOnlyTrack]);

    // Проверка изменений и активация кнопки сохранения
    useEffect(() => {
        if (!!Object.keys(prevDataForOnlyTrack.current).length) {
            const modifiedFields = getModifiedFields(prevDataForOnlyTrack.current, dataForOnlyTrack);
            if (!Object.keys(modifiedFields).length) {
                setIsSaveButtonActive(false)
            } else {
                setIsSaveButtonActive(true)
            }
        }
    }, [dataForOnlyTrack]);

    const modifyHandleSave = () => {
        handleSave(prevDataForOnlyTrack.current, dataForOnlyTrack);
    }

    return (
        <>
            {isOpenPopup && (
                loading ? (
                    <Preloader color='secondary' cover={true}/>
                ) : (
                    <PopupAdmin>
                        <Component
                            handleClose={() => setIsOpenPopup(false)}
                            data={dataForOnlyChange}
                            setData={setDataForOnlyChange}
                            isSaveButtonActive={isSaveButtonActive}
                            handleSave={modifyHandleSave}
                        />
                    </PopupAdmin>
                )
            )}
        </>
    );
};

export default EditableEntity;