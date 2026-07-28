import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PageLoader = () => {
    const location = useLocation();
    const [visible, setVisible] = useState(false);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setVisible(true);
        setWidth(0);

        const growTimer = setTimeout(() => setWidth(80), 30);
        const finishTimer = setTimeout(() => setWidth(100), 350);
        const hideTimer = setTimeout(() => setVisible(false), 550);

        return () => {
            clearTimeout(growTimer);
            clearTimeout(finishTimer);
            clearTimeout(hideTimer);
        };
    }, [location.pathname, location.search]);

    return (
        <div
            className='fixed top-0 left-0 h-[3px] z-[9999] bg-[#F26627] border-b border-black/30 transition-all ease-out'
            style={{
                width: `${width}%`,
                opacity: visible ? 1 : 0,
                transitionDuration: width === 100 ? '200ms' : '350ms',
                boxShadow: '0 0 8px rgba(37,99,235,0.7), 0 1px 2px rgba(0,0,0,0.5)'
            }}
        />
    );
};

export default PageLoader;