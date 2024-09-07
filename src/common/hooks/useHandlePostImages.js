import { useDispatch } from 'react-redux';

export const useHandlePostImages = (productId, setIsErrorImport, setIsSuccessImport, postImagesForDispatch) => {
    const dispatch = useDispatch();

    const handlePostImages = (files) => {
        if (files.length !== 0) {
            dispatch(postImagesForDispatch(productId, files))
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

    return handlePostImages;
};