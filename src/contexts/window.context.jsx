import { createContext, useEffect, useState } from "react";

const getWindowDimensions = () => {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
};

export const WindowContext = createContext({
    windowDimensions: {}
});

export const WindowProvider = ({ children }) => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        const resizeHandler = () => {
            setWindowDimensions(getWindowDimensions());
        };

        window.addEventListener('resize', resizeHandler);
        return () => window.removeEventListener('resize', resizeHandler);
    }, []);

    const value = {
        windowDimensions
    };

    return <WindowContext.Provider value={value}>{children}</WindowContext.Provider>
};