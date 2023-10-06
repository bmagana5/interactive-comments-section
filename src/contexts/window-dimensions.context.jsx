import { createContext, useEffect, useState } from "react";

const getWindowDimensions = () => {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
};

export const WindowDimensionsContext = createContext({
    windowDimensions: {}
});

export const WindowDimensionsProvider = ({ children }) => {
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

    return <WindowDimensionsContext.Provider value={value}>{children}</WindowDimensionsContext.Provider>
};