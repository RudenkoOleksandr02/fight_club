import {useEffect, useRef} from 'react';

const useMouseOutsideForBtns = (setIsOpenModal) => {
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsOpenModal(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return ref;
}

export default useMouseOutsideForBtns;