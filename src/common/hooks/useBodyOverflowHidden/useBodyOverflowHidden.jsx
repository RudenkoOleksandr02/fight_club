import { useEffect } from 'react';

const useBodyOverflowHidden = (active) => {
    useEffect(() => {
        if (active) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [active]);
};

export default useBodyOverflowHidden;