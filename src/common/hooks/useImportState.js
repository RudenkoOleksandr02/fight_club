import { useState } from 'react';

export const useImportState = () => {
    const [isErrorImport, setIsErrorImport] = useState(false);
    const [isSuccessImport, setIsSuccessImport] = useState(false);

    const resetImportState = () => {
        setIsErrorImport(false);
        setIsSuccessImport(false);
    };

    return {
        isErrorImport,
        isSuccessImport,
        setIsErrorImport,
        setIsSuccessImport,
        resetImportState
    };
};