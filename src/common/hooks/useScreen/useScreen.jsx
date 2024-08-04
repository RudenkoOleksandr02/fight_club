import React, {useEffect, useState} from 'react';

const useScreen = (screen) => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= screen);
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= screen);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return isSmallScreen;
};

export default useScreen;