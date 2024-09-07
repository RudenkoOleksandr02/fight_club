import { useDispatch } from 'react-redux';

export const useHandlePostFile = (setIsErrorImport, setIsSuccessImport, postFileForDispatch) => {
    const dispatch = useDispatch();

    const handlePostFile = (files) => {
        const file = files[0];
        if (file) {
            dispatch(postFileForDispatch(file))
                .then(response => {
                    if (response.meta.requestStatus === 'fulfilled') {
                        setIsSuccessImport(true);
                        setIsErrorImport(false);
                    } else {
                        setIsErrorImport(true);
                        setIsSuccessImport(false);
                    }
                });
        } else {
            setIsErrorImport(true);
            setIsSuccessImport(false);
        }
    };

    return handlePostFile;
};